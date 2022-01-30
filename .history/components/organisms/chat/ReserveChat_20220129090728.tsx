import {
  collection,
  getFirestore,
  query,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Chat } from "../../../models/Chat";
import Title from "../../atoms/Title";
export default function ReserveChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**========
     * FirebaseからChatを取得
     *========*/
    async function loadReserves() {
      const db = getFirestore();
      const q = query(collection(db, "ChatRoom"));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //ChatRoom一覧の展開
      const gotChat = snapshot.docs.map((doc) => {
        const chat = doc.data() as Chat;
        chat.id = doc.id;
        return chat;
      });
      setChats(gotChat);
    }
    loadReserves();
  }, [process, browser, user]);
  /**========
   * Chatの削除
   *========*/
  const deleteChat = async (id: string, e: any) => {
    const db = getFirestore();
    const q = query(collection(db, "ChatRoom"));
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
    <React.Fragment>
      <Box>
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
          <Box>
            <Title>本日の予約</Title>
            <Table size="small">
              <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: 600 }}>内容</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>名前</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>日時</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chats.map((rsv) => (
                  <TableRow key={rsv.id}>
                    <TableCell>{rsv.message}</TableCell>
                    <TableCell>{rsv.userName}</TableCell>
                    <TableCell>
                      {dayjs(rsv.createAt.toDate()).format("YYYY/MM/DD ")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Box>
    </React.Fragment>
  );
}
