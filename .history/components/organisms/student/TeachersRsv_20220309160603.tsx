import {
  collection,
  getFirestore,
  query,
  getDocs,
  deleteDoc,
  doc,
  where,
  Timestamp,
  orderBy,
  startAt,
  endAt,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FilterListIcon from "@mui/icons-material/FilterList";
import RadioGroup from "@mui/material/RadioGroup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment, { now } from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "@mui/lab/DatePicker";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { browser } from "process";
import Link_mui from "@mui/material/Link";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { TextField } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Typography from "@mui/material/Typography";
import { blue, grey, teal } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import { ja } from "date-fns/locale";
import { useRouter } from "next/router";

moment.locale("ja");

//日付をTimeStamp型にして返す
const timestamp = (datetimeStr: any) => {
  return Timestamp.fromDate(new Date(datetimeStr));
};

//queryの方を準備
type Query = {
  id: string;
};

export default function TeachersRsv() {
  const router = useRouter();
  const query_ = router.query as Query;
  const { user } = useAuth();
  const [err, setErr] = useState<boolean>(false);
  const [test, setTest] = useState("");
  const [u, setU] = useState<Users>();
  const [value, setValue] = useState<Date | number>(new Date());
  const [v, setV] = useState("");
  //１週間分
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [freeLists2, setFreeLists2] = useState<FreeList[]>([]);
  const [freeLists3, setFreeLists3] = useState<FreeList[]>([]);
  const [freeLists4, setFreeLists4] = useState<FreeList[]>([]);
  const [freeLists5, setFreeLists5] = useState<FreeList[]>([]);
  const [freeLists6, setFreeLists6] = useState<FreeList[]>([]);
  const [freeLists7, setFreeLists7] = useState<FreeList[]>([]);
  //次の週へ
  const handleClick = () => {
    setValue(dy7.setDate(dy7.getDate() + 7));
  };
  //前の週へ
  const handleClick2 = () => {
    setValue(dy7.setDate(dy7.getDate() - 7));
  };
  //1週間分の処理
  let newDate = new Date();
  let today = new Date(value);
  let dy = new Date(value);
  let dy2 = new Date(value);
  let dy3 = new Date(value);
  let dy4 = new Date(value);
  let dy5 = new Date(value);
  let dy6 = new Date(value);
  let dy7 = new Date(value);

  dy.setDate(dy.getDate() + 1);
  dy2.setDate(dy2.getDate() + 2);
  dy3.setDate(dy3.getDate() + 3);
  dy4.setDate(dy4.getDate() + 4);
  dy5.setDate(dy5.getDate() + 5);
  dy6.setDate(dy6.getDate() + 6);

  const y = today.getFullYear();
  const m = today.getMonth();
  const d = today.getDate();
  let xxx = new Date(y, m, d - 7, 12, 0, 0);
  let yyy = new Date(y, m, d + 7, 12, 0, 0);
  let xx = new Date(y, m, d, 12, 0, 0);

  const y2 = dy.getFullYear();
  const m2 = dy.getMonth();
  const d2 = dy.getDate();
  let xxx2 = new Date(y2, m2, d2 - 7, 12, 0, 0);
  let yyy2 = new Date(y2, m2, d2 + 7, 12, 0, 0);
  let xx2 = new Date(y2, m2, d2, 12, 0, 0);

  const y3 = dy2.getFullYear();
  const m3 = dy2.getMonth();
  const d3 = dy2.getDate();
  let xx3 = new Date(y3, m3, d3, 12, 0, 0);
  let xxx3 = new Date(y3, m3, d3 - 7, 12, 0, 0);
  let yyy3 = new Date(y3, m3, d3 + 7, 12, 0, 0);

  const y4 = dy3.getFullYear();
  const m4 = dy3.getMonth();
  const d4 = dy3.getDate();
  let xx4 = new Date(y4, m4, d4, 12, 0, 0);
  let xxx4 = new Date(y4, m4, d4 - 7, 12, 0, 0);
  let yyy4 = new Date(y4, m4, d4 + 7, 12, 0, 0);

  const y5 = dy4.getFullYear();
  const m5 = dy4.getMonth();
  const d5 = dy4.getDate();
  let xx5 = new Date(y5, m5, d5, 12, 0, 0);
  let xxx5 = new Date(y5, m5, d5 - 7, 12, 0, 0);
  let yyy5 = new Date(y5, m5, d5 + 7, 12, 0, 0);

  const y6 = dy5.getFullYear();
  const m6 = dy5.getMonth();
  const d6 = dy5.getDate();
  let xx6 = new Date(y6, m6, d6, 12, 0, 0);
  let xxx6 = new Date(y6, m6, d6 - 7, 12, 0, 0);
  let yyy6 = new Date(y6, m6, d6 + 7, 12, 0, 0);

  const y7 = dy6.getFullYear();
  const m7 = dy6.getMonth();
  const d7 = dy6.getDate();
  let xx7 = new Date(y7, m7, d7, 12, 0, 0);
  let xxx7 = new Date(y7, m7, d7 - 7, 12, 0, 0);
  let yyy7 = new Date(y7, m7, d7 + 7, 12, 0, 0);
  //曜日を配列に（日曜スタート）
  const day_arr = ["日", "月", "火", "水", "木", "金", "土"];
  //時間を配列に（10:00 ~ 18:00）
  const time_arr = [10, 11, 12, 13, 14, 15, 16, 17, 18];
  //数字を配列に（1~8)
  const num_arr = [1, 2, 3, 4, 5, 6, 7, 8];

  //collection設定
  function getCollections() {
    const db = getFirestore();
    return {
      db,
      userCollection: collection(db, "users"),
    };
  }
  /**========
   * Firebaseからユーザーを取得
   *========*/
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
      const db = getFirestore();
      const { userCollection } = getCollections();
      const userDoc = await getDoc(doc(userCollection, query_.id));
      if (!userDoc.exists()) {
        return;
      }
      const gotUser = userDoc.data() as Users;
      gotUser.id = userDoc.id;
      setU(gotUser);
      setV("成功");
    }
    loadUser();
  }, [process, browser, user, query_.id]);
  /**
   * value
   */
  const loadRsv = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(xx))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists(gotFreeList);
    setV("");
  };
  const loadRsvX = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
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
    setV("");
  };
  const loadRsvY = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(yyy))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists(gotFreeList);
    setV("");
  };
  /**
   * value + 1
   */
  const loadRsv2 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(xx2))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists2(gotFreeList);
  };
  const loadRsv2X = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(xxx2))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists2(gotFreeList);
  };
  const loadRsv2Y = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(yyy2))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists2(gotFreeList);
  };
  /**
   * value + 2
   */
  const loadRsv3 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(xx3))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists3(gotFreeList);
  };
  const loadRsv3X = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(xxx3))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists3(gotFreeList);
  };
  const loadRsv3Y = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(yyy3))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists3(gotFreeList);
  };
  /**
   * value + 3
   */
  const loadRsv4 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(xx4))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists4(gotFreeList);
  };
  const loadRsv4X = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(xxx4))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists4(gotFreeList);
  };
  const loadRsv4Y = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(yyy4))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists4(gotFreeList);
  };
  /**
   * value + 4
   */
  const loadRsv5 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(xx5))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists5(gotFreeList);
  };
  const loadRsv5X = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(xxx5))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists5(gotFreeList);
  };
  const loadRsv5Y = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(yyy5))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists5(gotFreeList);
  };
  /**
   * value + 5
   */
  const loadRsv6 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(xx6))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists6(gotFreeList);
    setV("");
  };
  const loadRsv6X = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(xxx6))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists6(gotFreeList);
    setV("");
  };
  const loadRsv6Y = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(yyy6))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists6(gotFreeList);
    setV("");
  };
  /**
   * value + 6
   */
  const loadRsv7 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(xx7))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists7(gotFreeList);
    setV("");
  };
  const loadRsv7X = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(xxx7))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists7(gotFreeList);
    setV("");
  };
  const loadRsv7Y = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", u.userName),
      where("reserved", "==", false),
      where("date", "==", timestamp(yyy7))
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists7(gotFreeList);
    setV("");
  };

  if (v == "成功") {
    console.log("成功");
    loadRsv();
    loadRsv2();
    loadRsv3();
    loadRsv4();
    loadRsv5();
    loadRsv6();
    loadRsv7();
  }
  return (
    <>
      <React.Fragment>
        <>
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            mx="auto"
            fontSize={15}
          >
            <IconButton
              onClick={async () => {
                setValue(dy7.setDate(dy7.getDate() - 7));
                loadRsvX();
                loadRsv2X();
                loadRsv3X();
                loadRsv4X();
                loadRsv5X();
                loadRsv6X();
                loadRsv7X();
              }}
            >
              <ArrowLeftIcon
                sx={{
                  fontSize: 50,
                  color: teal[500],
                  alignItems: "center",
                }}
              />
            </IconButton>
            <Box mt={3}>
              {`${today.getMonth() + 1}/${today.getDate()} ~ ${
                dy6.getMonth() + 1
              }/${dy6.getDate()}`}
            </Box>
            <IconButton
              onClick={() => {
                setValue(dy7.setDate(dy7.getDate() + 7));
                loadRsvY();
                loadRsv2Y();
                loadRsv3Y();
                loadRsv4Y();
                loadRsv5Y();
                loadRsv6Y();
                loadRsv7Y();
              }}
            >
              <ArrowRightIcon
                sx={{
                  fontSize: 50,
                  color: teal[500],
                  alignItems: "center",
                  my: "auto",
                }}
              />
            </IconButton>
          </Box>
          {/* <Box mb={3} ml={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
              <DatePicker
                label="日付を選択"
                value={value}
                onChange={async (newValue) => {
                  setValue(newValue);
                  setErr(false);
                  const day3 = new Date(newValue);
                  const y3 = day3.getFullYear();
                  const m3 = day3.getMonth();
                  const d3 = day3.getDate();
                  let xxx = new Date(y3, m3, d3, 12, 0, 0);
                  let xxx2 = new Date(y3, m3, d3 + 1);
                  console.log(xxx2);
                  const db = getFirestore();
                  console.log(xxx);
                  console.log(query_);
                  const q = query(
                    collection(db, "FreeSpace"),
                    where("teacher", "==", u.userName),
                    where("reserved", "==", false),
                    where("date", "==", timestamp(xxx)),
                    orderBy("time", "asc")
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
                  return xxx;
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box> */}
          <Table size="small" sx={{ borderCollapse: "collapse" }}>
            <TableHead style={{ backgroundColor: "#FFFFDD", border: "3px" }}>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: 600,
                    width: "10%",
                  }}
                />
                {/* value */}
                <TableCell
                  style={{
                    fontWeight: 600,
                    width: "13%",
                  }}
                >
                  <Box fontSize={12} justifyContent="center" display="flex">
                    {day_arr[today.getDay()]}
                  </Box>
                  <Box fontSize={12} justifyContent="center" display="flex">
                    {today.getDate() == 1 ? (
                      <Box
                        fontSize={12}
                        justifyContent="center"
                        display="flex"
                      >{`${today.getMonth() + 1}/${today.getDate()}`}</Box>
                    ) : (
                      <Box fontSize={12} justifyContent="center" display="flex">
                        {today.getDate()}
                      </Box>
                    )}
                  </Box>
                </TableCell>
                {/* value + 1 */}
                <TableCell style={{ fontWeight: 600, width: "13%" }}>
                  <Box fontSize={12} justifyContent="center" display="flex">
                    {day_arr[dy.getDay()]}
                  </Box>
                  {dy.getDate() == 1 ? (
                    <Box
                      fontSize={12}
                      justifyContent="center"
                      display="flex"
                    >{`${dy.getMonth() + 1}/${dy.getDate()} `}</Box>
                  ) : (
                    <Box fontSize={12} justifyContent="center" display="flex">
                      {dy.getDate()}
                    </Box>
                  )}
                </TableCell>
                {/* value + 2 */}
                <TableCell style={{ fontWeight: 600, width: "13%" }}>
                  <Box fontSize={12} justifyContent="center" display="flex">
                    {day_arr[dy2.getDay()]}
                  </Box>
                  {dy2.getDate() == 1 ? (
                    <Box
                      fontSize={12}
                      justifyContent="center"
                      display="flex"
                    >{`${dy2.getMonth() + 1}/${dy2.getDate()}`}</Box>
                  ) : (
                    <Box fontSize={12} justifyContent="center" display="flex">
                      {dy2.getDate()}
                    </Box>
                  )}
                </TableCell>
                {/* value + 3 */}
                <TableCell style={{ fontWeight: 600, width: "13%" }}>
                  <Box fontSize={12} justifyContent="center" display="flex">
                    {day_arr[dy3.getDay()]}
                  </Box>
                  {dy3.getDate() == 1 ? (
                    <Box fontSize={12} justifyContent="center" display="flex">
                      {`${dy3.getMonth() + 1}/${dy3.getDate()} `}
                    </Box>
                  ) : (
                    <Box fontSize={12} justifyContent="center" display="flex">
                      {dy3.getDate()}
                    </Box>
                  )}
                </TableCell>
                {/* value + 4 */}
                <TableCell style={{ fontWeight: 600, width: "13%" }}>
                  <Box fontSize={12} justifyContent="center" display="flex">
                    {day_arr[dy4.getDay()]}
                  </Box>
                  {dy4.getDate() == 1 ? (
                    <Box fontSize={12} justifyContent="center" display="flex">
                      {`${dy4.getMonth() + 1}/${dy4.getDate()} `}
                    </Box>
                  ) : (
                    <Box fontSize={12} justifyContent="center" display="flex">
                      {dy4.getDate()}
                    </Box>
                  )}
                </TableCell>
                {/* value + 5 */}
                <TableCell style={{ fontWeight: 600, width: "13%" }}>
                  <Box fontSize={12} justifyContent="center" display="flex">
                    {day_arr[dy5.getDay()]}
                  </Box>
                  {dy5.getDate() == 1 ? (
                    <Box fontSize={12} justifyContent="center" display="flex">
                      {`${dy5.getMonth() + 1}/${dy5.getDate()} `}
                    </Box>
                  ) : (
                    <Box fontSize={12} justifyContent="center" display="flex">
                      {dy5.getDate()}
                    </Box>
                  )}
                </TableCell>
                {/* value + 6 */}
                <TableCell style={{ fontWeight: 600, width: "13%" }}>
                  <Box fontSize={12} justifyContent="center" display="flex">
                    {day_arr[dy6.getDay()]}
                  </Box>
                  {dy6.getDate() == 1 ? (
                    <Box fontSize={12} justifyContent="center" display="flex">
                      {`${dy6.getMonth() + 1}/${dy6.getDate()} `}
                    </Box>
                  ) : (
                    <Box fontSize={12} justifyContent="center" display="flex">
                      {dy6.getDate()}
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {time_arr.map((t) => (
                <TableRow key={time_arr.length}>
                  <TableCell
                    sx={{
                      borderStyle: "dashed solid",
                      borderWidth: "1px",
                      borderColor: grey[300],
                    }}
                  >
                    <Box fontSize={10} sx={{ height: 80, width: "10%" }}>
                      <Box>{`${t}:00`}</Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderStyle: "dashed solid",
                      borderWidth: "1px",
                      borderColor: grey[300],
                    }}
                  >
                    {freeLists.map(
                      (i) =>
                        i.time == t && (
                          <Box
                            display="flex"
                            justifyContent="center"
                            bgcolor={blue[400]}
                            borderRadius={2}
                          >
                            <Tooltip
                              title={
                                <>
                                  <Box>{`講師名 : ${u.userName}`}</Box>{" "}
                                  <Box>{`日付 : ${dayjs(i.date.toDate()).format(
                                    "YYYY/MM/DD "
                                  )}`}</Box>
                                  <Box>{`時間 : ${i.time}:30 ~ ${
                                    i.time + 1
                                  }:30`}</Box>
                                </>
                              }
                              arrow
                            >
                              <IconButton>
                                <RadioButtonUncheckedIcon
                                  sx={{
                                    color: "white",
                                    fontSize: 50,
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        )
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderStyle: "dashed solid",
                      borderWidth: "1px",
                      borderColor: grey[300],
                    }}
                  >
                    {freeLists2.map(
                      (i) =>
                        i.time == t && (
                          <Box
                            display="flex"
                            justifyContent="center"
                            bgcolor={blue[400]}
                          >
                            <Tooltip
                              title={
                                <>
                                  <Box>{`講師名 : ${u.userName}`}</Box>{" "}
                                  <Box>{`日付 : ${dayjs(i.date.toDate()).format(
                                    "YYYY/MM/DD "
                                  )}`}</Box>
                                  <Box>{`時間 : ${i.time}:30 ~ ${
                                    i.time + 1
                                  }:30`}</Box>
                                </>
                              }
                              arrow
                            >
                              <IconButton>
                                <RadioButtonUncheckedIcon
                                  sx={{
                                    color: "white",
                                    fontSize: 50,
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        )
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderStyle: "dashed solid",
                      borderWidth: "1px",
                      borderColor: grey[300],
                    }}
                  >
                    {freeLists3.map(
                      (i) =>
                        i.time == t && (
                          <Box display="flex" justifyContent="center">
                            <Tooltip
                              title={
                                <>
                                  <Box>{`講師名 : ${u.userName}`}</Box>{" "}
                                  <Box>{`日付 : ${dayjs(i.date.toDate()).format(
                                    "YYYY/MM/DD "
                                  )}`}</Box>
                                  <Box>{`時間 : ${i.time}:30 ~ ${
                                    i.time + 1
                                  }:30`}</Box>
                                </>
                              }
                              arrow
                            >
                              <IconButton>
                                <AddBoxIcon
                                  sx={{
                                    color: teal[400],
                                    fontSize: 50,
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        )
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderStyle: "dashed solid",
                      borderWidth: "1px",
                      borderColor: grey[300],
                    }}
                  >
                    {freeLists4.map(
                      (i) =>
                        i.time == t && (
                          <Box display="flex" justifyContent="center">
                            <Tooltip
                              title={
                                <>
                                  <Box>{`講師名 : ${u.userName}`}</Box>{" "}
                                  <Box>{`日付 : ${dayjs(i.date.toDate()).format(
                                    "YYYY/MM/DD "
                                  )}`}</Box>
                                  <Box>{`時間 : ${i.time}:30 ~ ${
                                    i.time + 1
                                  }:30`}</Box>
                                </>
                              }
                              arrow
                            >
                              <IconButton>
                                <AddBoxIcon
                                  sx={{
                                    color: teal[400],
                                    fontSize: 50,
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        )
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderStyle: "dashed solid",
                      borderWidth: "1px",
                      borderColor: grey[300],
                    }}
                  >
                    {freeLists5.map(
                      (i) =>
                        i.time == t && (
                          <Box display="flex" justifyContent="center">
                            <Tooltip
                              title={
                                <>
                                  <Box>{`講師名 : ${u.userName}`}</Box>{" "}
                                  <Box>{`日付 : ${dayjs(i.date.toDate()).format(
                                    "YYYY/MM/DD "
                                  )}`}</Box>
                                  <Box>{`時間 : ${i.time}:30 ~ ${
                                    i.time + 1
                                  }:30`}</Box>
                                </>
                              }
                              arrow
                            >
                              <IconButton>
                                <AddBoxIcon
                                  sx={{
                                    color: teal[400],
                                    fontSize: 50,
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        )
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderStyle: "dashed solid",
                      borderWidth: "1px",
                      borderColor: grey[300],
                    }}
                  >
                    {freeLists6.map(
                      (i) =>
                        i.time == t && (
                          <Box display="flex" justifyContent="center">
                            <Tooltip
                              title={
                                <>
                                  <Box>{`講師名 : ${u.userName}`}</Box>{" "}
                                  <Box>{`日付 : ${dayjs(i.date.toDate()).format(
                                    "YYYY/MM/DD "
                                  )}`}</Box>
                                  <Box>{`時間 : ${i.time}:30 ~ ${
                                    i.time + 1
                                  }:30`}</Box>
                                </>
                              }
                              arrow
                            >
                              <IconButton>
                                <AddBoxIcon
                                  sx={{
                                    color: teal[400],
                                    fontSize: 50,
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        )
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderStyle: "dashed solid",
                      borderWidth: "1px",
                      borderColor: grey[300],
                    }}
                  >
                    {freeLists7.map(
                      (i) =>
                        i.time == t && (
                          <Box display="flex" justifyContent="center">
                            <Tooltip
                              title={
                                <>
                                  <Box>{`講師名 : ${u.userName}`}</Box>{" "}
                                  <Box>{`日付 : ${dayjs(i.date.toDate()).format(
                                    "YYYY/MM/DD "
                                  )}`}</Box>
                                  <Box>{`時間 : ${i.time}:30 ~ ${
                                    i.time + 1
                                  }:30`}</Box>
                                </>
                              }
                              arrow
                            >
                              <IconButton>
                                <AddBoxIcon
                                  sx={{
                                    color: teal[400],
                                    fontSize: 50,
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        )
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      </React.Fragment>
    </>
  );
}
