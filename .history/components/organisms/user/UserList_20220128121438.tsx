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
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, TextField } from "@mui/material";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import Title from "../../atoms/Title";
import Header from "../../templates/Header";

export default function UsersList() {
  const [users, setUsers] = useState<Users[]>([]);
  const { user } = useAuth();
  console.log(users);
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
  return (
    <>
      <React.Fragment>
        <Box ml={3}>
          <Title>講師一覧</Title>
        </Box>
        <Table size="small">
          <TableHead style={{ backgroundColor: "#FFFFDD" }}>
            <TableRow>
              <TableCell>氏名</TableCell>
              <TableCell>メールアドレス</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>役割</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.id}</TableCell>
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
