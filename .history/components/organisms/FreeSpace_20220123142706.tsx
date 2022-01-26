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
  startAt,
  endAt,
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
import { Checkbox, TextField } from "@mui/material";
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

export default function FreeSpace() {
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [sortTeacher, setSortTeacher] = useState<string>("");
  const { user } = useAuth();
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
      const q = query(
        collection(db, "FreeSpace"),
        orderBy("dayOfWeekNumber", "asc"),
        orderBy("weekNumber", "asc"),
        orderBy("time", "asc")
      );
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
  //入力された講師名 & 週目と曜日と時間で並び替え
  const FilterTeacher = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", true),
      orderBy("teacher"),
      startAt(sortTeacher),
      endAt(sortTeacher + "\uf8ff")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as FreeList;
      reserve.id = doc.id;
      return reserve;
    });
    setFreeLists(gotReservers);
  };
  return (
    <>
      <Header />
      <React.Fragment>
        <Box ml={3}>
          <Title>講師空き枠一覧</Title>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Box>
                  <TextField
                    margin="normal"
                    required
                    id="sortTeacher"
                    label="講師名で絞り込み"
                    name="sortTeacher"
                    autoComplete="sortTeacher"
                    autoFocus
                    onChange={(e) => setSortTeacher(e.target.value)}
                  />
                  <Button
                    type="submit"
                    onClick={FilterTeacher}
                    variant="contained"
                    sx={{ mt: 3, mb: 2, ml: 3 }}
                  >
                    決定
                  </Button>
                  <IconButton>
                    <RestartAltIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>曜日</TableCell>
              <TableCell>週目</TableCell>
              <TableCell>時間</TableCell>
              <TableCell>生徒名</TableCell>
              <TableCell>コース</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {freeLists.map((freeList) => (
              <TableRow key={freeList.id}>
                <TableCell>{freeList.teacher}</TableCell>
                <TableCell>{freeList.dayOfWeek}</TableCell>
                <TableCell>{freeList.weekNumber}</TableCell>
                <TableCell>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, ml: 3 }}
                  >
                    <Link href={`/reserve/add/${freeList.id}`}>
                      {`${freeList.time}:30`}
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>{freeList.student}</TableCell>
                <TableCell>{freeList.course}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </>
  );
}
