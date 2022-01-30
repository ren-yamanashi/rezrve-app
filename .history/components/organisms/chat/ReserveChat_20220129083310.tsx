import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  startAt,
  endAt,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Chat } from "../../../models/Chat";
import Title from "../../atoms/Title";
export default function ReserveToday() {
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
                  <TableCell style={{ fontWeight: 600 }}>氏名</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>内容</TableCell>
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
