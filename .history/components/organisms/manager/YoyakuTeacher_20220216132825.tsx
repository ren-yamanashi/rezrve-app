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
} from "firebase/firestore";
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
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { TextField } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Typography from "@mui/material/Typography";
import { blue, teal } from "@mui/material/colors";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import { toast } from "react-toastify";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";

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

//ユーザーリストの作成　名前に管理者があればユーザーの削除が可能。 メアドに @bee が入っていればシフトの登録が可能
export default function YoyakuTeacherAtManager() {
  const [users, setUsers] = useState<Users[]>([]);
  const { user } = useAuth();
  const [err, setErr] = useState<boolean>(false);
  const [test, setTest] = useState<string>("");
  const router = useRouter();
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [sortTeacher, setSortTeacher] = useState<string>("");
  const [sortTime, setSortTime] = useState<number>();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleOpen3 = () => setOpen3(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);
  const initialDate = new Date();
  const [value, setValue] = useState(initialDate);
  const [student, setStudent] = useState("");
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
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };

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
      const db = getFirestore();
      const u = user;
      setTest(u.displayName);
      const q = query(collection(db, "users"), where("role", "==", "teacher"));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setErr(true);
      }
      //users一覧の展開
      const gotUsers = snapshot.docs.map((doc) => {
        const user = doc.data() as Users;
        user.id = doc.id;
        return user;
      });
      setUsers(gotUsers);
    }
    loadUser();
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
      where("date", ">=", timestamp(xxx2)),
      where("teacher", "==", sortTeacher),
      orderBy("date", "asc"),
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
  //時間で絞り込み
  const filterTime = async () => {
    setErr(false);
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", false),
      where("date", "==", timestamp(xxx)),
      where("teacher", "==", sortTeacher),
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
  const getRsv = async (id: string, e: any) => {
    setOpen2(false);
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", false),
      where("teacher", "==", sortTeacher),
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
  };
  /**========
   * シフト削除
   *========*/
  const deleteShift = async (id: string, e: any) => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
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
    }
  };
  return (
    <>
      <React.Fragment>
        <Box ml={3}>
          <Title>予約登録ページ</Title>
        </Box>
        <Box display="flex" flexWrap="wrap">
          {users.map((index) => (
            <>
              <Grid item xs={12} sm={4} lg={3} md={3}>
                <Box mb={3} display="flex" mx={2}>
                  <CardContent
                    style={{
                      borderRadius: "7px",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      margin: "auto",
                    }}
                  >
                    <Grid item xs={12} sm={14} lg={10} md={10}>
                      <CardMedia
                        component="img"
                        sx={{
                          borderRadius: "10%",
                        }}
                        image={index.url}
                        alt="Icon"
                      />
                    </Grid>
                    <Box display="flex" margin="auto">
                      <Typography
                        sx={{ fontSize: 15, mt: 2, mb: 1, mx: "auto" }}
                      >
                        {`講師名 : ${index.userName}`}
                      </Typography>
                    </Box>
                    <Box display="flex" margin="auto">
                      <Button
                        onClick={async () => {
                          setSortTeacher("");
                          setSortTeacher(index.userName);
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
                          setCount(count + 1);
                        }}
                        type="submit"
                        variant="contained"
                        sx={{
                          bgcolor: teal[500],
                          "&:hover": { bgcolor: "#2E8B57" },
                          fontSize: 10,
                          width: 140,
                          margin: "auto",
                        }}
                      >
                        ダブルクリックで選択
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
              </Grid>
            </>
          ))}
        </Box>
        {count >= 1 && (
          <Table size="small">
            <TableHead style={{ backgroundColor: "#FFFFDD" }}>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>
                  <Box ml={3}>講師名</Box>
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "40%" }}>
                  <Box margin="auto" display="flex">
                    <Box mx={3} my="auto">
                      日付
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="日付を選択"
                        value={value}
                        onChange={async (newValue) => {
                          setValue(newValue);
                          setErr(false);
                          setOpen(false);
                          const day3 = new Date(newValue);
                          const y3 = day3.getFullYear();
                          const m3 = day3.getMonth();
                          const d3 = day3.getDate();
                          let xxx = new Date(y3, m3, d3, 12, 0, 0);
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
                          const getReserves = snapshot.docs.map((doc) => {
                            const reserve = doc.data() as FreeList;
                            reserve.id = doc.id;
                            return reserve;
                          });
                          setFreeLists(getReserves);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                </TableCell>
                <TableCell style={{ fontWeight: 600 }}>
                  <Box ml={3}>
                    時間
                    <IconButton onClick={handleOpen3}>
                      <FilterListIcon />
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
                          <Box width="30vw" margin="auto" display="flex">
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
                            onClick={(e) => {
                              getRsv(freeList.id, e);
                              handleClose2;
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
        )}
        {err == true && (
          <Box textAlign="center">
            <Grid xs={12} sm={15}>
              <Alert variant="filled" severity="info" sx={{ m: 3 }}>
                予約可能なレッスンは見つかりませんでした
              </Alert>
            </Grid>
          </Box>
        )}
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
