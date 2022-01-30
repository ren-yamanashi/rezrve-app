//外部インポート
import {
  addDoc,
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect, FormEvent, useCallback } from "react";
import SendIcon from "@mui/icons-material/Send";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import { browser } from "process";
import { Chat } from "../../../models/Chat";
//queryの方を指定
type Query = {
  id: string;
};

export default function SendChat() {
  const [u, setU] = useState<Users[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const router = useRouter();
  const query2 = router.query as Query;
  //入力内容を保存
  const { user } = useAuth();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**========
     * Firebaseからユーザーを取得
     *========*/
    async function loadUser() {
      const db = getFirestore();
      const q = query(collection(db, "users"), where("id", "==", user.uid));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //ReserveList一覧の展開
      const gotUsers = snapshot.docs.map((doc) => {
        const user = doc.data() as Users;
        user.id = doc.id;
        return user;
      });
      setU(gotUsers);
    }
    loadUser();
  }, [process, browser, user]);
  /**==============
   * FirebaseからChatを取得
   *============*/
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    async function loadChats() {
      const db = getFirestore();
      const q = query(collection(db, "ChatRoom"));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //ReserveList一覧の展開
      const gotChats = snapshot.docs.map((doc) => {
        const chat = doc.data() as Chat;
        chat.id = doc.id;
        return chat;
      });
      setChats(gotChats);
    }
    loadChats();
  }, [process, browser, user]);
  /**========
   * Chat 登録
   *========*/
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    const i = u.map((t) => t.userName);
    const v = i.shift();
    e.preventDefault();
    const db = getFirestore();
    await addDoc(collection(db, "ChatRoom"), {
      senderId: user.uid,
      message: msg,
      userName: v,
      createAt: serverTimestamp(),
    });
    setMsg("");
  }
  return (
    <>
      <React.Fragment>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
          <Box display="flex" textAlign="center" mt={10}>
            <Box ml={10} width={1000}>
              <TextField
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                multiline
                fullWidth
              />
            </Box>
            <IconButton type="submit">
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </React.Fragment>
    </>
  );
}
