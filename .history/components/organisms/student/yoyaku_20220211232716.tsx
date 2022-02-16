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
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import dayjs from "dayjs";
import { browser } from "process";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { blue, teal, red } from "@mui/material/colors";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
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
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import Header from "../../templates/Header";
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

//提出済み全シフト一覧ページ　※このページから予約登録画面に遷移できる
//予約済みフラグ(reserved)が false のみ抽出　※displayNameに「管理者」が入っている場合のみこのページに遷移可能
export default function YoyakuSeito() {
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [sortTeacher, setSortTeacher] = useState<string>("");
  const [test, setTest] = useState<string>("");
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [reserves, setReserves] = useState<FreeList>();
  const router = useRouter();
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const initialDate = new Date();
  const [value, setValue] = useState(initialDate);
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
      setTest(u.email);
      console.log(test);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("reserved", "==", false),
        where("date", "==", timestamp(xxx)),
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
  /**========
   * 並び替え
   *=======*/
  //入力された講師名 & 週目と曜日と時間で並び替え
  const filterTeacher = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", false),
      where("date", ">=", timestamp(xxx2)),
      where("teacher", "==", sortTeacher),
      orderBy("date", "asc"),
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
  //リセット
  const filterReset = async (newValue) => {
    setValue(newValue);
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", false),
      where("date", "==", timestamp(xxx)),
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
  /**=========
   * 予約登録
   *========*/
  const getRsv = async (id: string, e: any) => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", false),
      where("date", ">=", timestamp(xxx2)),
      orderBy("date", "asc"),
      orderBy("time", "asc")
    );
    e.preventDefault();
    await updateDoc(doc(db, "FreeSpace", id), {
      student: user.displayName,
      reserved: true,
      reserverUid: user.uid,
      reserveAt: serverTimestamp(),
    });
    toast.success("予約を登録しました", {
      position: "bottom-left",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
        <Box ml={5}>
          <Title>予約登録ページ</Title>
        </Box>
        <Box m={3} display="flex" alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="日付を選択"
              value={value}
              onChange={(newValue) => {
                setValue(newValue), console.log(newValue);
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
                <Box ml={3}>
                  講師名
                  <IconButton onClick={handleOpen}>
                    <FilterListIcon />
                  </IconButton>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Box alignItems="top" m={0}>
                        <IconButton onClick={handleClose}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                      <Box textAlign="center">
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
                          onClick={filterTeacher}
                          variant="contained"
                          sx={{ mt: 3, mb: 2, ml: 3 }}
                        >
                          決定
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                  <IconButton onClick={filterReset}>
                    <RestartAltIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell style={{ fontWeight: 600 }}>
                <Box ml={3}>日付</Box>
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
                  <Box ml={3}>
                    {dayjs(freeList.date.toDate()).format("YYYY/MM/DD ")}
                  </Box>
                </TableCell>
                <TableCell>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, ml: 3 }}
                    onClick={handleOpen2}
                  >
                    {`${freeList.time}:30`}
                  </Button>
                  <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Box alignItems="top" m={0}>
                        <IconButton onClick={handleClose2}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                      <Box textAlign="center">
                        <Title>予約を確定しますか?</Title>
                        <Button
                          type="submit"
                          onClick={(e) => {
                            getRsv(freeList.id, e), filterReset, handleClose2;
                          }}
                          variant="contained"
                          sx={{ mt: 3, mb: 2, mx: 3 }}
                        >
                          確定
                        </Button>
                        <Button
                          type="submit"
                          onClick={handleClose2}
                          variant="contained"
                          sx={{
                            mt: 3,
                            mb: 2,
                            mx: 3,
                            bgcolor: teal[500],
                            "&:hover": { bgcolor: "#2E8B57" },
                          }}
                        >
                          戻る
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
