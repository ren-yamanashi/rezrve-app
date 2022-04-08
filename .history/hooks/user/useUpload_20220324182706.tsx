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
} from "firebase/firestore";
//import in File
import { Users } from "../../models/Users";
import { User } from "../../models/User";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "../useUserAuth";
//create state use atom
const initialFreeSpace: Users[] = [];
const initialUser: User = null;
const initialError: boolean = false;
const initialSending: boolean = false;
export const SpaceState = atom({
  key: "users",
  default: initialFreeSpace,
});
export const sendingState = atom({
  key: "sending",
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
// getFireStore
const db = getFirestore();

export function handleChange(event) {
  setFile(event.target.files[0]);
  setImage(file);
}

export function UploadImage() {
  const storage = getStorage();
  const userCollection = collection(db, "users");
  const [sending, setSending] = useRecoilState(sendingState);
  const [file, setFile] = useState(null);
  const storageRef = ref(storage, "/images/" + file.name);
  function changeUserName(e, image) {
    e.preventDefault();
    //upload
    setSending(true);
  }
}
