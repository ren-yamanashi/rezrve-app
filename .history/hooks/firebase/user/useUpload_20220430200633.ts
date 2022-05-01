import * as React from "react";
import { atom, useRecoilState } from "recoil";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { collection,doc,runTransaction, } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "../useUserAuth";
import { useAlert } from "../../useAlert";
import { db } from "../useFirebase";
import { useLoading } from "../../useLoading";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const userCollection = collection(db, "users");
  const { user } = useAuth();
  const {showErrorMessage,showSuccessMessage} = useAlert()
  const {startLoading,completeLoading} = useLoading();
  const [file, setFile] = useRecoilState(fileState);
  const [image, setImage] = useRecoilState(imageState);
  const [url,setUrl] = useRecoilState(urlState);
  /** ======== < ファイル取得 > ======== */
  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setImage(file);
  }
  /** ======== < ファイルアップロード > =========== */
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
  /**========== <　店舗画像登録 > ==========-*/
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
  /** ======= < 情報変更(店舗) > ======== */
  const changeDisplayName = async(e, companyId,name,address,url,times,) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: companyId,
      });
      runTransaction(db, async (e: any) => {
        e.update(doc(userCollection, user.uid), {
          companyId,
          userName: name,
          times,
          address,
          storeImageURL:url
        });
      });
      showSuccessMessage("ユーザーの更新に成功しました");
    } catch (error) {
      showErrorMessage("情報の読み取りに失敗しました")
    } 
  }
  /** ================ < 情報変更(スタッフ) > ==================== */
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
      setTimeout(() => router.push("/staff/home/"),500);
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
