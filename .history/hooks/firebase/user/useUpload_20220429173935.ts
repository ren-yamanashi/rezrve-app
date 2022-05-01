import { atom, useRecoilState } from "recoil";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as React from "react";
import { collection,doc,runTransaction, } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "../useUserAuth";
import { useAlert } from "../../useAlert";
import { db } from "../useFirebase";
const initialError: boolean = false;


export const errState = atom({
  key: "error",
  default: initialError,
});
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
  const {showErrorMessage,showSuccessMessage} = useAlert()
  const { user } = useAuth();
  const userCollection = collection(db, "users");
  const [file, setFile] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [url,setUrl] = React.useState<string>("");
  /** ======== < ファイル取得 > ======== */
  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setImage(file);
  }
  
  /** ======== < ファイルアップロード > =========== */
  const uploadFiles = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, "/images/" + file.name);
    const uploadTask = uploadBytes(storageRef, file);
    uploadTask.then(() => {
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
    });
  }
  /**========== <　店舗画像登録 > ==========-*/
  const uploadStoreImage = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, "/images/" + file.name);
    const uploadTask = uploadBytes(storageRef, file);
    uploadTask.then(() => {
      getDownloadURL(storageRef).then((url) => {
        setUrl(url);
      });
      showSuccessMessage("アップロードに成功しました")
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
      showSuccessMessage("ユーザーの更新に成功しました")
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
    } catch (error) {
      showErrorMessage("情報の読み取りに失敗しました");
    } 
  }
  return {
    file,
    image,
    handleChange,
    uploadFiles,
    changeDisplayName,
    uploadStoreImage,
    url,
    changeStaffData
  };
}
