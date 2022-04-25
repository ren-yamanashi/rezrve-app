import { atom, useRecoilState } from "recoil";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as React from "react";
import { collection,doc,runTransaction, } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "../useUserAuth";
import { useAlert } from "../../useAlert";
import { db } from "../useFirebase";
const initialError: boolean = false;
const initialSending: boolean = false;

export const sendingState = atom({
  key: "sending",
  default: initialSending,
});
export const loadingState = atom({
  key: "sending2",
  default: initialSending,
});
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
  const [file, setFile] = useRecoilState(fileState);
  const [image, setImage] = useRecoilState(imageState);
  const [sending, setSending] = useRecoilState(sendingState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [url,setUrl] = useRecoilState(urlState);
  /** ======== < ファイル取得 > ======== */
  const handleChange = (event) => {
    setFile(event.target.files[0]);
    setImage(file);
    setSending(true);
  }
  
  /** ======== < ファイルアップロード > =========== */
  const uploadFiles = (e) => {
    e.preventDefault();
    setSending(true);
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
      setSending(false);
    });
  }
  /**========== <　店舗画像登録 > ==========-*/
  const uploadStoreImage = (e) => {
    e.preventDefault();
    setSending(true);
    const storageRef = ref(storage, "/images/" + file.name);
    const uploadTask = uploadBytes(storageRef, file);
    uploadTask.then(() => {
      getDownloadURL(storageRef).then((url) => {
        setUrl(url);
      });
      showSuccessMessage("アップロードに成功しました")
    });
  }
  /** ======= < 名前変更 > ======== */
  const changeDisplayName = async(e, companyId,name,address,url,times,) => {
    e.preventDefault();
    setLoading(false);
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
      showSuccessMessage("ユーザー情報の更新に成功しました")
    } catch (error) {
      showErrorMessage("ユーザー情報の読み取りに失敗しました")
    } finally {
      setLoading(true);
    }
  }
  return {
    file,
    image,
    sending,
    loading,
    handleChange,
    uploadFiles,
    changeDisplayName,
    uploadStoreImage,
    url
  };
}
