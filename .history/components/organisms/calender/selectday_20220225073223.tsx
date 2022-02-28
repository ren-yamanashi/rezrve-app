import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  Timestamp,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import dayjs from "dayjs";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import TextField from "@mui/material/TextField";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import Header from "../../templates/Header";
import { useRouter } from "next/router";
import { browser } from "process";
import { blue, grey, teal } from "@mui/material/colors";

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

//スケジュール表の作成　全てのスケジュールを参照することができる。
//※ただし、このサイトリンクが表示されるのは名前に「管理者」がつく場合のみ
export default function SelectDayAll() {
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [freeLists10, setFreeLists10] = useState<FreeList[]>([]);
  const [freeLists11, setFreeLists11] = useState<FreeList[]>([]);
  const [freeLists12, setFreeLists12] = useState<FreeList[]>([]);
  const [freeLists13, setFreeLists13] = useState<FreeList[]>([]);
  const [freeLists14, setFreeLists14] = useState<FreeList[]>([]);
  const [freeLists15, setFreeLists15] = useState<FreeList[]>([]);
  const [freeLists16, setFreeLists16] = useState<FreeList[]>([]);
  const [freeLists17, setFreeLists17] = useState<FreeList[]>([]);
  const [freeLists18, setFreeLists18] = useState<FreeList[]>([]);
  const [e10, setE10] = useState(false);
  const [e11, setE11] = useState(false);
  const [e12, setE12] = useState(false);
  const [e13, setE13] = useState(false);
  const [e14, setE14] = useState(false);
  const [e15, setE15] = useState(false);
  const [e16, setE16] = useState(false);
  const [e17, setE17] = useState(false);
  const [e18, setE18] = useState(false);
  const [value, setValue] = useState<Date | null>(new Date());
  const [test, setTest] = useState("");
  const [err, setErr] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<number>(0);
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
  const { user } = useAuth();
  const router = useRouter();
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };

  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }

    async function loadRsv() {
      const db = getFirestore();
      const u = user;
      setTest(u.displayName);
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("date", "==", timestamp(xxx2))
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
    //10時
    async function loadRsv10() {
      setE10(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 10)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE10(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists10(gotFreeList);
    }
    //11時
    async function loadRsv11() {
      setE11(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 11)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE11(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists11(gotFreeList);
    }
    //12時
    async function loadRsv12() {
      setE12(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 12)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE12(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists12(gotFreeList);
    }
    //13時
    async function loadRsv13() {
      setE13(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 13)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE13(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists13(gotFreeList);
    }
    //14時
    async function loadRsv14() {
      setE14(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 14)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE14(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists14(gotFreeList);
    }
    //15時
    async function loadRsv15() {
      setE15(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 15)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE15(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists15(gotFreeList);
    }
    //16時
    async function loadRsv16() {
      setE16(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 16)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE16(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists16(gotFreeList);
    }
    //17時
    async function loadRsv17() {
      setE17(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 17)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE17(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists17(gotFreeList);
    }
    //18時
    async function loadRsv18() {
      setE18(false);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 18)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setE18(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists18(gotFreeList);
    }
    loadRsv();
    loadRsv10();
    loadRsv11();
    loadRsv12();
    loadRsv13();
    loadRsv14();
    loadRsv15();
    loadRsv16();
    loadRsv17();
    loadRsv18();
  }, [process, browser, user]);
  const createShift = async (e: any) => {
    setErr(false);
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", test),
      where("time", "==", 10),
      where("date", "==", timestamp(xxx))
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      e.preventDefault();
      await addDoc(collection(db, "FreeSpace"), {
        teacher: test,
        student: "",
        date: timestamp(xxx),
        reserved: false,
        completed: false,
        time: 10,
        createAt: serverTimestamp(),
        senderUid: user.uid,
      });
      router.reload();
    } else {
      setErr(true);
      return;
    }
  };
  return (
    <>
      <React.Fragment>
        <Box ml={3}>
          <Title>予約スケジュール</Title>
        </Box>
        <Box
          ml={5}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Box mr={5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="日付を選択"
                value={value}
                onChange={async (newValue) => {
                  console.log(newValue);
                  setValue(newValue);
                  const day3 = new Date(newValue);
                  const y3 = day3.getFullYear();
                  const m3 = day3.getMonth();
                  const d3 = day3.getDate();
                  let xxx = new Date(y3, m3, d3, 12, 0, 0);
                  const db = getFirestore();
                  const q = query(
                    collection(db, "FreeSpace"),
                    where("senderUid", "==", user.uid),
                    where("date", "==", timestamp(xxx))
                  );
                  const snapshot = await getDocs(q);
                  //FreeList一覧の展開
                  const gotFreeList = snapshot.docs.map((doc) => {
                    const free = doc.data() as FreeList;
                    free.id = doc.id;
                    return free;
                  });
                  setFreeLists(gotFreeList);
                  async function loadRsv() {
                    const db = getFirestore();
                    const u = user;
                    setTest(u.displayName);
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx))
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
                  //10時
                  async function loadRsv10() {
                    setE10(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 10)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE10(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists10(gotFreeList);
                  }
                  //11時
                  async function loadRsv11() {
                    setE11(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 11)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE11(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists11(gotFreeList);
                  }
                  //12時
                  async function loadRsv12() {
                    setE12(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 12)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE12(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists12(gotFreeList);
                  }
                  //13時
                  async function loadRsv13() {
                    setE13(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 13)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE13(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists13(gotFreeList);
                  }
                  //14時
                  async function loadRsv14() {
                    setE14(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 14)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE14(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists14(gotFreeList);
                  }
                  //15時
                  async function loadRsv15() {
                    setE15(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 15)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE15(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists15(gotFreeList);
                  }
                  //16時
                  async function loadRsv16() {
                    setE16(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 16)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE16(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists16(gotFreeList);
                  }
                  //17時
                  async function loadRsv17() {
                    setE17(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 17)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE17(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists17(gotFreeList);
                  }
                  //18時
                  async function loadRsv18() {
                    setE18(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 18)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setE18(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists18(gotFreeList);
                  }
                  loadRsv(),
                    loadRsv10(),
                    loadRsv11(),
                    loadRsv12(),
                    loadRsv13(),
                    loadRsv14(),
                    loadRsv15(),
                    loadRsv16(),
                    loadRsv17(),
                    loadRsv18();
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        <Table size="small" sx={{ my: 3 }}>
          <TableHead style={{ backgroundColor: "#FFFFDD" }}>
            <TableRow>
              <TableCell style={{ fontWeight: 600, width: "15%" }} />
              <TableCell style={{ fontWeight: 600 }}>10:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>11:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>12:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>13:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>14:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>15:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>16:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>17:30</TableCell>
              <TableCell style={{ fontWeight: 600 }}>18:30</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={freeLists.length}>
              <TableCell style={{ fontWeight: 600 }}>{test}</TableCell>
              {e10 == true && (
                <TableCell
                  sx={{
                    bgcolor: grey[300],
                    cursor: "pointer",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                    height: 50,
                  }}
                  onClick={() => {
                    setOpen(true);
                    setTime(10);
                  }}
                />
              )}
              {freeLists10.map((value) =>
                value.student !== "" ? (
                  <Tooltip
                    title={
                      <>
                        <Box>{`講師名:${value.teacher}`}</Box>
                        <Box>{`生徒名:${value.student}`}</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: blue[400],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/edit/${value.id}`)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title={
                      <>
                        <Box>クリックして予約</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: "white",
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/add/${value.id}`)}
                    ></TableCell>
                  </Tooltip>
                )
              )}

              {e11 == true && (
                <TableCell
                  sx={{
                    bgcolor: grey[300],
                    cursor: "pointer",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                    height: 50,
                  }}
                />
              )}
              {freeLists11.map((value) =>
                value.student !== "" ? (
                  <Tooltip
                    title={
                      <>
                        <Box>{`講師名:${value.teacher}`}</Box>
                        <Box>{`生徒名:${value.student}`}</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: blue[400],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/edit/${value.id}`)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title={
                      <>
                        <Box>クリックして予約</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: "white",
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/add/${value.id}`)}
                    ></TableCell>
                  </Tooltip>
                )
              )}
              {e12 == true && (
                <TableCell
                  sx={{
                    bgcolor: grey[300],
                    cursor: "pointer",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                    height: 50,
                  }}
                />
              )}
              {freeLists12.map((value) =>
                value.student !== "" ? (
                  <Tooltip
                    title={
                      <>
                        <Box>{`講師名:${value.teacher}`}</Box>
                        <Box>{`生徒名:${value.student}`}</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: blue[400],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/edit/${value.id}`)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title={
                      <>
                        <Box>クリックして予約</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: "white",
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/add/${value.id}`)}
                    ></TableCell>
                  </Tooltip>
                )
              )}
              {e13 == true && (
                <TableCell
                  sx={{
                    bgcolor: grey[300],
                    cursor: "pointer",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                    height: 50,
                  }}
                />
              )}
              {freeLists13.map((value) =>
                value.student !== "" ? (
                  <Tooltip
                    title={
                      <>
                        <Box>{`講師名:${value.teacher}`}</Box>
                        <Box>{`生徒名:${value.student}`}</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: blue[400],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/edit/${value.id}`)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title={
                      <>
                        <Box>クリックして予約</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: "white",
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/add/${value.id}`)}
                    ></TableCell>
                  </Tooltip>
                )
              )}
              {e14 == true && (
                <TableCell
                  sx={{
                    bgcolor: grey[300],
                    cursor: "pointer",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                    height: 50,
                  }}
                />
              )}
              {freeLists14.map((value) =>
                value.student !== "" ? (
                  <Tooltip
                    title={
                      <>
                        <Box>{`講師名:${value.teacher}`}</Box>
                        <Box>{`生徒名:${value.student}`}</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: blue[400],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/edit/${value.id}`)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title={
                      <>
                        <Box>クリックして予約</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: "white",
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/add/${value.id}`)}
                    ></TableCell>
                  </Tooltip>
                )
              )}
              {e15 == true && (
                <TableCell
                  sx={{
                    bgcolor: grey[300],
                    cursor: "pointer",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                    height: 50,
                  }}
                />
              )}
              {freeLists15.map((value) =>
                value.student !== "" ? (
                  <Tooltip
                    title={
                      <>
                        <Box>{`講師名:${value.teacher}`}</Box>
                        <Box>{`生徒名:${value.student}`}</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: blue[400],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/edit/${value.id}`)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title={
                      <>
                        <Box>クリックして予約</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: "white",
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/add/${value.id}`)}
                    ></TableCell>
                  </Tooltip>
                )
              )}
              {e16 == true && (
                <TableCell
                  sx={{
                    bgcolor: grey[300],
                    cursor: "pointer",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                    height: 50,
                  }}
                />
              )}
              {freeLists16.map((value) =>
                value.student !== "" ? (
                  <Tooltip
                    title={
                      <>
                        <Box>{`講師名:${value.teacher}`}</Box>
                        <Box>{`生徒名:${value.student}`}</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: blue[400],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/edit/${value.id}`)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title={
                      <>
                        <Box>クリックして予約</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: "white",
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/add/${value.id}`)}
                    ></TableCell>
                  </Tooltip>
                )
              )}

              {e17 == true && (
                <TableCell
                  sx={{
                    bgcolor: grey[300],
                    cursor: "pointer",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                    height: 50,
                  }}
                />
              )}
              {freeLists17.map((value) =>
                value.student !== "" ? (
                  <Tooltip
                    title={
                      <>
                        <Box>{`講師名:${value.teacher}`}</Box>
                        <Box>{`生徒名:${value.student}`}</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: blue[400],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/edit/${value.id}`)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title={
                      <>
                        <Box>クリックして予約</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: "white",
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/add/${value.id}`)}
                    ></TableCell>
                  </Tooltip>
                )
              )}
              {e18 == true && (
                <TableCell
                  sx={{
                    bgcolor: grey[300],
                    cursor: "pointer",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                    height: 50,
                  }}
                />
              )}
              {freeLists18.map((value) =>
                value.student !== "" ? (
                  <Tooltip
                    title={
                      <>
                        <Box>{`講師名:${value.teacher}`}</Box>
                        <Box>{`生徒名:${value.student}`}</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: blue[400],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/edit/${value.id}`)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title={
                      <>
                        <Box>クリックして予約</Box>
                        <Box>{`レッスン日時:${dayjs(value.date.toDate()).format(
                          "YYYY/MM/DD "
                        )} ${value.time}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <TableCell
                      key={value.id}
                      sx={{
                        bgcolor: "white",
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => router.push(`/reserve/add/${value.id}`)}
                    ></TableCell>
                  </Tooltip>
                )
              )}
            </TableRow>
          </TableBody>
        </Table>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box alignItems="top" m={0}>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box textAlign="center">
              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
              >
                以下の内容でシフト登録します
              </Typography>
              <Box display="flex" mx="auto">
                <Box>{`${time}:30 ~ `}</Box>
                <Box>{`${time + 1}:30`}</Box>
              </Box>
              <Button
                type="submit"
                onClick={() => {
                  setOpen(false);
                }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                はい
              </Button>
            </Box>
          </Box>
        </Modal>
      </React.Fragment>
    </>
  );
}
