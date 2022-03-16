import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
  startAt,
  limit,
  endAt,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { styled } from "@mui/material/styles";
import { createMedia } from "@artsy/fresnel";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import { Users } from "../../../models/Users";
import { useRouter } from "next/router";
import { browser } from "process";
import { blue, grey, teal } from "@mui/material/colors";
import { ja } from "date-fns/locale";

//MediaQuery設定
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1000,
    xl: 1220,
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

//スケジュール表の作成　全てのスケジュールを参照することができる。
//※ただし、このサイトリンクが表示されるのは名前に「管理者」がつく場合のみ
export default function SelectDayAll() {
  const db = getFirestore();
  const [users, setUsers] = useState<Users[]>([]); //講師用
  const [users2, setUsers2] = useState<Users[]>([]); //生徒用
  const [freeLists10, setFreeLists10] = useState<FreeList[]>([]);
  const [freeLists11, setFreeLists11] = useState<FreeList[]>([]);
  const [freeLists12, setFreeLists12] = useState<FreeList[]>([]);
  const [freeLists13, setFreeLists13] = useState<FreeList[]>([]);
  const [freeLists14, setFreeLists14] = useState<FreeList[]>([]);
  const [freeLists15, setFreeLists15] = useState<FreeList[]>([]);
  const [freeLists16, setFreeLists16] = useState<FreeList[]>([]);
  const [freeLists17, setFreeLists17] = useState<FreeList[]>([]);
  const [freeLists18, setFreeLists18] = useState<FreeList[]>([]);
  const [value, setValue] = useState<Date | null>(new Date());
  const [student, setStudent] = useState("");
  const [teacher, setTeacher] = useState("");
  const [err, setErr] = useState(false);
  const [err2, setErr2] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const [rsvDate, setRsvDate] = useState("");
  const [rsvNum, setRsvNum] = useState("");
  const [rsvTime, setRsvTime] = useState<number>();
  const [userNum, setUserNum] = useState("");
  const [age, setAge] = React.useState<number | string>("");
  const [uuu, setUuu] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
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
    /**==========
     * Userを取り出す（講師）
     *==========*/
    async function loadUsers() {
      const q = query(collection(db, "users"), where("role", "==", "teacher"));
      const snapshot = await getDocs(q);
      //FreeList一覧の展開
      const gotUser = snapshot.docs.map((doc) => {
        const user = doc.data() as Users;
        user.id = doc.id;
        return user;
      });
      setUsers(gotUser);
    }
    /**===============
     * Firebaseからユーザーを取り出す（生徒）
     *===============*/
    async function loadStudents() {
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
      setUsers2(gotUser);
    }
    /**===========
     * 予約情報を取り出す
     *============*/
    //10時
    async function loadRsv10() {
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 10)
      );
      const snapshot = await getDocs(q);
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
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 11)
      );
      const snapshot = await getDocs(q);
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
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 12)
      );
      const snapshot = await getDocs(q);
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
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 13)
      );
      const snapshot = await getDocs(q);
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
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 14)
      );
      const snapshot = await getDocs(q);
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
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 15)
      );
      const snapshot = await getDocs(q);
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
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 16)
      );
      const snapshot = await getDocs(q);
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
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 17)
      );
      const snapshot = await getDocs(q);
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
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx2)),
        where("time", "==", 18)
      );
      const snapshot = await getDocs(q);
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists18(gotFreeList);
    }

    loadUsers();
    loadStudents();
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
  /**==========
   * シフト登録
   *==========*/
  const createShift = async (e: any) => {
    setErr(false);
    const q = query(
      collection(db, "FreeSpace"),
      where("teacher", "==", uuu),
      where("time", "==", age),
      where("date", "==", timestamp(xxx))
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      e.preventDefault();
      await addDoc(collection(db, "FreeSpace"), {
        teacher: uuu,
        student: "",
        date: timestamp(xxx),
        reserved: false,
        completed: false,
        time: age,
        createAt: serverTimestamp(),
        senderUid: user.uid,
      }).then(() =>
        toast.success("登録が完了しました", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      );
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
        }, 1.5 * 1000);
      });
    } else {
      setErr2(true);
      return;
    }
  };
  return (
    <>
      <React.Fragment>
        <Box
          ml={5}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={5}
        >
          <Box mr={5}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
              <DatePicker
                label="日付を選択"
                value={value}
                onChange={async (newValue) => {
                  setValue(newValue);
                  const day3 = new Date(newValue);
                  const y3 = day3.getFullYear();
                  const m3 = day3.getMonth();
                  const d3 = day3.getDate();
                  let xxx = new Date(y3, m3, d3, 12, 0, 0);
                  //10時
                  async function loadRsv10() {
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 10)
                    );
                    const snapshot = await getDocs(q);
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
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 11)
                    );
                    const snapshot = await getDocs(q);
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
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 12)
                    );
                    const snapshot = await getDocs(q);
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
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 13)
                    );
                    const snapshot = await getDocs(q);

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
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 14)
                    );
                    const snapshot = await getDocs(q);

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
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 15)
                    );
                    const snapshot = await getDocs(q);

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
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 16)
                    );
                    const snapshot = await getDocs(q);

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
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 17)
                    );
                    const snapshot = await getDocs(q);

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
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 18)
                    );
                    const snapshot = await getDocs(q);

                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists18(gotFreeList);
                  }
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
        <Box mt={3} display="flex">
          <Box>
            <Button
              sx={{
                bgcolor: teal[400],
                height: "20px",
                mr: 1,
                "&:hover": { bgcolor: teal[400] },
              }}
            />
            予約済み
          </Box>
          <Box ml={3}>
            <Button
              sx={{
                bgcolor: blue[200],
                height: "20px",
                mr: 1,
                "&:hover": { bgcolor: blue[200] },
              }}
            />
            予約可能
          </Box>
          <Box ml={3}>
            <Button
              sx={{
                bgcolor: "white",
                height: "20px",
                mr: 1,
                border: 1,
                borderColor: "black",
              }}
            />
            予約不可
          </Box>
        </Box>
        <Box>
          <Table size="small" sx={{ my: 3, border: "2px", minWidth: "1000px" }}>
            <TableHead style={{ backgroundColor: "#FFFFDD", border: "3px" }}>
              <TableRow>
                <TableCell style={{ fontWeight: 600, width: "20%" }}>
                  講師名
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  10:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  11:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  12:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  13:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  14:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  15:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  16:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  17:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  18:00
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((uu) => (
                <TableRow key={uu.id}>
                  <TableCell style={{ fontWeight: 600 }}>
                    <MediaContextProvider>
                      <Box display="flex">
                        <Media greaterThan="lg">
                          <Box
                            component="img"
                            sx={{ height: 40, width: 40, borderRadius: "50%" }}
                            alt={uu.userName}
                            src={uu.url}
                          />
                        </Media>
                        <Box
                          sx={{
                            textAlign: "center",
                            my: "auto",
                            ml: 1,
                            fontSize: "13px",
                          }}
                        >
                          {uu.userName}
                        </Box>
                      </Box>
                      <Media greaterThan="lg">
                        <ListItem
                          key="editUser"
                          onClick={() => {
                            setOpen(true);
                            setUuu(uu.userName);
                          }}
                          sx={{ cursor: "pointer" }}
                        >
                          <PersonAddAltIcon sx={{ color: blue[500], mr: 2 }} />
                          <Box sx={{ color: blue[500], fontSize: "13px" }}>
                            シフトを登録
                          </Box>
                        </ListItem>
                      </Media>
                      <Media at="lg">
                        <Tooltip title="シフトを登録" arrow>
                          <ListItem
                            key="editUser"
                            onClick={() => {
                              setOpen(true);
                              setUuu(uu.userName);
                            }}
                            sx={{ cursor: "pointer" }}
                          >
                            <PersonAddAltIcon
                              sx={{ color: blue[500], mr: 2 }}
                            />
                          </ListItem>
                        </Tooltip>
                      </Media>
                    </MediaContextProvider>
                  </TableCell>
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
                          sx={{ fontSize: 20, mb: 5, color: blue[500] }}
                          fontWeight="bold"
                          gutterBottom
                        >
                          以下の内容でシフト登録します
                        </Typography>
                        <Box display="flex" justifyContent="center">
                          <Typography
                            sx={{ fontSize: 20, mr: 1 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            講師名 :
                          </Typography>
                          <Typography
                            sx={{ fontSize: 20 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {uuu}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center">
                          <Typography
                            sx={{ fontSize: 20, my: "auto", mr: 1 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            開始時間 :
                          </Typography>
                          <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <Select
                              labelId="demo-simple-select-autowidth-label"
                              id="demo-simple-select-autowidth"
                              value={age}
                              onChange={handleChange}
                              autoWidth
                              label="時間"
                              sx={{ height: 40 }}
                            >
                              <MenuItem value={10}>10:30</MenuItem>
                              <MenuItem value={11}>11:30</MenuItem>
                              <MenuItem value={12}>12:30</MenuItem>
                              <MenuItem value={13}>13:30</MenuItem>
                              <MenuItem value={14}>14:30</MenuItem>
                              <MenuItem value={15}>15:30</MenuItem>
                              <MenuItem value={16}>16:30</MenuItem>
                              <MenuItem value={17}>17:30</MenuItem>
                              <MenuItem value={18}>18:30</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Button
                          type="submit"
                          onClick={createShift}
                          variant="contained"
                          sx={{ mt: 2, mb: 2 }}
                        >
                          登録
                        </Button>
                      </Box>
                    </Box>
                  </Modal>

                  <TableCell
                    sx={{
                      borderStyle: "dashed",
                      borderWidth: "1px",
                      cursor: "pointer",
                      height: 50,
                      bgcolor: freeLists10.map(
                        (item) =>
                          uu.userName == item.teacher &&
                          (item.student !== "" ? teal[300] : blue[200])
                      ),
                    }}
                    onClick={() => {
                      freeLists10.map((item) => {
                        uu.userName == item.teacher && setRsvNum(item.id);
                        uu.userName == item.teacher && setTeacher(item.teacher);
                        uu.userName == item.teacher && setRsvTime(item.time);
                        uu.userName == item.teacher &&
                          setRsvDate(
                            `${dayjs(item.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${item.time}:00~`
                          );
                        uu.userName == item.teacher &&
                          (item.student !== ""
                            ? router.push(`/reserve/edit/${item.id}`)
                            : handleOpen3());
                      });
                    }}
                  >
                    {freeLists10.map(
                      (item) =>
                        uu.userName == item.teacher &&
                        (item.student !== "" ? (
                          <Tooltip
                            title={
                              <>
                                <Box>{`講師名:${item.teacher}`}</Box>
                                <Box>{`生徒名:${item.student}`}</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: teal[300],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: teal[300] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title={
                              <>
                                <Box>クリックして予約</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: blue[200],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: blue[200] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ))
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderStyle: "dashed",
                      borderWidth: "1px",
                      cursor: "pointer",
                      height: 50,
                      bgcolor: freeLists11.map(
                        (item) =>
                          uu.userName == item.teacher &&
                          (item.student !== "" ? teal[300] : blue[200])
                      ),
                    }}
                    onClick={() =>
                      freeLists11.map((item) => {
                        uu.userName == item.teacher && setRsvNum(item.id);
                        uu.userName == item.teacher && setTeacher(item.teacher);
                        uu.userName == item.teacher && setRsvTime(item.time);
                        uu.userName == item.teacher &&
                          setRsvDate(
                            `${dayjs(item.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${item.time}:00~`
                          );
                        uu.userName == item.teacher &&
                          (item.student !== ""
                            ? router.push(`/reserve/edit/${item.id}`)
                            : handleOpen3());
                      })
                    }
                  >
                    {freeLists11.map(
                      (item) =>
                        uu.userName == item.teacher &&
                        (item.student !== "" ? (
                          <Tooltip
                            title={
                              <>
                                <Box>{`講師名:${item.teacher}`}</Box>
                                <Box>{`生徒名:${item.student}`}</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: teal[300],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: teal[300] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title={
                              <>
                                <Box>クリックして予約</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: blue[200],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: blue[200] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ))
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderStyle: "dashed",
                      borderWidth: "1px",
                      cursor: "pointer",
                      height: 50,
                      bgcolor: freeLists12.map(
                        (item) =>
                          uu.userName == item.teacher &&
                          (item.student !== "" ? teal[300] : blue[200])
                      ),
                    }}
                    onClick={() =>
                      freeLists12.map((item) => {
                        uu.userName == item.teacher && setRsvNum(item.id);
                        uu.userName == item.teacher && setTeacher(item.teacher);
                        uu.userName == item.teacher && setRsvTime(item.time);
                        uu.userName == item.teacher &&
                          setRsvDate(
                            `${dayjs(item.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${item.time}:00~`
                          );
                        uu.userName == item.teacher &&
                          (item.student !== ""
                            ? router.push(`/reserve/edit/${item.id}`)
                            : handleOpen3());
                      })
                    }
                  >
                    {freeLists12.map(
                      (item) =>
                        uu.userName == item.teacher &&
                        (item.student !== "" ? (
                          <Tooltip
                            title={
                              <>
                                <Box>{`講師名:${item.teacher}`}</Box>
                                <Box>{`生徒名:${item.student}`}</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: teal[300],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: teal[300] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title={
                              <>
                                <Box>クリックして予約</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: blue[200],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: blue[200] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ))
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderStyle: "dashed",
                      borderWidth: "1px",
                      cursor: "pointer",
                      height: 50,
                      bgcolor: freeLists13.map(
                        (item) =>
                          uu.userName == item.teacher &&
                          (item.student !== "" ? teal[300] : blue[200])
                      ),
                    }}
                    onClick={() =>
                      freeLists13.map((item) => {
                        uu.userName == item.teacher && setRsvNum(item.id);
                        uu.userName == item.teacher && setTeacher(item.teacher);
                        uu.userName == item.teacher && setRsvTime(item.time);
                        uu.userName == item.teacher &&
                          setRsvDate(
                            `${dayjs(item.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${item.time}:00~`
                          );
                        uu.userName == item.teacher &&
                          (item.student !== ""
                            ? router.push(`/reserve/edit/${item.id}`)
                            : handleOpen3());
                      })
                    }
                  >
                    {freeLists13.map(
                      (item) =>
                        uu.userName == item.teacher &&
                        (item.student !== "" ? (
                          <Tooltip
                            title={
                              <>
                                <Box>{`講師名:${item.teacher}`}</Box>
                                <Box>{`生徒名:${item.student}`}</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: teal[300],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: teal[300] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title={
                              <>
                                <Box>クリックして予約</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: blue[200],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: blue[200] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ))
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderStyle: "dashed",
                      borderWidth: "1px",
                      cursor: "pointer",
                      height: 50,
                      bgcolor: freeLists14.map(
                        (item) =>
                          uu.userName == item.teacher &&
                          (item.student !== "" ? teal[300] : blue[200])
                      ),
                    }}
                    onClick={() =>
                      freeLists14.map((item) => {
                        uu.userName == item.teacher && setRsvNum(item.id);
                        uu.userName == item.teacher && setTeacher(item.teacher);
                        uu.userName == item.teacher && setRsvTime(item.time);
                        uu.userName == item.teacher &&
                          setRsvDate(
                            `${dayjs(item.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${item.time}:00~`
                          );
                        uu.userName == item.teacher &&
                          (item.student !== ""
                            ? router.push(`/reserve/edit/${item.id}`)
                            : handleOpen3());
                      })
                    }
                  >
                    {freeLists14.map(
                      (item) =>
                        uu.userName == item.teacher &&
                        (item.student !== "" ? (
                          <Tooltip
                            title={
                              <>
                                <Box>{`講師名:${item.teacher}`}</Box>
                                <Box>{`生徒名:${item.student}`}</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: teal[300],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: teal[300] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title={
                              <>
                                <Box>クリックして予約</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: blue[200],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: blue[200] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ))
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderStyle: "dashed",
                      borderWidth: "1px",
                      cursor: "pointer",
                      height: 50,
                      bgcolor: freeLists15.map(
                        (item) =>
                          uu.userName == item.teacher &&
                          (item.student !== "" ? teal[300] : blue[200])
                      ),
                    }}
                    onClick={() =>
                      freeLists15.map((item) => {
                        uu.userName == item.teacher && setRsvNum(item.id);
                        uu.userName == item.teacher && setTeacher(item.teacher);
                        uu.userName == item.teacher && setRsvTime(item.time);
                        uu.userName == item.teacher &&
                          setRsvDate(
                            `${dayjs(item.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${item.time}:00~`
                          );
                        uu.userName == item.teacher &&
                          (item.student !== ""
                            ? router.push(`/reserve/edit/${item.id}`)
                            : handleOpen3());
                      })
                    }
                  >
                    {freeLists15.map(
                      (item) =>
                        uu.userName == item.teacher &&
                        (item.student !== "" ? (
                          <Tooltip
                            title={
                              <>
                                <Box>{`講師名:${item.teacher}`}</Box>
                                <Box>{`生徒名:${item.student}`}</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: teal[300],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: teal[300] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title={
                              <>
                                <Box>クリックして予約</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: blue[200],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: blue[200] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ))
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderStyle: "dashed",
                      borderWidth: "1px",
                      cursor: "pointer",
                      height: 50,
                      bgcolor: freeLists16.map(
                        (item) =>
                          uu.userName == item.teacher &&
                          (item.student !== "" ? teal[300] : blue[200])
                      ),
                    }}
                    onClick={() =>
                      freeLists16.map((item) => {
                        uu.userName == item.teacher && setRsvNum(item.id);
                        uu.userName == item.teacher && setTeacher(item.teacher);
                        uu.userName == item.teacher && setRsvTime(item.time);
                        uu.userName == item.teacher &&
                          setRsvDate(
                            `${dayjs(item.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${item.time}:00~`
                          );
                        uu.userName == item.teacher &&
                          (item.student !== ""
                            ? router.push(`/reserve/edit/${item.id}`)
                            : handleOpen3());
                      })
                    }
                  >
                    {freeLists16.map(
                      (item) =>
                        uu.userName == item.teacher &&
                        (item.student !== "" ? (
                          <Tooltip
                            title={
                              <>
                                <Box>{`講師名:${item.teacher}`}</Box>
                                <Box>{`生徒名:${item.student}`}</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: teal[300],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: teal[300] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title={
                              <>
                                <Box>クリックして予約</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: blue[200],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: blue[200] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ))
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderStyle: "dashed",
                      borderWidth: "1px",
                      cursor: "pointer",
                      height: 50,
                      bgcolor: freeLists17.map(
                        (item) =>
                          uu.userName == item.teacher &&
                          (item.student !== "" ? teal[300] : blue[200])
                      ),
                    }}
                    onClick={() =>
                      freeLists17.map((item) => {
                        uu.userName == item.teacher && setRsvNum(item.id);
                        uu.userName == item.teacher && setTeacher(item.teacher);
                        uu.userName == item.teacher && setRsvTime(item.time);
                        uu.userName == item.teacher &&
                          setRsvDate(
                            `${dayjs(item.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${item.time}:00~`
                          );
                        uu.userName == item.teacher &&
                          (item.student !== ""
                            ? router.push(`/reserve/edit/${item.id}`)
                            : handleOpen3());
                      })
                    }
                  >
                    {freeLists17.map(
                      (item) =>
                        uu.userName == item.teacher &&
                        (item.student !== "" ? (
                          <Tooltip
                            title={
                              <>
                                <Box>{`講師名:${item.teacher}`}</Box>
                                <Box>{`生徒名:${item.student}`}</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: teal[300],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: teal[300] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title={
                              <>
                                <Box>クリックして予約</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: blue[200],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: blue[200] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ))
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderStyle: "dashed",
                      borderWidth: "1px",
                      cursor: "pointer",
                      height: 50,
                      bgcolor: freeLists18.map(
                        (item) =>
                          uu.userName == item.teacher &&
                          (item.student !== "" ? teal[300] : blue[200])
                      ),
                    }}
                    onClick={() =>
                      freeLists18.map((item) => {
                        uu.userName == item.teacher && setRsvNum(item.id);
                        uu.userName == item.teacher && setTeacher(item.teacher);
                        uu.userName == item.teacher && setRsvTime(item.time);
                        uu.userName == item.teacher &&
                          setRsvDate(
                            `${dayjs(item.date.toDate()).format(
                              "YYYY/MM/DD "
                            )} ${item.time}:00~`
                          );
                        uu.userName == item.teacher &&
                          (item.student !== ""
                            ? router.push(`/reserve/edit/${item.id}`)
                            : handleOpen3());
                      })
                    }
                  >
                    {freeLists18.map(
                      (item) =>
                        uu.userName == item.teacher &&
                        (item.student !== "" ? (
                          <Tooltip
                            title={
                              <>
                                <Box>{`講師名:${item.teacher}`}</Box>
                                <Box>{`生徒名:${item.student}`}</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: teal[300],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: teal[300] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            title={
                              <>
                                <Box>クリックして予約</Box>
                                <Box>{`レッスン日時:${dayjs(
                                  item.date.toDate()
                                ).format("YYYY/MM/DD ")} ${
                                  item.time
                                }:00~`}</Box>
                              </>
                            }
                          >
                            <Button
                              sx={{
                                bgcolor: blue[200],
                                boxShadow: "none",
                                height: 30,
                                "&:hover": { bgcolor: blue[200] },
                              }}
                              fullWidth
                            />
                          </Tooltip>
                        ))
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

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
                  setUsers2(gotUser);
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
                {users2.map((user) => (
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
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
