//外部インポート
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import Typography from "@mui/material/Typography";
import { getDatabase, ref, set } from "firebase/database";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect, FormEvent, useCallback } from "react";
import SendIcon from "@mui/icons-material/Send";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import { deflateSync } from "zlib";
//queryの方を指定
type Query = {
  id: string;
};

export default function Chat() {
  const [user, setUser] = useState<Users>();
  const router = useRouter();
  const query = router.query as Query;
  //入力内容を保存
  const { user: currentUser } = useAuth();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (query.id === undefined) {
      return;
    }
    /**=========
     * Firebaseからユーザーを取り出す
     *========*/
    async function loadUser() {
      const db = getFirestore();
      const ref = doc(collection(db, "users"), query.id);
      const userDoc = await getDoc(ref);
      if (!userDoc.exists()) {
        return;
      }
      const gotUser = userDoc.data() as Users;
      gotUser.id = userDoc.id;
      setUser(gotUser);
    }
    loadUser();
  }, [query.id]);
  /**========
   * Chat 登録
   *========*/
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const db = getFirestore();
    await addDoc(collection(db, "ChatRoom"), {
      senderId: currentUser.uid,
      message: msg,
      userName: user.userName,
      createAt: serverTimestamp(),
    });
    setMsg("");
  }
  return (
    <>
      <React.Fragment>
        <Box display="flex">
          <Box textAlign="center" mt={10} ml={10} width={1000}>
            <TextField
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              multiline
              fullWidth
            />
          </Box>
          <IconButton>
            <SendIcon />
          </IconButton>
        </Box>
      </React.Fragment>
    </>
  );
}
