//外部インポート
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  runTransaction,
  query,
  where,
  updateDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import Title from "../../atoms/Title";
import Modal from "@mui/material/Modal";
import React, { useState, useEffect, FormEvent, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Typography from "@mui/material/Typography";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import Header from "../../templates/Header";
import { FreeList } from "../../../models/FreeList";
import { Users } from "../../../models/Users";
import { browser } from "process";
import { teal } from "@mui/material/colors";
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
//queryの方を準備
type Query = {
  id: string;
};
//Itemのスタイル
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "#FFFFDD",
}));
const Item2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
/**===============
 * @returns 予約編集画面の作成　キャンセル・生徒名/コースの変更が可能
 *===============*/
export default function YoyakuKoushiPage() {
  const router = useRouter();
  const query_ = router.query as Query;
  const [users, setUsers] = useState<Users>();
  const [reserves, setReserves] = useState<FreeList>();
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [test, setTest] = useState("");
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const initialDate = new Date();
  const [value, setValue] = useState(initialDate);
  //フォームの入力内容をステートに保管
  const { user } = useAuth();
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");
  const [test2, setTest2] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
  //collection設定
  function getCollections() {
    const db = getFirestore();
    return {
      db,
      usersCollection: collection(db, "users"),
    };
  }
  /**================
   * Firebaseからシフトを取り出す
   *===============*/
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    async function loadUser() {
      if (query_.id === undefined) {
        return;
      }
      const { usersCollection } = getCollections();
      const userDoc = await getDoc(doc(usersCollection, query_.id)); //idを取り出す
      if (!userDoc.exists()) {
        return;
      }
      const gotUser = userDoc.data() as Users;
      gotUser.id = userDoc.id;
      setUsers(gotUser);
      console.log(users.userName);
    }
    try {
      loadUser();
      console.log(user);
      loadRsv();
    } catch (error) {
      console.log(error);
    }

    if (!router.isReady) {
      return;
    }
    async function loadRsv() {
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("reserved", "==", false),
        where("teacher", "==", users?.userName),
        where("date", ">=", new Date()),
        orderBy("date", "asc"),
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
  }, [process, browser, user, query_.id]);
  //リセット
  const filterReset = async (newValue) => {
    setValue(newValue);
    console.log(value);
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", false),
      where("date", ">=", new Date()),
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
    setValue(newValue);
    console.log(value);
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
              onChange={filterReset}
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
                          //   onChange={(e) => setSortTeacher(e.target.value)}
                        />
                        <Button
                          type="submit"
                          //   onClick={filterTeacher}
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
