import * as React from "react";
import { atom, useRecoilState } from "recoil";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { collection,doc,runTransaction, } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "../../useUserAuth";
import { useAlert } from "../../useAlert";
import { db } from "../useFirebase";
import { useLoading } from "../../useLoading";

export type ImageItem = {
  file:any;
  image:any;
  url:string;
};
export const imageItemState = atom<ImageItem[]>({
  key:"imageItem",
  default:[]
})

export const fileState = atom({
  key: "file",
  default: null,
});
export const imageState = atom({
  key: "image",
  default: null,
});
export const urlState = atom({
  key:"url",
  default:"",
});

export const UploadImage = () => {
  const storage = getStorage();
  const auth = getAuth();
  const userCollection = collection(db, "users");
  const { user } = useAuth();
  const {showErrorMessage,showSuccessMessage} = useAlert()
  const {startLoading,completeLoading} = useLoading();
  const [file, setFile] = useRecoilState(fileState);
  const [image, setImage] = useRecoilState(imageState);
  const [url,setUrl] = useRecoilState(urlState);
  /** ========================
 * @returns ファイル取得
 * ========================*/
  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setImage(file);
  }
  /** ========================
 * @returns ファイルアップロード
 * ========================*/
  const uploadFiles = async(e) => {
    e.preventDefault();
    startLoading();
    const storageRef = ref(storage, "/images/" + file.name);
    const uploadTask = uploadBytes(storageRef, file);
    uploadTask.then(async() => {
      // get url
      getDownloadURL(storageRef).then((url) => {
        runTransaction(db, async (t: any) => {
          t.update(doc(userCollection, user.uid), {
            url: url,
          });
        });
        updateProfile(auth.currentUser, {
          photoURL: url,
        });
      });
      showSuccessMessage("アップロードに成功しました")
    }).then(() => {
      setTimeout(() => completeLoading(),500);
    })
  }
  /** ========================
 * @returns 店舗画像登録
 * ========================*/
  const uploadStoreImage = async(e) => {
    e.preventDefault();
    startLoading();
    const storageRef = ref(storage, "/images/" + file.name);
    const uploadTask = uploadBytes(storageRef, file);
    uploadTask.then(async() => {
      getDownloadURL(storageRef).then((url) => {
        setUrl(url);
      });
      showSuccessMessage("アップロードに成功しました")
    }).then(() => {
      setTimeout(() => completeLoading(),500) ;
    });
  }
  /** ========================
 * @returns 店舗情報変更
 * ========================*/
  const changeDisplayName = async(e, companyId) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: companyId,
      });
      showSuccessMessage("ユーザーの更新に成功しました");
    } catch (error) {
      showErrorMessage("情報の読み取りに失敗しました")
    } 
  }
  /** ========================
 * @returns スタッフ情報変更
 * ========================*/
  const changeStaffData = async(e,companyId,name,url,times,role?) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser,{
        displayName:name,
      });
      runTransaction(db,async(e:any) => {
        e.update(doc(userCollection,user.uid),{
          companyId,
          userName:name,
          staffImageURL:url,
          times,
          role
        });
      });
      showSuccessMessage("ユーザーの更新に成功しました");
    } catch (error) {
      showErrorMessage("情報の読み取りに失敗しました");
    } 
  }
  return {
    file,
    image,
    url,
    handleChange,
    uploadFiles,
    changeDisplayName,
    uploadStoreImage,
    changeStaffData
  };
}
