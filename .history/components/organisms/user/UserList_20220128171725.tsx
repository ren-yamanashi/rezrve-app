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
  getDoc,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import Title from "../../atoms/Title";
import { Button } from "@mui/material";

export default function UsersList() {
  const [users, setUsers] = useState<Users[]>([]);
  const { user } = useAuth();
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
    async function loadReserves() {
      const db = getFirestore();
      const q = query(
        collection(db, "users"),
        where("userName", "!=", "ユーザー")
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
      setUsers(gotUsers);
    }
    loadReserves();
  }, [process, browser, user]);
  /**==============
   * ユーザー削除
   *=============*/
  const deleteUser = async (id: string, e: any) => {
    const db = getFirestore();
    const q = query(
      collection(db, "users"),
      where("userName", "!=", "ユーザー")
    );
    e.stopPropagation();
    await deleteDoc(doc(db, "users", id));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotUsers = snapshot.docs.map((doc) => {
      const user = doc.data() as Users;
      user.id = doc.id;
      return user;
    });
    setUsers(gotUsers);
  };
  return (
    <>
      <React.Fragment>
        <Box ml={3}>
          <Title>講師一覧</Title>
        </Box>
        <Table size="small">
          <TableHead style={{ backgroundColor: "#FFFFDD" }}>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>氏名</TableCell>
              <TableCell style={{ fontWeight: 600 }}>メールアドレス</TableCell>
              <TableCell style={{ fontWeight: 600 }}>役割</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.userName}
                  <Button onClick={(e) => deleteUser(user.id, e)}>削除</Button>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.isAnonymous == false ? "講師" : "管理者"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </>
  );
}
