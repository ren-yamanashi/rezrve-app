import { atom, useRecoilState } from "recoil";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as React from "react";
import {
  getFirestore,
  collection,
  doc,
  runTransaction,
} from "firebase/firestore";

import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "../useUserAuth";
import { toast } from "react-toastify";
import { useAlert } from "../alert/useAlert";
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

export function UploadImage() {
  const storage = getStorage();
  const db = getFirestore();
  const auth = getAuth();
  const {showErrorMessage,showSuccessMessage} = useAlert()
  const { user } = useAuth();
  const userCollection = collection(db, "users");
  const [file, setFile] = useRecoilState(fileState);
  const [image, setImage] = useRecoilState(imageState);
  const [sending, setSending] = useRecoilState(sendingState);
  const [loading, setLoading] = useRecoilState(loadingState);
  /** ======== < ファイル取得 > ======== */
  function handleChange(event) {
    setFile(event.target.files[0]);
    setImage(file);
    setSending(true);
  }
  
  /** ======== < ファイルアップロード > =========== */
  function uploadFiles(e) {
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

  /** ======= < 名前変更 > ======== */
  async function changeDisplayName(e, displayName) {
    e.preventDefault();
    setLoading(false);
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      runTransaction(db, async (e: any) => {
        e.update(doc(userCollection, user.uid), {
          userName: displayName,
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
  };
}
