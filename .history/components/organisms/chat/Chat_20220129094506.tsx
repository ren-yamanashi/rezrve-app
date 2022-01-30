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
  deleteDoc,
  orderBy,
  limit,
  QuerySnapshot,
  DocumentData,
  startAfter,
} from "firebase/firestore";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, {
  useState,
  useEffect,
  FormEvent,
  useCallback,
  useRef,
} from "react";
import SendIcon from "@mui/icons-material/Send";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import { browser } from "process";
import { Chat } from "../../../models/Chat";
import Title from "../../atoms/Title";
//queryの方を指定
type Query = {
  id: string;
};

export default function SendChat() {
  const [u, setU] = useState<Users[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const router = useRouter();
  const query2 = router.query as Query;
  const [isPaginationFinished, setIsPaginationFinished] = useState(false);
  const scrollContainerRef = useRef(null);
  //入力内容を保存
  const { user } = useAuth();
  const [msg, setMsg] = useState("");
  function createBaseQuery() {
    const db = getFirestore();
    return query(
      collection(db, "ChatRoom"),
      orderBy("createAt", "asc"),
      limit(10)
    );
  }
  function appendChats(snapshot: QuerySnapshot<DocumentData>) {
    const gotChats = snapshot.docs.map((doc) => {
      const chat = doc.data() as Chat;
      chat.id = doc.id;
      return chat;
    });
    setChats(chats.concat(gotChats));
  }
  async function loadChats() {
    const snapshot = await getDocs(createBaseQuery());

    if (snapshot.empty) {
      return;
    }
    appendChats(snapshot);
  }
  async function loadNextChats() {
    if (chats.length === 0) {
      return;
    }
    const lastChat = chats[chats.length - 1];
    const snapshot = await getDocs(
      query(createBaseQuery(), startAfter(lastChat.createAt))
    );
    if (snapshot.empty) {
      return;
    }
    appendChats(snapshot);
  }
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }

    loadChats();
  }, [process.browser, user]);

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
      const q = query(
        collection(db, "users"),
        where("id", "==", user.uid),
        orderBy("createAt", "asc")
      );
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
      const q = query(collection(db, "ChatRoom"), orderBy("createAt", "asc"));
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
    console.log(v);
    e.preventDefault();
    const db = getFirestore();
    await addDoc(collection(db, "ChatRoom"), {
      senderId: user.uid,
      message: msg,
      userName: user.uid,
      createAt: serverTimestamp(),
    });
    setMsg("");
    const q = query(collection(db, "ChatRoom"), orderBy("createAt", "asc"));
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
  /**========
   * Chatの削除
   *========*/
  const deleteChat = async (id: string, e: any) => {
    const db = getFirestore();
    const q = query(collection(db, "ChatRoom"), orderBy("createAt", "asc"));
    e.stopPropagation();
    await deleteDoc(doc(db, "ChatRoom", id));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotChats = snapshot.docs.map((doc) => {
      const chat = doc.data() as Chat;
      chat.id = doc.id;
      return chat;
    });
    setChats(gotChats);
  };
  return (
    <>
      <React.Fragment>
        <Box>
          <div className="col-12 col-md-6" ref={scrollContainerRef}>
            {chats.map((rsv) => (
              <>
                <CardContent
                  style={{
                    width: "80%",
                    borderRadius: "7px",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "#4689FF",
                    margin: "auto",
                  }}
                >
                  <div>{rsv.message}</div>
                  <div>{rsv.userName}</div>
                  <div>
                    {dayjs(rsv.createAt.toDate()).format("YYYY/MM/DD ")}
                  </div>
                </CardContent>
              </>
            ))}
          </div>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={onSubmit}
          sx={{ mt: 1, mb: 10, mx: "auto" }}
        >
          <Box display="flex" textAlign="center">
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
