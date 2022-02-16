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
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { FormEvent, useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { blue, teal, red } from "@mui/material/colors";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
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
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
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
export default function YoyakuManager() {
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [sortTeacher, setSortTeacher] = useState<string>("");
  const [sortTime, setSortTime] = useState<number>();
  const [test, setTest] = useState<string>("");
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [err, setErr] = useState<boolean>(false);
  const [student, setStudent] = useState("");
  const router = useRouter();
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleOpen3 = () => setOpen3(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);
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
        where("date", ">=", timestamp(xxx2)),
        orderBy("date", "asc"),
        orderBy("time", "asc")
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setErr(true);
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
  /**========
   * 並び替え
   *=======*/
  //入力された講師名 & 週目と曜日と時間で並び替え
  const filterTeacher = async () => {
    setErr(false);
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", false),
      where("date", "==", timestamp(xxx)),
      where("teacher", "==", sortTeacher),
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
  //リセット
  const filterReset = async () => {
    setErr(false);
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
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
  const filterTime = async () => {
    setErr(false);
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", false),
      where("date", "==", timestamp(xxx)),
      where("time", "==", sortTime)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      setErr(true);
    }
    const getReserves = snapshot.docs.map((doc) => {
      const reserve = doc.data() as FreeList;
      reserve.id = doc.id;
      return reserve;
    });
    setFreeLists(getReserves);
  };
  /**=========
   * 予約登録
   *========*/
  async function onSubmit(id: string, e: FormEvent<HTMLFormElement>) {
    setErr(false);
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
      student: student,
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
    if (snapshot.empty) {
      setErr(true);
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as FreeList;
      reserve.id = doc.id;
      return reserve;
    });
    setFreeLists(gotReservers);
  }
  return (
    <>
      <React.Fragment>
        <Box ml={5}>
          <Title>予約登録</Title>
        </Box>
        <Box m={3} display="flex" alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="日付を選択"
              value={value}
              onChange={async (newValue) => {
                setValue(newValue);
                console.log(newValue);
                setErr(false);
                const day3 = new Date(newValue);
                const y3 = day3.getFullYear();
                const m3 = day3.getMonth();
                const d3 = day3.getDate();
                let xxx3 = new Date(y3, m3, d3, 12, 0, 0);
                const db = getFirestore();
                const q = query(
                  collection(db, "FreeSpace"),
                  where("reserved", "==", false),
                  where("date", "==", timestamp(xxx3)),
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
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Box ml={2}>
            <IconButton
              onClick={async () => {
                const day4 = new Date(value);
                const y4 = day4.getFullYear();
                const m4 = day4.getMonth();
                const d4 = day4.getDate() - 1;
                let xxx4 = new Date(y4, m4, d4, 12, 0, 0);
                console.log(xxx4);
                setErr(false);
                const db = getFirestore();
                const q = query(
                  collection(db, "FreeSpace"),
                  where("reserved", "==", false),
                  where("date", "==", timestamp(xxx4)),
                  orderBy("time", "asc")
                );
                const snapshot = await getDocs(q);
                if (snapshot.empty) {
                  setErr(true);
                }
                const getReservers = snapshot.docs.map((doc) => {
                  const reserve = doc.data() as FreeList;
                  return reserve;
                });
                setFreeLists(getReservers);
                setValue(xxx4);
                console.log(value);
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={async () => {
                const day4 = new Date(value);
                const y4 = day4.getFullYear();
                const m4 = day4.getMonth();
                const d4 = day4.getDate() + 1;
                let xxx4 = new Date(y4, m4, d4, 12, 0, 0);
                console.log(xxx4);
                setErr(false);
                const db = getFirestore();
                const q = query(
                  collection(db, "FreeSpace"),
                  where("reserved", "==", false),
                  where("date", "==", timestamp(xxx4)),
                  orderBy("time", "asc")
                );
                const snapshot = await getDocs(q);
                if (snapshot.empty) {
                  setErr(true);
                }
                const getReservers = snapshot.docs.map((doc) => {
                  const reserve = doc.data() as FreeList;
                  return reserve;
                });
                setFreeLists(getReservers);
                setValue(xxx4);
                console.log(value);
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
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
                <Box ml={3}>
                  時間
                  <IconButton onClick={handleOpen3}>
                    <FilterListIcon />
                  </IconButton>
                  <IconButton onClick={filterReset}>
                    <RestartAltIcon />
                  </IconButton>
                </Box>
                <Modal
                  open={open3}
                  onClose={handleClose3}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Box alignItems="top" m={0}>
                      <IconButton onClick={handleClose3}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          checked={sortTime == 10}
                          onChange={() => setSortTime(10)}
                          label="10:30"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          checked={sortTime == 11}
                          onChange={() => setSortTime(11)}
                          label="11:30"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          checked={sortTime == 12}
                          onChange={() => setSortTime(12)}
                          label="12:30"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          checked={sortTime == 13}
                          onChange={() => setSortTime(13)}
                          label="13:30"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          checked={sortTime == 14}
                          onChange={() => setSortTime(14)}
                          label="14:30"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          checked={sortTime == 15}
                          onChange={() => setSortTime(15)}
                          label="15:30"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          checked={sortTime == 16}
                          onChange={() => setSortTime(16)}
                          label="16:30"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          checked={sortTime == 17}
                          onChange={() => setSortTime(17)}
                          label="17:30"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          checked={sortTime == 18}
                          onChange={() => setSortTime(18)}
                          label="18:30"
                        />
                      </RadioGroup>
                    </FormControl>
                    <Box textAlign="right" mr={5}>
                      <Button
                        type="submit"
                        onClick={() => {
                          filterTime(), handleClose3();
                        }}
                        variant="contained"
                        sx={{ mt: 3, mb: 2, ml: 3 }}
                      >
                        決定
                      </Button>
                    </Box>
                  </Box>
                </Modal>
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
                  <Tooltip title={`予約する:${freeList.teacher}`} arrow>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2, ml: 3 }}
                      onClick={handleOpen2}
                    >
                      {`${freeList.time}:30`}
                    </Button>
                  </Tooltip>
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
                        <Title>生徒名を入力して予約</Title>
                        <Box
                          display="flex"
                          mb={2}
                        >{`講師名: ${freeList.teacher}`}</Box>
                        <Box display="flex">{`日時: ${dayjs(
                          freeList.date.toDate()
                        ).format("YYYY/MM/DD ")} ${freeList.time}:30`}</Box>
                        <Box width="30vw" display="flex">
                          <TextField
                            margin="normal"
                            required
                            id="studentName"
                            name="studentName"
                            label="生徒名"
                            sx={{ width: "80%" }}
                            autoComplete="studentName"
                            variant="standard"
                            onChange={(e) => setStudent(e.target.value)}
                          />
                        </Box>
                        <Button
                          type="submit"
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
        {err == true && (
          <Grid xs={12} sm={15}>
            <Alert
              variant="filled"
              severity="info"
              sx={{ m: 3, textAlign: "center" }}
            >
              予約可能なレッスンは見つかりませんでした
            </Alert>
          </Grid>
        )}
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
