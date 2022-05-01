import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as React from "react";
import { collection,doc,runTransaction, } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "../useUserAuth";
import { useAlert } from "../../useAlert";
import { db } from "../useFirebase";
import { atom, useRecoilState } from "recoil";

export type ImageItemType = {
  file:any;
  image:any;
  url:string;
}
export const imageState = atom<ImageItemType>({
  key:"imageState",
  default:null
})

export const UploadImage = () => {
  const storage = getStorage();
  const auth = getAuth();
  const userCollection = collection(db, "users");
  const [imageData,setImageData] = useRecoilState(imageState);
  const [data,setData] = React.useState({file:null,image:null,url:""})
  const file = data.file
  const image = data.image
  const url = data.url
  const {showErrorMessage,showSuccessMessage} = useAlert()
  const { user } = useAuth();
  /** ======== < ファイル取得 > ======== */
  const handleChange = async (event) => {
    setImageData({...imageData,file:event.target.files[0]})
    
    setData({...data,file:event.target.files[0]})
    setData({...data,image:file})
  }
  const getFiles = (e) => {
    handleChange(e).then(() => setImageData({...imageData,image:imageData.file}))
  }
  
  /** ======== < ファイルアップロード > =========== */
  const uploadFiles = async(e) => {
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
  const uploadStoreImage = async(e) => {
    e.preventDefault();
    const storageRef = ref(storage, "/images/" + imageData.file.name);
    const uploadTask = uploadBytes(storageRef, imageData.file);
    uploadTask.then(() => {
      getDownloadURL(storageRef).then((url) => {
        setData({...data,url:url})
        setImageData({...imageData,url:url});
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
    changeStaffData,
    imageData,
    getFiles
  };
}
