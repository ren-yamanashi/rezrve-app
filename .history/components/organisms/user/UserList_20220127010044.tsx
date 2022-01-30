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
import { FreeList } from "../../../models/FreeList";
import { User } from "../../../models/User";
import Title from "../../atoms/Title";

export default function UsersList() {
  const [reserves, setReserves] = useState<FreeList[]>([]);
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**========
     * Firebaseからシフトを取得
     *========*/
    async function loadUsers() {
      const db = getFirestore();
      const q = query(collection(db, "user"));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //ReserveList一覧の展開
      const gotUsers = snapshot.docs.map((doc) => {
        const user = doc.data() as FreeList;
        user.id = doc.id;
        return user;
      });
      setUsers(gotUsers);
    }
    loadUsers();
  }, [process, browser, user]);
  return (
    <React.Fragment>
      <Box ml={3}>
        <Title>講師一覧</Title>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>講師名</TableCell>
            <TableCell>担当コース</TableCell>
            <TableCell>予約日時</TableCell>
            <TableCell>コース</TableCell>
            <TableCell>時間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reserves.map((rsv) => (
            <TableRow key={rsv.id}>
              <TableCell>{rsv.teacher}</TableCell>
              <TableCell>{rsv.student}</TableCell>
              <TableCell>
                {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
              </TableCell>
              <TableCell>{rsv.course}</TableCell>
              <TableCell>{`${rsv.time}:30`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
