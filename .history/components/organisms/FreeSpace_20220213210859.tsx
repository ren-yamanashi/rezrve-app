import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  deleteDoc,
  getDocs,
  startAt,
  endAt,
  doc,
  Timestamp,
} from "firebase/firestore";
import { blue, teal } from "@mui/material/colors";
import { browser } from "process";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Link from "next/link";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { TextField } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { FreeList } from "../../models/FreeList";
import Title from "../atoms/Title";
import Header from "../templates/Header";
import { useRouter } from "next/router";

const day = new Date();
const y = day.getFullYear();
const m = day.getMonth();
const d = day.getDate();
let xxx = new Date(y, m, d, 12, 0, 0);
console.log(xxx);
//日付をTimeStamp型にして返す
const timestamp = (datetimeStr: any) => {
  return Timestamp.fromDate(new Date(datetimeStr));
};
//Modalのスタイル
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

//提出済みシフト一覧ページ　※このページから予約登録画面に遷移できる
//予約済みフラグ(reserved)が false のみ抽出
//シフト提出IDとユーザーIDが一致するシフトのみ抽出　※displayName　に「管理者」が入っている場合は、その限りではない
export default function FreeSpace() {
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [sortTeacher, setSortTeacher] = useState<string>("");
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [test, setTest] = useState<string>("");
  const [test2, setTest2] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
  const router = useRouter();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState<Date | null>(new Date());
  const day = new Date(value);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  const day2 = new Date();
  const y2 = day2.getFullYear();
  const m2 = day2.getMonth();
  const d2 = day2.getDate();
  let xxx2 = new Date(y2, m2, d2, 12, 0, 0);

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
      const u = user;
      setTest(u.displayName);
      console.log(test);
      setTest2(u.email);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("reserved", "==", false),
        where("date", ">=", timestamp(xxx2)),
        orderBy("date", "desc"),
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
      if (snapshot.empty) {
        setErr(true);
      }
    }
    loadFree();
  }, [process, browser, user]);
  //入力された講師名 & 週目と曜日と時間で並び替え
  const filterTeacher = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("reserved", "==", false),
      where("date", "==", timestamp(xxx)),
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
    setErr(false);
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("reserved", "==", false),
      where("date", "==", timestamp(xxx)),
      orderBy("time", "asc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      setErr(true);
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as FreeList;
      reserve.id = doc.id;
      return reserve;
    });
    setFreeLists(gotReservers);
  };
  /**========
   * シフト削除
   *========*/
  const deleteShift = async (id: string, e: any) => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("reserved", "==", false),
      where("date", "==", timestamp(xxx)),
      orderBy("time", "asc")
    );
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, "FreeSpace", id));
      const snapshot = await getDocs(q);
      const gotShift = snapshot.docs.map((doc) => {
        const shift = doc.data() as FreeList;
        shift.id = doc.id;
        return shift;
      });
      setFreeLists(gotShift);
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };
  return (
    <>
      <React.Fragment>
        <Box ml={5}>
          <Title>予約登録</Title>
        </Box>
        {test.indexOf("管理者") !== -1 && (
          <Box ml={3}>
            <Button onClick={() => router.push(`/shift/all/${user.uid}`)}>
              予約登録一覧を見る
            </Button>
          </Box>
        )}
        <Box m={3} display="flex" alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="日付を選択"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
            onClick={filterReset}
            sx={{ ml: 3, textAlign: "center" }}
            variant="contained"
          >
            OK
          </Button>
        </Box>
        <Table size="small">
          <TableHead style={{ backgroundColor: "#FFFFDD" }}>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>
                <Box ml={3}>講師名</Box>
              </TableCell>
              <TableCell style={{ fontWeight: 600 }}>
                <Box ml={3}>時間</Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {freeLists.map((freeList) => (
              <TableRow key={freeList.id}>
                <TableCell>
                  <Box ml={3}>{freeList.teacher}</Box>
                </TableCell>
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
                  {test2.indexOf("@bee") !== -1 && (
                    <Tooltip title="シフトを閉じる" arrow>
                      <IconButton onClick={(e) => deleteShift(freeList.id, e)}>
                        <DeleteIcon
                          sx={{
                            fontSize: 30,
                            color: teal[500],
                            mt: 3,
                            mb: 2,
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {err == true && (
          <Grid xs={12} sm={15}>
            <Alert
              variant="filled"
              severity="info"
              sx={{ m: 3, textAlign: "center" }}
            >
              予約可能なレッスンが見つかりませんでした
            </Alert>
          </Grid>
        )}
      </React.Fragment>
    </>
  );
}
