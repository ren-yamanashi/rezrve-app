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
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
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
import { blue, grey, teal } from "@mui/material/colors";
import { useRouter } from "next/router";
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

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

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

const style2 = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

//ユーザーリストの作成　名前に管理者があればユーザーの削除が可能。 メアドに @bee が入っていればシフトの登録が可能
export default function UsersList() {
  const [users, setUsers] = useState<Users[]>([]);
  const [u, setU] = useState<Users>();
  const { user } = useAuth();
  const [err, setErr] = useState<boolean>(false);
  const [test, setTest] = useState<string>("");
  const router = useRouter();
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [sortTeacher, setSortTeacher] = useState<string>("");
  const [sortTime, setSortTime] = useState<number>();
  const [time, setTime] = useState(0);
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
  const db = getFirestore();
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
    async function loadRsv() {
      const day3 = new Date();
      const y3 = day3.getFullYear();
      const m3 = day3.getMonth();
      const d3 = day3.getDate();
      let xxx = new Date(y3, m3, d3, 12, 0, 0);
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
      const getReserves = snapshot.docs.map((doc) => {
        const reserve = doc.data() as FreeList;
        reserve.id = doc.id;
        return reserve;
      });
      setFreeLists(getReserves);
    }
    async function loadUser() {
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
    loadRsv();
  }, [process, browser, user]);

  /**========
   * 並び替え
   *=======*/
  //時間で絞り込み
  const filterTime = async () => {
    setErr(false);
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
  //セレクト
  const selectUser = async (id: string) => {
    console.log(id);
    const q = query(collection(db, "users"), where("id", "==", id));
    const snapshot = await getDocs(q);
    //users一覧の展開
    const gotUsers = snapshot.docs.map((doc) => {
      const user = doc.data() as Users;
      user.id = doc.id;
      return user;
    });
    setUsers(gotUsers);
  };
  //リセット
  const filterReset = async () => {
    setErr(false);
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
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", false),
      where("date", "==", timestamp(xxx)),
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
  return (
    <>
      <React.Fragment>
        <MediaContextProvider>
          <Media greaterThan="sm">
            <Box m={3} display="flex" alignItems="center">
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
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
            <Table size="small">
              <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: 600, width: "30%" }}>
                    <Box ml={3}>講師名</Box>
                  </TableCell>
                  <TableCell style={{ fontWeight: 600, width: "30%" }}>
                    <Box ml={3}>日付</Box>
                  </TableCell>
                  <TableCell style={{ fontWeight: 600, width: "20%" }}>
                    <Box display="flex" ml={1}>
                      <Box mt={1}>時間</Box>
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
                        <Stack
                          spacing={2}
                          sx={{ maxWidth: 1000, my: 3, mx: "auto" }}
                        >
                          <SnackbarContent
                            sx={{
                              bgcolor: blue[400],
                              justifyContent: "center",
                              boxShadow: "none",
                            }}
                            message={"ご希望の時間帯をお選びください"}
                          />
                        </Stack>
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
                              label="10:00"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              checked={sortTime == 11}
                              onChange={() => setSortTime(11)}
                              label="11:00"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              checked={sortTime == 12}
                              onChange={() => setSortTime(12)}
                              label="12:00"
                            />
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              checked={sortTime == 13}
                              onChange={() => setSortTime(13)}
                              label="13:00"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              checked={sortTime == 14}
                              onChange={() => setSortTime(14)}
                              label="14:00"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              checked={sortTime == 15}
                              onChange={() => setSortTime(15)}
                              label="15:00"
                            />
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              checked={sortTime == 16}
                              onChange={() => setSortTime(16)}
                              label="16:00"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              checked={sortTime == 17}
                              onChange={() => setSortTime(17)}
                              label="17:00"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              checked={sortTime == 18}
                              onChange={() => setSortTime(18)}
                              label="18:00"
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
                  <TableCell style={{ fontWeight: 600 }} />
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
                      <Box ml={3}>{`${freeList.time}:00`} </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Tooltip title={`予約する:${freeList.teacher}`} arrow>
                          <Button
                            variant="contained"
                            sx={{
                              mt: 3,
                              mb: 2,
                              ml: 3,
                              bgcolor: teal[400],
                              color: "white",
                              "&:hover": { bgcolor: teal[500] },
                            }}
                            onClick={() => {
                              handleOpen();
                              selectUser(freeList.senderUid);
                              setTime(freeList.time);
                            }}
                          >
                            予約
                          </Button>
                        </Tooltip>
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
                            <Item>
                              <Box display="flex">
                                <Typography
                                  variant="h5"
                                  component="div"
                                  color="black"
                                  textAlign="center"
                                  mx="auto"
                                  fontSize={17}
                                  width={90}
                                  fontWeight={400}
                                >
                                  予約情報
                                </Typography>
                              </Box>
                            </Item>
                            <Item2>
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
                                  {`${
                                    xxx.getMonth() + 1
                                  }/${xxx.getDate()} ${time}:00 ~ ${
                                    time + 1
                                  }:00`}
                                </Typography>
                              </Box>
                            </Item2>
                            <Item>
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
                                  {users.map((user) => user.userName)}
                                </Typography>
                              </Box>
                            </Item>
                            <Item2>
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
                                  {user.displayName}
                                </Typography>
                              </Box>
                            </Item2>
                            <Item>
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
                          </Box>
                        </Modal>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Media>
          {/* スマホレスポンシブ */}
          <Media at="sm">
            <Box m={3} display="flex" alignItems="center">
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
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
            <Table size="small">
              <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: 600, width: "35%" }}>
                    <Box fontSize={12}>講師名</Box>
                  </TableCell>
                  <TableCell style={{ fontWeight: 600, width: "30%" }}>
                    <Box fontSize={12}>日付</Box>
                  </TableCell>
                  <TableCell style={{ fontWeight: 600 }}>
                    <Box fontSize={12} ml={1}>
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
                      <Box sx={style2}>
                        <Box alignItems="top" m={0}>
                          <IconButton onClick={handleClose3}>
                            <CloseIcon fontSize="small" />
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
                              label="10:00"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              checked={sortTime == 11}
                              onChange={() => setSortTime(11)}
                              label="11:00"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              checked={sortTime == 12}
                              onChange={() => setSortTime(12)}
                              label="12:00"
                            />
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              checked={sortTime == 13}
                              onChange={() => setSortTime(13)}
                              label="13:00"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              checked={sortTime == 14}
                              onChange={() => setSortTime(14)}
                              label="14:00"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              checked={sortTime == 15}
                              onChange={() => setSortTime(15)}
                              label="15:00"
                            />
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              checked={sortTime == 16}
                              onChange={() => setSortTime(16)}
                              label="16:00"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              checked={sortTime == 17}
                              onChange={() => setSortTime(17)}
                              label="17:00"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              checked={sortTime == 18}
                              onChange={() => setSortTime(18)}
                              label="18:00"
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
                      <Box fontSize={12}>{freeList.teacher}</Box>
                    </TableCell>
                    <TableCell>
                      <Box fontSize={12}>
                        {dayjs(freeList.date.toDate()).format("YYYY/MM/DD ")}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={`予約する:${freeList.teacher}`} arrow>
                        <Button
                          variant="contained"
                          sx={{
                            mt: 3,
                            mb: 2,
                            ml: 3,
                            fontSize: 12,
                            bgcolor: teal[400],
                            color: "white",
                            "&:hover": { bgcolor: teal[500] },
                          }}
                          onClick={(e) => {
                            getRsv(freeList.id, e);
                            handleClose2;
                          }}
                        >
                          {`${freeList.time}:00`}
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Media>
          {err == true && (
            <Box textAlign="center">
              <Grid xs={12} sm={15}>
                <Alert variant="filled" severity="info" sx={{ m: 3 }}>
                  予約可能なレッスンは見つかりませんでした
                </Alert>
              </Grid>
            </Box>
          )}
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
