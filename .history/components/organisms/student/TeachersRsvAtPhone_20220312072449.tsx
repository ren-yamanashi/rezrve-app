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
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment, { now } from "moment";
import Table from "@mui/material/Table";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { browser } from "process";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { TextField } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Typography from "@mui/material/Typography";
import { blue, grey, red, teal } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
//メディアクエリ設定
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

export default function TeachersRsv() {
  const router = useRouter();
  const query_ = router.query as Query;
  const { user } = useAuth();
  const [err, setErr] = useState<boolean>(false);
  const [test, setTest] = useState("");
  const [i, setI] = useState("");
  const [u, setU] = useState<Users>();
  const [value, setValue] = useState<Date | number>(new Date());
  const [v, setV] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    loadRsv();
    loadRsv2();
    loadRsv3();
    loadRsv4();
    loadRsv5();
    loadRsv6();
    loadRsv7();
  }

  /**=========
   * 予約登録
   *========*/
  const getRsv = async (e: any) => {
    const db = getFirestore();
    e.preventDefault();
    await updateDoc(doc(db, "FreeSpace", i), {
      student: user.displayName,
      reserved: true,
      reserverUid: user.uid,
      reserveAt: serverTimestamp(),
    }).then(() => {
      handleClose();
      toast.success("予約を登録しました", {
        position: "bottom-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(function () {
        router.reload();
      }, 2 * 1000);
    });
  };
  return (
    <>
      <React.Fragment>
        <MediaContextProvider>
          <>
            <Media at="sm">
              <Box mt={2} display="flex" justifyContent="center" mx="auto">
                <CardContent
                  style={{
                    width: 300,
                    height: 100,
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "#4689FF",
                  }}
                >
                  <Box display="flex" justifyContent="center" mx="auto">
                    <Typography
                      fontSize={15}
                      mt={2}
                      component="div"
                      color={blue[600]}
                      textAlign="left"
                      fontWeight={600}
                    >
                      指名スタッフ
                    </Typography>
                    <Typography
                      ml={2}
                      mt={2}
                      fontSize={15}
                      component="div"
                      color="black"
                      textAlign="left"
                    >
                      {u && u.userName}
                    </Typography>
                    <Box
                      component="img"
                      ml={2}
                      sx={{ height: 50, width: 50, borderRadius: "50%" }}
                      alt={u && u.userName}
                      src={u && u.url}
                    />
                  </Box>
                  <Box display="flex" justifyContent="right">
                    <IconButton onClick={() => router.back()}>
                      <KeyboardReturnIcon
                        sx={{ color: blue[500], fontSize: 20 }}
                      />
                    </IconButton>
                    <Button onClick={() => router.back()}>
                      <Typography
                        fontSize={12}
                        component="div"
                        color={blue[600]}
                      >
                        条件を変更する
                      </Typography>
                    </Button>
                  </Box>
                </CardContent>
              </Box>
              <Stack spacing={2} sx={{ width: 400, mx: "auto" }}>
                <SnackbarContent
                  sx={{
                    bgcolor: blue[400],
                    justifyContent: "center",
                    boxShadow: "none",
                    fontWeight: 600,
                  }}
                  message={"ご希望の時間帯をお選びください"}
                />
              </Stack>
              <Box maxWidth={300} display="flex" mx="auto">
                <Box justifyContent="left">
                  <Box mt={3} display="flex">
                    <Box ml={3} display="flex">
                      <Button
                        sx={{
                          bgcolor: blue[400],
                          height: "15px",
                          mr: 1,
                          "&:hover": { bgcolor: blue[300] },
                        }}
                      />
                      <Typography fontSize={12} component="div">
                        予約可
                      </Typography>
                    </Box>
                    <Box ml={3} display="flex">
                      <Button
                        sx={{
                          bgcolor: grey[300],
                          height: "15px",
                          mr: 1,
                          "&:hover": { bgcolor: grey[200] },
                        }}
                      />
                      <Typography fontSize={12} component="div">
                        予約不可
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
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
                      fontSize: 40,
                      color: blue[500],
                    }}
                  />
                  <Typography fontSize={12} component="div" color={blue[600]}>
                    前の週
                  </Typography>
                </IconButton>
                <Box fontSize={15} fontWeight={600} mt={2.5} mx={3}>
                  {`${today.getFullYear()}/${today.getMonth() + 1}`}
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
                  <Typography fontSize={12} component="div" color={blue[600]}>
                    次の週
                  </Typography>
                  <ArrowRightIcon
                    sx={{
                      fontSize: 50,
                      color: blue[500],
                      alignItems: "center",
                    }}
                  />
                </IconButton>
              </Box>
              <Table
                size="small"
                sx={{
                  borderCollapse: "collapse",
                  mb: 5,
                  width: 300,
                  mx: "auto",
                }}
              >
                <TableHead
                  style={{ backgroundColor: "#FFFFDD", border: "3px" }}
                >
                  <TableRow>
                    <TableCell
                      style={{
                        width: "8%",
                        borderStyle: "solid none",
                        borderWidth: "1px",
                        borderColor: grey[400],
                      }}
                    />
                    {/* value */}
                    <TableCell
                      style={{
                        fontWeight: 400,
                        width: "13%",
                        borderStyle: "solid none",
                        borderWidth: "1px",
                        borderColor: grey[400],
                      }}
                    >
                      <Box
                        fontSize={12}
                        justifyContent="center"
                        display="flex"
                        color={
                          today.getDay() == 0
                            ? red[400]
                            : today.getDay() == 6 && blue[400]
                        }
                      >
                        {day_arr[today.getDay()]}
                      </Box>
                      <Box justifyContent="center" display="flex">
                        {today.getDate() == 1 ? (
                          <Box
                            fontSize={20}
                            justifyContent="center"
                            display="flex"
                            color={
                              today.getDay() == 0
                                ? red[400]
                                : today.getDay() == 6 && blue[400]
                            }
                          >{`${today.getMonth() + 1}/${today.getDate()}`}</Box>
                        ) : (
                          <Box
                            fontSize={20}
                            justifyContent="center"
                            display="flex"
                            color={
                              today.getDay() == 0
                                ? red[400]
                                : today.getDay() == 6 && blue[400]
                            }
                          >
                            {today.getDate()}
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                    {/* value + 1 */}
                    <TableCell
                      style={{
                        fontWeight: 400,
                        width: "13%",
                        borderStyle: "solid none",
                        borderWidth: "1px",
                        borderColor: grey[400],
                      }}
                    >
                      <Box
                        fontSize={12}
                        justifyContent="center"
                        display="flex"
                        color={
                          dy.getDay() == 0
                            ? red[400]
                            : dy.getDay() == 6 && blue[400]
                        }
                      >
                        {day_arr[dy.getDay()]}
                      </Box>
                      {dy.getDate() == 1 ? (
                        <Box
                          fontSize={20}
                          justifyContent="center"
                          display="flex"
                          color={
                            dy.getDay() == 0
                              ? red[400]
                              : dy.getDay() == 6 && blue[400]
                          }
                        >{`${dy.getMonth() + 1}/${dy.getDate()} `}</Box>
                      ) : (
                        <Box
                          fontSize={20}
                          justifyContent="center"
                          display="flex"
                          color={
                            dy.getDay() == 0
                              ? red[400]
                              : dy.getDay() == 6 && blue[400]
                          }
                        >
                          {dy.getDate()}
                        </Box>
                      )}
                    </TableCell>
                    {/* value + 2 */}
                    <TableCell
                      style={{
                        fontWeight: 400,
                        width: "13%",
                        borderStyle: "solid none",
                        borderWidth: "1px",
                        borderColor: grey[400],
                      }}
                    >
                      <Box
                        fontSize={12}
                        justifyContent="center"
                        display="flex"
                        color={
                          dy2.getDay() == 0
                            ? red[400]
                            : dy2.getDay() == 6 && blue[400]
                        }
                      >
                        {day_arr[dy2.getDay()]}
                      </Box>
                      {dy2.getDate() == 1 ? (
                        <Box
                          color={
                            dy2.getDay() == 0
                              ? red[400]
                              : dy2.getDay() == 6 && blue[400]
                          }
                          fontSize={20}
                          justifyContent="center"
                          display="flex"
                        >{`${dy2.getMonth() + 1}/${dy2.getDate()}`}</Box>
                      ) : (
                        <Box
                          fontSize={20}
                          justifyContent="center"
                          display="flex"
                          color={
                            dy2.getDay() == 0
                              ? red[400]
                              : dy2.getDay() == 6 && blue[400]
                          }
                        >
                          {dy2.getDate()}
                        </Box>
                      )}
                    </TableCell>
                    {/* value + 3 */}
                    <TableCell
                      style={{
                        fontWeight: 400,
                        width: "13%",
                        borderStyle: "solid none",
                        borderWidth: "1px",
                        borderColor: grey[400],
                      }}
                    >
                      <Box
                        fontSize={12}
                        justifyContent="center"
                        display="flex"
                        color={
                          dy3.getDay() == 0
                            ? red[400]
                            : dy3.getDay() == 6 && blue[400]
                        }
                      >
                        {day_arr[dy3.getDay()]}
                      </Box>
                      {dy3.getDate() == 1 ? (
                        <Box
                          fontSize={20}
                          justifyContent="center"
                          display="flex"
                          color={
                            dy3.getDay() == 0
                              ? red[400]
                              : dy3.getDay() == 6 && blue[400]
                          }
                        >
                          {`${dy3.getMonth() + 1}/${dy3.getDate()} `}
                        </Box>
                      ) : (
                        <Box
                          fontSize={20}
                          justifyContent="center"
                          display="flex"
                          color={
                            dy3.getDay() == 0
                              ? red[400]
                              : dy3.getDay() == 6 && blue[400]
                          }
                        >
                          {dy3.getDate()}
                        </Box>
                      )}
                    </TableCell>
                    {/* value + 4 */}
                    <TableCell
                      style={{
                        fontWeight: 400,
                        width: "13%",
                        borderStyle: "solid none",
                        borderWidth: "1px",
                        borderColor: grey[400],
                      }}
                    >
                      <Box
                        fontSize={12}
                        justifyContent="center"
                        display="flex"
                        color={
                          dy4.getDay() == 0
                            ? red[400]
                            : dy4.getDay() == 6 && blue[400]
                        }
                      >
                        {day_arr[dy4.getDay()]}
                      </Box>
                      {dy4.getDate() == 1 ? (
                        <Box
                          fontSize={20}
                          justifyContent="center"
                          display="flex"
                          color={
                            dy4.getDay() == 0
                              ? red[400]
                              : dy4.getDay() == 6 && blue[400]
                          }
                        >
                          {`${dy4.getMonth() + 1}/${dy4.getDate()} `}
                        </Box>
                      ) : (
                        <Box
                          fontSize={20}
                          justifyContent="center"
                          display="flex"
                          color={
                            dy4.getDay() == 0
                              ? red[400]
                              : dy4.getDay() == 6 && blue[400]
                          }
                        >
                          {dy4.getDate()}
                        </Box>
                      )}
                    </TableCell>
                    {/* value + 5 */}
                    <TableCell
                      style={{
                        fontWeight: 400,
                        width: "13%",
                        borderStyle: "solid none",
                        borderWidth: "1px",
                        borderColor: grey[400],
                      }}
                    >
                      <Box
                        fontSize={12}
                        justifyContent="center"
                        display="flex"
                        color={
                          dy5.getDay() == 0
                            ? red[400]
                            : dy5.getDay() == 6 && blue[400]
                        }
                      >
                        {day_arr[dy5.getDay()]}
                      </Box>
                      {dy5.getDate() == 1 ? (
                        <Box
                          fontSize={20}
                          justifyContent="center"
                          display="flex"
                          color={
                            dy5.getDay() == 0
                              ? red[400]
                              : dy5.getDay() == 6 && blue[400]
                          }
                        >
                          {`${dy5.getMonth() + 1}/${dy5.getDate()} `}
                        </Box>
                      ) : (
                        <Box
                          fontSize={20}
                          justifyContent="center"
                          display="flex"
                          color={
                            dy5.getDay() == 0
                              ? red[400]
                              : dy5.getDay() == 6 && blue[400]
                          }
                        >
                          {dy5.getDate()}
                        </Box>
                      )}
                    </TableCell>
                    {/* value + 6 */}
                    <TableCell
                      style={{
                        fontWeight: 400,
                        width: "13%",
                        borderStyle: "solid none",
                        borderWidth: "1px",
                        borderColor: grey[400],
                      }}
                    >
                      <Box
                        fontSize={12}
                        justifyContent="center"
                        display="flex"
                        color={
                          dy6.getDay() == 0
                            ? red[400]
                            : dy6.getDay() == 6 && blue[400]
                        }
                      >
                        {day_arr[dy6.getDay()]}
                      </Box>
                      {dy6.getDate() == 1 ? (
                        <Box
                          fontSize={20}
                          justifyContent="center"
                          display="flex"
                          color={
                            dy6.getDay() == 0
                              ? red[400]
                              : dy6.getDay() == 6 && blue[400]
                          }
                        >
                          {`${dy6.getMonth() + 1}/${dy6.getDate()} `}
                        </Box>
                      ) : (
                        <Box
                          fontSize={20}
                          justifyContent="center"
                          display="flex"
                          color={
                            dy6.getDay() == 0
                              ? red[400]
                              : dy6.getDay() == 6 && blue[400]
                          }
                        >
                          {dy6.getDate()}
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {time_arr.map((t) => (
                    <TableRow key={time_arr.length}>
                      <TableCell>
                        <Box fontSize={10} sx={{ height: 40, width: "8%" }}>
                          <Box>{`${t}:00`}</Box>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          borderStyle: "dashed solid",
                          borderWidth: "1px",
                          borderColor: grey[400],
                          bgcolor: grey[200],
                          width: "13%",
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
                                      <Box>{`日付 : ${dayjs(
                                        i.date.toDate()
                                      ).format("YYYY/MM/DD ")}`}</Box>
                                      <Box>{`時間 : ${i.time}:30 ~ ${
                                        i.time + 1
                                      }:30`}</Box>
                                    </>
                                  }
                                  arrow
                                >
                                  <IconButton
                                    onClick={() => {
                                      handleOpen();
                                      setI(i.id);
                                      setTest(
                                        `${dayjs(i.date.toDate()).format(
                                          "M/D "
                                        )} ${i.time}:30 ~ ${i.time + 1}:30`
                                      );
                                    }}
                                  >
                                    <RadioButtonUncheckedIcon
                                      sx={{
                                        color: "white",
                                        fontSize: 20,
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
                          borderColor: grey[400],
                          bgcolor: grey[200],
                        }}
                      >
                        {freeLists2.map(
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
                                      <Box>{`日付 : ${dayjs(
                                        i.date.toDate()
                                      ).format("YYYY/MM/DD ")}`}</Box>
                                      <Box>{`時間 : ${i.time}:30 ~ ${
                                        i.time + 1
                                      }:30`}</Box>
                                    </>
                                  }
                                  arrow
                                >
                                  <IconButton
                                    onClick={() => {
                                      handleOpen();
                                      setI(i.id);
                                      setTest(
                                        `${dayjs(i.date.toDate()).format(
                                          "M/D "
                                        )} ${i.time}:30 ~ ${i.time + 1}:30`
                                      );
                                    }}
                                  >
                                    <RadioButtonUncheckedIcon
                                      sx={{
                                        color: "white",
                                        fontSize: 20,
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
                          borderColor: grey[400],
                          bgcolor: grey[200],
                        }}
                      >
                        {freeLists3.map(
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
                                      <Box>{`日付 : ${dayjs(
                                        i.date.toDate()
                                      ).format("YYYY/MM/DD ")}`}</Box>
                                      <Box>{`時間 : ${i.time}:30 ~ ${
                                        i.time + 1
                                      }:30`}</Box>
                                    </>
                                  }
                                  arrow
                                >
                                  <IconButton
                                    onClick={() => {
                                      handleOpen();
                                      setI(i.id);
                                      setTest(
                                        `${dayjs(i.date.toDate()).format(
                                          "M/D "
                                        )} ${i.time}:30 ~ ${i.time + 1}:30`
                                      );
                                    }}
                                  >
                                    <RadioButtonUncheckedIcon
                                      sx={{
                                        color: "white",
                                        fontSize: 20,
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
                          borderColor: grey[400],
                          bgcolor: grey[200],
                        }}
                      >
                        {freeLists4.map(
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
                                      <Box>{`日付 : ${dayjs(
                                        i.date.toDate()
                                      ).format("YYYY/MM/DD ")}`}</Box>
                                      <Box>{`時間 : ${i.time}:30 ~ ${
                                        i.time + 1
                                      }:30`}</Box>
                                    </>
                                  }
                                  arrow
                                >
                                  <IconButton
                                    onClick={() => {
                                      handleOpen();
                                      setI(i.id);
                                      setTest(
                                        `${dayjs(i.date.toDate()).format(
                                          "M/D "
                                        )} ${i.time}:30 ~ ${i.time + 1}:30`
                                      );
                                    }}
                                  >
                                    <RadioButtonUncheckedIcon
                                      sx={{
                                        color: "white",
                                        fontSize: 20,
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
                          borderColor: grey[400],
                          bgcolor: grey[200],
                        }}
                      >
                        {freeLists5.map(
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
                                      <Box>{`日付 : ${dayjs(
                                        i.date.toDate()
                                      ).format("YYYY/MM/DD ")}`}</Box>
                                      <Box>{`時間 : ${i.time}:30 ~ ${
                                        i.time + 1
                                      }:30`}</Box>
                                    </>
                                  }
                                  arrow
                                >
                                  <IconButton
                                    onClick={() => {
                                      handleOpen();
                                      setI(i.id);
                                      setTest(
                                        `${dayjs(i.date.toDate()).format(
                                          "M/D "
                                        )} ${i.time}:30 ~ ${i.time + 1}:30`
                                      );
                                    }}
                                  >
                                    <RadioButtonUncheckedIcon
                                      sx={{
                                        color: "white",
                                        fontSize: 20,
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
                          borderColor: grey[400],
                          bgcolor: grey[200],
                        }}
                      >
                        {freeLists6.map(
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
                                      <Box>{`日付 : ${dayjs(
                                        i.date.toDate()
                                      ).format("YYYY/MM/DD ")}`}</Box>
                                      <Box>{`時間 : ${i.time}:30 ~ ${
                                        i.time + 1
                                      }:30`}</Box>
                                    </>
                                  }
                                  arrow
                                >
                                  <IconButton
                                    onClick={() => {
                                      handleOpen();
                                      setI(i.id);
                                      setTest(
                                        `${dayjs(i.date.toDate()).format(
                                          "M/D "
                                        )} ${i.time}:30 ~ ${i.time + 1}:30`
                                      );
                                    }}
                                  >
                                    <RadioButtonUncheckedIcon
                                      sx={{
                                        color: "white",
                                        fontSize: 20,
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
                          borderColor: grey[400],
                          bgcolor: grey[200],
                        }}
                      >
                        {freeLists7.map(
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
                                      <Box>{`日付 : ${dayjs(
                                        i.date.toDate()
                                      ).format("YYYY/MM/DD ")}`}</Box>
                                      <Box>{`時間 : ${i.time}:30 ~ ${
                                        i.time + 1
                                      }:30`}</Box>
                                    </>
                                  }
                                  arrow
                                >
                                  <IconButton
                                    onClick={() => {
                                      handleOpen();
                                      setI(i.id);
                                      setTest(
                                        `${dayjs(i.date.toDate()).format(
                                          "M/D "
                                        )} ${i.time}:30 ~ ${i.time + 1}:30`
                                      );
                                    }}
                                  >
                                    <RadioButtonUncheckedIcon
                                      sx={{
                                        color: "white",
                                        fontSize: 20,
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
            </Media>
          </>
          <Modal
            open={open}
            onClose={handleClose}
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
                    {test}
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
                    {u && u.userName}
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
                    {user && user.displayName}
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
                  onClick={() => {
                    handleClose();
                  }}
                >
                  キャンセル
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
