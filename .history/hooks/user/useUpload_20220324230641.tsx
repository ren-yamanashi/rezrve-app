import { atom, useRecoilState } from "recoil";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  query,
  startAt,
  endAt,
  where,
  orderBy,
  getDocs,
  QuerySnapshot,
  DocumentData,
  limit,
  runTransaction,
} from "firebase/firestore";
//import in File
import { Users } from "../../models/Users";
import { User } from "../../models/User";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "../useUserAuth";
import { toast } from "react-toastify";
//create state use atom
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
// getFireStore
const db = getFirestore();

export function UploadImage() {
  const storage = getStorage();
  const auth = getAuth();
  const { user } = useAuth();
  const userCollection = collection(db, "users");
  const [file, setFile] = useRecoilState(fileState);
  const [image, setImage] = useRecoilState(imageState);
  const [sending, setSending] = useRecoilState(sendingState);
  const [loading, setLoading] = useRecoilState(loadingState);
  function handleChange(event) {
    setFile(event.target.files[0]);
    setImage(file);
    setSending(true);
  }
  function uploadFiles(e) {
    e.preventDefault();
    setSending(true);
    const storageRef = ref(storage, "/images/" + file.name);
    const uploadTask = uploadBytes(storageRef, file);
    uploadTask.then(() => {
      // get url
      getDownloadURL(storageRef).then((url) => {
        runTransaction(db, async (t: any) => {
          //ドキュメントをアップデート
          t.update(doc(userCollection, user.uid), {
            url: url,
          });
        });
        updateProfile(auth.currentUser, {
          photoURL: url,
        });
      });
      toast.success("アップロードが完了しました", {
        position: "bottom-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      setSending(false);
    });
  }
  return { file, image, sending, loading, handleChange, changeUserName };
}
