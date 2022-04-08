import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  Timestamp,
  addDoc,
  serverTimestamp,
  limit,
  orderBy,
  startAt,
  endAt,
  updateDoc,
  doc,
} from "firebase/firestore";
import dayjs from "dayjs";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import RectangleIcon from "@mui/icons-material/Rectangle";
import DatePicker from "@mui/lab/DatePicker";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { createMedia } from "@artsy/fresnel";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { useRouter } from "next/router";
import { browser } from "process";
import { blue, grey, teal } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import { ja } from "date-fns/locale";
//内部インポート
import Title from "../../atoms/Title";
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import { Users } from "../../../models/Users";
import { useSchedule } from "../../../hooks/teacher/reserves/useReserves";

//メディアクエリ設定
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 750,
    lg: 990,
    xl: 1200,
  },
});
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
//Modalのスタイル
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function SelectDayAll() {
  const { user } = useAuth();
  const {
    rsv,
    rsv10,
    rsv11,
    rsv12,
    rsv13,
    rsv14,
    rsv15,
    rsv16,
    rsv17,
    rsv18,
    errorNo10,
    errorNo11,
    errorNo12,
    errorNo13,
    errorNo14,
    errorNo15,
    errorNo16,
    errorNo17,
    errorNo18,
    loadSchedule_today10,
    loadSchedule_today11,
    loadSchedule_today12,
    loadSchedule_today13,
    loadSchedule_today14,
    loadSchedule_today15,
    loadSchedule_today16,
    loadSchedule_today17,
    loadSchedule_today18,
  } = useSchedule();
  const router = useRouter();
  const db = getFirestore();
  const [users, setUsers] = useState<Users[]>([]);
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
  const [err2, setErr2] = useState(false); //既に予約がある時のエラー
  const [open, setOpen] = useState(false); //シフト登録モーダル用
  const [open2, setOpen2] = useState(false); //予約確認モーダル用
  const [open3, setOpen3] = useState<boolean>(false); //生徒検索モーダル用
  const [open4, setOpen4] = useState<boolean>(false); //予約詳細確認
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);
  const [rsvDate, setRsvDate] = useState("");
  const [student, setStudent] = useState("");
  const [student2, setStudent2] = useState("");
  const [teacher, setTeacher] = useState("");
  const [rsvNum, setRsvNum] = useState("");
  const [rsvTime, setRsvTime] = useState<number>();
  const [userNum, setUserNum] = useState("");
  const [age, setAge] = React.useState<number | string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  //入力された日付を yyyy/mm/dd 12:00 に変換
  const day = new Date(value);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  //今日の日付を　yyyy/mm/dd 12:00　に変換
  const day2 = new Date();
  const y2 = day2.getFullYear();
  const m2 = day2.getMonth();
  const d2 = day2.getDate();
  let xxx2 = new Date(y2, m2, d2, 12, 0, 0);
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
      const u = user;
      setTest(u.displayName);
      console.log(rsv);
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
    /**===============
     * Firebaseからユーザーを取り出す
     *===============*/
    async function loadUsers() {
      const db = getFirestore();
      const q = query(
        collection(db, "users"),
        where("role", "==", "student"),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const gotUser = snapshot.docs.map((doc) => {
        const user = doc.data() as Users;
        user.id = doc.id;
        return user;
      });
      setUsers(gotUser);
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
    loadUsers();
  }, [process, browser, user]);
  const loadRsv = async () => {
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
  };
  //10時
  const loadRsv10 = async () => {
    setE10(false);
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
  };
  //11時
  const loadRsv11 = async () => {
    setE11(false);
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
  };
  //12時
  const loadRsv12 = async () => {
    setE12(false);
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
  };
  //13時
  const loadRsv13 = async () => {
    setE13(false);
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
  };
  //14時
  const loadRsv14 = async () => {
    setE14(false);
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
  };
  //15時
  const loadRsv15 = async () => {
    setE15(false);
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
  };
  //16時
  const loadRsv16 = async () => {
    setE16(false);
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
  };
  //17時
  const loadRsv17 = async () => {
    setE17(false);
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
  };
  //18時
  const loadRsv18 = async () => {
    setE18(false);
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
  };
  /**===========
   * シフトを提出
   *===========*/
  const createShift = async (e: any) => {
    setErr(false);
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", test),
      where("time", "==", age),
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
        time: age,
        createAt: serverTimestamp(),
        senderUid: user.uid,
      }).then(() => {
        setOpen(false);
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
      });
    } else {
      setErr(true);
      return;
    }
  };
  /**=========
   * 予約登録
   *========*/
  const getRsv = async (e: any) => {
    e.preventDefault();
    const q = query(
      collection(db, "FreeSpace"),
      where("date", "==", timestamp(xxx)),
      where("time", "==", rsvTime),
      where("student", "==", student)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      await updateDoc(doc(db, "FreeSpace", rsvNum), {
        student: student,
        reserved: true,
        reserverUid: userNum,
        reserveAt: serverTimestamp(),
      }).then(() => {
        handleClose2();
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
        toast.success("予約を登録しました", {
          position: "bottom-left",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    } else {
      setErr2(true);
      return;
    }
  };
  /**=======
   * キャンセル処理
   *======*/
  const deleteRsv = async (e: any) => {
    e.stopPropagation();
    await updateDoc(doc(db, "FreeSpace", rsvNum), {
      reserved: false,
      student: "",
      reserverUid: "",
    }).then(async () => {
      handleClose4();
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
      toast.success("キャンセルしました", {
        position: "bottom-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };
  return (
    <>
      <React.Fragment>
        <MediaContextProvider>
          <Box>
            <Title>予約スケジュール</Title>
          </Box>
          <Box
            ml={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Box mr={5} mt={1}>
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
                <DatePicker
                  label="日付を選択"
                  value={value}
                  onChange={async (newValue) => {
                    //onChangeに直接記述しないとうまく動作しない（setValue と　value に1回分のずれが生じる）
                    setValue(newValue);
                    const day3 = new Date(newValue);
                    const y3 = day3.getFullYear();
                    const m3 = day3.getMonth();
                    const d3 = day3.getDate();
                    let xxx = new Date(y3, m3, d3, 12, 0, 0);
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
                <TableCell style={{ fontWeight: 600 }}>10:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>11:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>12:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>13:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>14:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>15:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>16:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>17:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>18:00</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={freeLists.length}>
                {/* シフトがない場合はエラーを返している　→ エラーだったらシフトを申請できる */}
                {errorNo10 && errorNo10 == true && (
                  <Tooltip title="シフトを申請" arrow>
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
                        setAge(10);
                      }}
                    />
                  </Tooltip>
                )}
                {/* 予約済み or 未予約　を判定させて、返り値を変動させる */}
                {rsv10 &&
                  rsv10.map((value) =>
                    value.student !== "" ? (
                      <Tooltip
                        title={
                          <>
                            <Box>{`講師名:${value.teacher}`}</Box>
                            <Box>{`生徒名:${value.student}`}</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: teal[300],
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                            setTeacher(value.teacher);
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title={
                          <>
                            <Box>クリックして予約</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
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
                          onClick={() => {
                            handleOpen3();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        ></TableCell>
                      </Tooltip>
                    )
                  )}
                {e11 == true && (
                  <Tooltip title="シフトを申請" arrow>
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
                        setAge(11);
                      }}
                    />
                  </Tooltip>
                )}
                {freeLists11.map((value) =>
                  value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => {
                          handleOpen4();
                          setRsvNum(value.id);
                          setRsvDate(
                            `${dayjs(value.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${value.time}:00~`
                          );
                          setStudent2(value.student);
                          setTeacher(value.teacher);
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
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
                        onClick={() => {
                          handleOpen3();
                          setRsvNum(value.id);
                          setRsvTime(value.time);
                          setRsvDate(
                            `${dayjs(value.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${value.time}:00~`
                          );
                        }}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
                {e12 == true && (
                  <Tooltip title="シフトを申請" arrow>
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
                        setAge(12);
                      }}
                    />
                  </Tooltip>
                )}
                {rsv12 &&
                  rsv12.map((value) =>
                    value.student !== "" ? (
                      <Tooltip
                        title={
                          <>
                            <Box>{`講師名:${value.teacher}`}</Box>
                            <Box>{`生徒名:${value.student}`}</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: teal[300],
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                            setTeacher(value.teacher);
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title={
                          <>
                            <Box>クリックして予約</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
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
                          onClick={() => {
                            handleOpen3();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        ></TableCell>
                      </Tooltip>
                    )
                  )}
                {e13 == true && (
                  <Tooltip title="シフトを申請" arrow>
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
                        setAge(13);
                      }}
                    />
                  </Tooltip>
                )}
                {freeLists13.map((value) =>
                  value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => {
                          handleOpen4();
                          setRsvNum(value.id);
                          setRsvDate(
                            `${dayjs(value.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${value.time}:00~`
                          );
                          setStudent2(value.student);
                          setTeacher(value.teacher);
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
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
                        onClick={() => {
                          handleOpen3();
                          setRsvNum(value.id);
                          setRsvTime(value.time);
                          setRsvDate(
                            `${dayjs(value.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${value.time}:00~`
                          );
                        }}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
                {e14 == true && (
                  <Tooltip title="シフトを申請" arrow>
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
                        setAge(14);
                      }}
                    />
                  </Tooltip>
                )}
                {freeLists14.map((value) =>
                  value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => {
                          handleOpen4();
                          setRsvNum(value.id);
                          setRsvDate(
                            `${dayjs(value.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${value.time}:00~`
                          );
                          setStudent2(value.student);
                          setTeacher(value.teacher);
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
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
                        onClick={() => {
                          handleOpen3();
                          setRsvNum(value.id);
                          setRsvTime(value.time);
                          setRsvDate(
                            `${dayjs(value.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${value.time}:00~`
                          );
                        }}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
                {e15 == true && (
                  <Tooltip title="シフトを申請" arrow>
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
                        setAge(15);
                      }}
                    />
                  </Tooltip>
                )}
                {freeLists15.map((value) =>
                  value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => {
                          handleOpen4();
                          setRsvNum(value.id);
                          setRsvDate(
                            `${dayjs(value.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${value.time}:00~`
                          );
                          setStudent2(value.student);
                          setTeacher(value.teacher);
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
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
                        onClick={() => {
                          handleOpen3();
                          setRsvNum(value.id);
                          setRsvTime(value.time);
                          setRsvDate(
                            `${dayjs(value.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${value.time}:00~`
                          );
                        }}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
                {e16 == true && (
                  <Tooltip title="シフトを申請" arrow>
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
                        setAge(16);
                      }}
                    />
                  </Tooltip>
                )}
                {freeLists16.map((value) =>
                  value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => {
                          handleOpen4();
                          setRsvNum(value.id);
                          setRsvDate(
                            `${dayjs(value.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${value.time}:00~`
                          );
                          setStudent2(value.student);
                          setTeacher(value.teacher);
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
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
                        onClick={() => {
                          handleOpen3();
                          setRsvNum(value.id);
                          setRsvTime(value.time);
                          setRsvDate(
                            `${dayjs(value.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${value.time}:00~`
                          );
                        }}
                      ></TableCell>
                    </Tooltip>
                  )
                )}

                {e17 == true && (
                  <Tooltip title="シフトを申請" arrow>
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
                        setAge(17);
                      }}
                    />
                  </Tooltip>
                )}
                {freeLists17.map((value) =>
                  value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => {
                          handleOpen4();
                          setRsvNum(value.id);
                          setRsvDate(
                            `${dayjs(value.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${value.time}:00~`
                          );
                          setStudent2(value.student);
                          setTeacher(value.teacher);
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
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
                        onClick={() => {
                          handleOpen3();
                          setRsvNum(value.id);
                          setRsvTime(value.time);
                          setRsvDate(
                            `${dayjs(value.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${value.time}:00~`
                          );
                        }}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
                {e18 == true && (
                  <Tooltip title="シフトを申請" arrow>
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
                        setAge(18);
                      }}
                    />
                  </Tooltip>
                )}
                {freeLists18.map((value) =>
                  value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[300],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 50,
                        }}
                        onClick={() => {
                          handleOpen4();
                          setRsvNum(value.id);
                          setRsvDate(
                            `${dayjs(value.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${value.time}:00~`
                          );
                          setStudent2(value.student);
                          setTeacher(value.teacher);
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
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
                        onClick={() => {
                          handleOpen3();
                          setRsvNum(value.id);
                          setRsvTime(value.time);
                          setRsvDate(
                            `${dayjs(value.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${value.time}:00~`
                          );
                        }}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
              </TableRow>
            </TableBody>
          </Table>
          {/* モーダルの作成 シフト登録確認画面　*/}
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack spacing={2} sx={{ width: "100%", my: 3, mx: "auto" }}>
                <SnackbarContent
                  sx={{
                    bgcolor: blue[400],
                    justifyContent: "center",
                    boxShadow: "none",
                    fontWeight: 600,
                  }}
                  message={"シフト登録確認"}
                />
              </Stack>
              <Box textAlign="center">
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    color={blue[500]}
                    textAlign="center"
                    mx="auto"
                    fontSize={17}
                    fontWeight={400}
                    mb={3}
                  >
                    以下の内容でシフトを登録します
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                  <Typography
                    sx={{ fontSize: 20, mr: 1 }}
                    color="black"
                    gutterBottom
                  >
                    講師名 :
                  </Typography>
                  <Typography
                    sx={{ fontSize: 20 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {test}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                  <Typography
                    sx={{ fontSize: 20, my: "auto", mr: 1 }}
                    color="black"
                    gutterBottom
                  >
                    開始時間 :
                  </Typography>
                  <FormControl sx={{ mt: 1, minWidth: 80 }}>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={age}
                      onChange={handleChange}
                      autoWidth
                      label="時間"
                    >
                      <MenuItem value={10}>10:00</MenuItem>
                      <MenuItem value={11}>11:00</MenuItem>
                      <MenuItem value={12}>12:00</MenuItem>
                      <MenuItem value={13}>13:00</MenuItem>
                      <MenuItem value={14}>14:00</MenuItem>
                      <MenuItem value={15}>15:00</MenuItem>
                      <MenuItem value={16}>16:00</MenuItem>
                      <MenuItem value={17}>17:00</MenuItem>
                      <MenuItem value={18}>18:00</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="right" mt={5}>
                  <Button
                    type="submit"
                    onClick={createShift}
                    variant="contained"
                    sx={{
                      mb: 2,
                      mr: 1,
                      bgcolor: teal[400],
                      color: "white",
                      "&:hover": { bgcolor: teal[500] },
                    }}
                  >
                    登録
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      mb: 2,
                      mr: 1,
                      bgcolor: grey[500],
                      color: "white",
                      "&:hover": { bgcolor: grey[600] },
                    }}
                    onClick={() => setOpen(false)}
                  >
                    キャンセル
                  </Button>
                </Box>
              </Box>
              {err == true && (
                <Box textAlign="center">
                  <Grid xs={12} sm={15}>
                    <Alert variant="filled" severity="info" sx={{ m: 3 }}>
                      シフトは既に提出済みです
                    </Alert>
                  </Grid>
                </Box>
              )}
            </Box>
          </Modal>
          {/* 予約登録確認　モーダル作成 */}
          <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack spacing={2} sx={{ width: "100%", my: 3, mx: "auto" }}>
                <SnackbarContent
                  sx={{
                    bgcolor: blue[400],
                    justifyContent: "center",
                    boxShadow: "none",
                    fontWeight: 600,
                  }}
                  message={"予約登録確認"}
                />
              </Stack>
              <Box display="flex">
                <Typography
                  variant="h5"
                  component="div"
                  color="black"
                  textAlign="center"
                  mx="auto"
                  fontSize={17}
                  fontWeight={400}
                  mb={3}
                >
                  以下の内容で予約登録します
                </Typography>
              </Box>
              <Item sx={{ my: 2 }}>
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    color="black"
                    textAlign="center"
                    mx="auto"
                    fontSize={19}
                    width={90}
                    fontWeight={500}
                  >
                    予約情報
                  </Typography>
                </Box>
              </Item>
              <Item2 sx={{ my: 2 }}>
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color="black"
                    textAlign="left"
                    fontSize={17}
                    width={90}
                    fontWeight={400}
                  >
                    予約日時
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    ml={5}
                    color={grey[600]}
                    textAlign="left"
                    fontSize={17}
                  >
                    {rsvDate}
                  </Typography>
                </Box>
              </Item2>
              <Item sx={{ my: 2 }}>
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color="black"
                    textAlign="left"
                    fontSize={17}
                    width={90}
                    fontWeight={400}
                  >
                    担当者
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    ml={5}
                    color={grey[600]}
                    textAlign="left"
                    fontSize={17}
                  >
                    {user && user.displayName}
                  </Typography>
                </Box>
              </Item>
              <Item2 sx={{ my: 2 }}>
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color="black"
                    textAlign="left"
                    fontSize={17}
                    width={90}
                    fontWeight={400}
                  >
                    お客様名
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    ml={5}
                    color={grey[600]}
                    textAlign="left"
                    fontSize={17}
                  >
                    {student}
                  </Typography>
                </Box>
              </Item2>
              <Item sx={{ my: 2 }}>
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color="black"
                    textAlign="left"
                    fontSize={17}
                    width={90}
                    fontWeight={400}
                  >
                    予約状態
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    ml={5}
                    color={grey[600]}
                    textAlign="left"
                    fontSize={17}
                  >
                    確定
                  </Typography>
                </Box>
              </Item>
              <Box display="flex" justifyContent="right">
                <Button
                  variant="contained"
                  sx={{
                    mt: 1,
                    mb: 2,
                    mr: 1,
                    bgcolor: teal[400],
                    color: "white",
                    "&:hover": { bgcolor: teal[500] },
                  }}
                  onClick={(e) => getRsv(e)}
                >
                  予約登録
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    mt: 1,
                    mb: 2,
                    mr: 1,
                    bgcolor: grey[500],
                    color: "white",
                    "&:hover": { bgcolor: grey[600] },
                  }}
                  onClick={() => setOpen2(false)}
                >
                  キャンセル
                </Button>
              </Box>
              {err2 == true && (
                <Grid xs={12} sm={15}>
                  <Alert
                    variant="filled"
                    severity="error"
                    sx={{ m: 3, textAlign: "center" }}
                  >
                    同時間帯で既に予約済みです
                  </Alert>
                </Grid>
              )}
            </Box>
          </Modal>
          {/* 生徒検索 */}
          <Modal
            open={open3}
            onClose={handleClose3}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack spacing={2} sx={{ width: "100%", my: 3, mx: "auto" }}>
                <SnackbarContent
                  sx={{
                    bgcolor: blue[400],
                    justifyContent: "center",
                    boxShadow: "none",
                    fontWeight: 600,
                  }}
                  message={"予約登録確認"}
                />
              </Stack>
              <Box display="flex">
                <Typography
                  variant="h5"
                  component="div"
                  color="black"
                  textAlign="center"
                  mx="auto"
                  fontSize={17}
                  fontWeight={400}
                  mb={3}
                >
                  予約者を選択してください
                </Typography>
              </Box>
              <Box display="flex">
                <TextField
                  margin="normal"
                  id="studentName"
                  sx={{ mb: 3 }}
                  label="生徒名を入力"
                  fullWidth
                  autoComplete="studentName"
                  onChange={(e) => setStudent(e.target.value)}
                />
                <IconButton
                  onClick={async () => {
                    setErr2(false);
                    const q = query(
                      collection(db, "users"),
                      where("role", "==", "student"),
                      orderBy("userName"),
                      startAt(student),
                      endAt(student + "\uf8ff")
                    );
                    const snapshot = await getDocs(q);
                    const gotUser = snapshot.docs.map((doc) => {
                      const user = doc.data() as Users;
                      user.id = doc.id;
                      return user;
                    });
                    setUsers(gotUser);
                  }}
                >
                  <SearchIcon fontSize="large" />
                </IconButton>
              </Box>
              <Table size="small" sx={{ margin: "auto" }}>
                <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                  <TableRow>
                    <TableCell
                      width="50%"
                      sx={{ textAlign: "center", fontSize: 13 }}
                    >
                      生徒名
                    </TableCell>
                    <TableCell
                      width="20%"
                      sx={{ textAlign: "center", fontSize: 13 }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell
                        width="50%"
                        sx={{ textAlign: "center", fontSize: 12 }}
                      >
                        {user.userName}
                      </TableCell>
                      <TableCell
                        width="50%"
                        sx={{ textAlign: "center", fontSize: 12 }}
                      >
                        <Button
                          variant="contained"
                          sx={{ bgcolor: teal[500], fontSize: 12 }}
                          onClick={async () => {
                            setErr2(false);
                            setStudent(user.userName);
                            setUserNum(user.id);
                            handleClose3();
                            handleOpen2();
                          }}
                        >
                          選択
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Modal>
          {/* モーダル　予約内容詳細 */}
          <Modal
            open={open4}
            onClose={handleClose4}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack spacing={2} sx={{ width: "100%", my: 3, mx: "auto" }}>
                <SnackbarContent
                  sx={{
                    bgcolor: blue[400],
                    justifyContent: "center",
                    boxShadow: "none",
                    fontWeight: 600,
                  }}
                  message={"予約詳細"}
                />
              </Stack>
              <Item sx={{ my: 2 }}>
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    color="black"
                    textAlign="center"
                    mx="auto"
                    fontSize={19}
                    width={90}
                    fontWeight={500}
                  >
                    予約情報
                  </Typography>
                </Box>
              </Item>
              <Item2 sx={{ my: 2 }}>
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color="black"
                    textAlign="left"
                    fontSize={17}
                    width={90}
                    fontWeight={400}
                  >
                    予約日時
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    ml={5}
                    color={grey[600]}
                    textAlign="left"
                    fontSize={17}
                  >
                    {rsvDate}
                  </Typography>
                </Box>
              </Item2>
              <Item sx={{ my: 2 }}>
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color="black"
                    textAlign="left"
                    fontSize={17}
                    width={90}
                    fontWeight={400}
                  >
                    担当者
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    ml={5}
                    color={grey[600]}
                    textAlign="left"
                    fontSize={17}
                  >
                    {teacher}
                  </Typography>
                </Box>
              </Item>
              <Item2 sx={{ my: 2 }}>
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color="black"
                    textAlign="left"
                    fontSize={17}
                    width={90}
                    fontWeight={400}
                  >
                    お客様名
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    ml={5}
                    color={grey[600]}
                    textAlign="left"
                    fontSize={17}
                  >
                    {student2}
                  </Typography>
                </Box>
              </Item2>
              <Item sx={{ my: 2 }}>
                <Box display="flex">
                  <Typography
                    variant="h5"
                    component="div"
                    ml={1}
                    color="black"
                    textAlign="left"
                    fontSize={17}
                    width={90}
                    fontWeight={400}
                  >
                    予約状態
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    ml={5}
                    color={grey[600]}
                    textAlign="left"
                    fontSize={17}
                  >
                    確定
                  </Typography>
                </Box>
              </Item>
              <Box display="flex" justifyContent="right">
                <Button
                  variant="contained"
                  sx={{
                    mt: 1,
                    mb: 2,
                    mr: 1,
                    bgcolor: teal[400],
                    color: "white",
                    "&:hover": { bgcolor: teal[500] },
                  }}
                  onClick={(e) => deleteRsv(e)}
                >
                  予約キャンセル
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    mt: 1,
                    mb: 2,
                    mr: 1,
                    bgcolor: grey[500],
                    color: "white",
                    "&:hover": { bgcolor: grey[600] },
                  }}
                  onClick={() => {
                    handleClose4();
                  }}
                >
                  閉じる
                </Button>
              </Box>
            </Box>
          </Modal>
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
