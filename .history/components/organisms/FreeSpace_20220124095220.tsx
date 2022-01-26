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
  getDoc,
  runTransaction,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
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
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Stack from "@mui/material/Stack";
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
//queryの方を準備
type Query = {
  id: string;
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

export default function FreeSpace() {
  const router = useRouter();
  const query2 = router.query as Query;
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [sortTeacher, setSortTeacher] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");
  const [reserves, setReserves] = useState<FreeList>();
  const [reserved, setReserved] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useAuth();
  //日付をTimeStampになおす
  const [day, setDay] = React.useState(new Date());
  let y = day.getFullYear();
  let m = 1 + day.getMonth();
  let d = day.getDate();
  let date = `${y}/${m}/${d}`;
  console.log(date);

  //collection設定
  function getCollections() {
    const db = getFirestore();
    return {
      db,
      reserveCollection: collection(db, "FreeSpace"),
    };
  }
  /**================
   * Firebaseからシフトを取り出す
   *===============*/
  async function loadReserve() {
    if (query2.id === undefined) {
      return;
    }
    const { reserveCollection } = getCollections();
    const reserveDoc = await getDoc(doc(reserveCollection, query2.id)); //idを取り出す
    if (!reserveDoc.exists()) {
      return;
    }
    const gotReserve = reserveDoc.data() as FreeList;
    gotReserve.id = reserveDoc.id;
    if (gotReserve.student !== "") {
      setReserved(true);
    }
    setReserves(gotReserve);
  }

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
        where("date", "==", date),
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
  /**============
   * @param e 予約登録
   *============*/
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { db, reserveCollection } = getCollections();
    const reserveRef = doc(reserveCollection);
    await runTransaction(db, async (t: any) => {
      t.update(doc(reserveCollection, reserves.id), {
        student,
        course,
        reserved: true,
      });
    });
    setStudent("");
    setCourse("");
    router.push(`/shift/${user.uid}`);
  }
  useEffect(() => {
    loadReserve();
  }, [query2.id]);
  //入力された講師名 & 週目と曜日と時間で並び替え
  const filterTeacher = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("date", "==", date),
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
  const filterReset = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("date", "==", date),
      orderBy("time", "asc")
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
        <Box ml={3} display="flex" alignItems="center">
          <Box mr={5}>
            <Title>予約登録</Title>
          </Box>
          <Box width="10vw">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="For desktop"
                  value={day}
                  minDate={new Date("2017-01-01")}
                  onChange={(newValue) => {
                    setDay(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Box>
          <Button
            type="submit"
            onClick={filterReset}
            variant="contained"
            sx={{ mt: 3, mb: 2, ml: 3 }}
          >
            決定
          </Button>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width="20%">
                <Box margin="auto">
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
                  <IconButton onClick={filterReset}>
                    <RestartAltIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell width="20%">時間</TableCell>
              <TableCell width="20%">生徒名</TableCell>
              <TableCell width="10%">コース</TableCell>
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
                    onClick={handleOpen}
                  >
                    {`${freeList.time}:30`}
                  </Button>
                </TableCell>
                <TableCell>{freeList.student}</TableCell>
                <TableCell>{freeList.course}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
                onClick={() => {
                  filterReset(), handleClose();
                }}
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 3 }}
              >
                決定
              </Button>
            </Box>
          </Box>
        </Modal>
      </React.Fragment>
    </>
  );
}
