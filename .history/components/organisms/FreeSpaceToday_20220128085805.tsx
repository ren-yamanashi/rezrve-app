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
import Link from "next/link";
import Button from "@mui/material/Button";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";

//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { FreeList } from "../../models/FreeList";
import Title from "../atoms/Title";
import Header from "../templates/Header";

//日付をTimeStamp型にして返す
const timestamp = (datetimeStr: any) => {
  return Timestamp.fromDate(new Date(datetimeStr));
};

export default function FreeSpaceToday() {
  const day = new Date();
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [sortTeacher, setSortTeacher] = useState<string>("");
  const { user } = useAuth();
  const [date, setDate] = useState<moment.Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<boolean>(false);

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
        where("reserved", "==", false),
        where("date", "==", timestamp(day)),
        orderBy("time", "asc")
      );
      const snapshot = await getDocs(q);
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
  const filterTeacher = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", false),
      where("date", "==", timestamp(date)),
      orderBy("teacher"),
      startAt(sortTeacher),
      endAt(sortTeacher + "\uf8ff")
    );
    const snapshot = await getDocs(q);
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as FreeList;
      reserve.id = doc.id;
      return reserve;
    });
    setFreeLists(gotReservers);
  };
  const filterReset = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", false),
      where("date", "==", timestamp(date)),
      orderBy("time", "asc")
    );
    const snapshot = await getDocs(q);
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
        <Box ml={3} display="flex" alignItems="center">
          <Box mr={5}>
            <Title>予約登録</Title>
          </Box>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width="20%">講師名</TableCell>
              <TableCell width="20%">時間</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {freeLists.map((freeList) => (
              <TableRow key={freeList.id}>
                <TableCell>{freeList.teacher}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </>
  );
}
