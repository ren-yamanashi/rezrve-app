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
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
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
  /**========
   * Firebaseからユーザーを取得
   *========*/
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
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
  /**========
   * ================
   * @returns FirebaseからChatを取得して表示させる処理
   * ================
   *========*/
  //ベースクエリ　を作成
  function createBaseQuery() {
    const db = getFirestore();
    return query(
      collection(db, "ChatRoom"),
      orderBy("createAt", "desc"),
      limit(8)
    );
  }
  //Chatを表示
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
      setIsPaginationFinished(true);
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
  /**==========
   * スクロール処理
   *=========*/
  function onScroll() {
    if (isPaginationFinished) {
      return;
    }
    const container = scrollContainerRef.current;
    if (container === null) {
      return;
    }
    const rect = container.getBoundingClientRect();
    if (rect.top + rect.height > window.innerHeight) {
      return;
    }
    loadNextChats();
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [chats, scrollContainerRef.current, isPaginationFinished]);
  /**========
   * Chat 登録
   *========*/
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const db = getFirestore();
    const q = query(collection(db, "ChatRoom"), orderBy("createAt", "desc"));
    await addDoc(collection(db, "ChatRoom"), {
      senderId: user.uid,
      message: msg,
      userName: user.displayName,
      createAt: serverTimestamp(),
    });
    setMsg("");
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
  }
  /**========
   * Chatの削除
   *========*/
  const deleteChat = async (id: string, e: any) => {
    const db = getFirestore();
    const q = query(collection(db, "ChatRoom"), orderBy("createAt", "desc"));
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
        <Box>
          <div className="col-12 col-md-6" ref={scrollContainerRef}>
            {chats.map((rsv) => (
              <>
                <Card>
                  <CardHeader
                    title={rsv.userName}
                    subheader={dayjs(rsv.createAt.toDate()).format(
                      "YYYY/MM/DD HH:mm"
                    )}
                  />
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
                    <CardMedia
                      component="img"
                      height="50"
                      image="https://source.unsplash.com/random"
                      alt="Icon"
                    />
                    <Typography>{rsv.message}</Typography>
                  </CardContent>
                </Card>
              </>
            ))}
          </div>
        </Box>
      </React.Fragment>
    </>
  );
}
