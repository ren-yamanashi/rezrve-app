import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Link_mui from "@mui/material/Link";
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
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { FreeList } from "../../models/FreeList";
import Title from "../atoms/Title";
import Header from "../templates/Header";

export function FreeSpace() {
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const { user } = useAuth();
  //   const [open, setOpen] = useState(false);
  //   const [open2, setOpen2] = useState(false);
  //   const [open3, setOpen3] = useState(false);
  //   const [sortTeacher, setSortTeacher] = useState<string>("");
  //   const [sortCourse, setSortCourse] = useState<string>("");
  //   const [sortStudent, setSortStudent] = useState<string>("");

  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**========
     * Firebaseからデータを取得
     *========*/
    async function loadFree() {
      const db = getFirestore();
      const q = query(collection(db, "FreeSpace"));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists(gotFreeList);
    }
    loadFree();
  }, [process, browser, user]);

  return (
    <>
      <Header />
      <React.Fragment>
        <Title>講師空き枠一覧</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>講師名</TableCell>
              <TableCell>曜日</TableCell>
              <TableCell>週目</TableCell>
              <TableCell>時間</TableCell>
              <TableCell>生徒名</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {freeLists.map((freeList) => (
              <TableRow key={freeList.id}>
                <TableCell>{freeList.Teacher}</TableCell>
                <TableCell>{freeList.DayOfWeek}</TableCell>
                <TableCell>{freeList.WeekNumber}</TableCell>
                <TableCell>{freeList.Time}</TableCell>
                <TableCell>{freeList.Student}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </>
  );
}
