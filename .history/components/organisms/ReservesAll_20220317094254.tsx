import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  Timestamp,
  limit,
  startAt,
  endAt,
  updateDoc,
  doc,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { useRouter } from "next/router";
import { blue, grey, teal } from "@mui/material/colors";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { FreeList } from "../../models/FreeList";
import { Users } from "../../models/Users";
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
//予約一覧ページ　予約済みフラグ(reserved)が true のみ表示　※管理者のみこのページへの遷移が可能
export default function ReservesAll() {
  const [reserves, setReserves] = useState<FreeList[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  const [err, setErr] = useState<boolean>(false);
  const [rsvDate, setRsvDate] = useState("");
  const [teacher, setTeacher] = useState("");
  const [student, setStudent] = useState("");
  const [rsvId, setRsvId] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [sortTeacher, setSortTeacher] = useState<string>("");
  const [sortStudent, setSortStudent] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleOpen3 = () => setOpen3(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);
  const db = getFirestore();
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
  const day = new Date();
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  let xxx7 = new Date(y, m, d + 7, 12, 0, 0);
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**========
     * Firebaseからシフトを取得（予約済み）
     *========*/
    async function loadReserves() {
      const q = query(
        collection(db, "FreeSpace"),
        where("reserved", "==", true),
        where("date", ">=", timestamp(xxx)),
        where("date", "<=", timestamp(xxx7)),
        orderBy("date", "asc"),
        orderBy("time", "asc")
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setErr(true);
      }
      //ReserveList一覧の展開
      const gotReserves = snapshot.docs.map((doc) => {
        const reserve = doc.data() as FreeList;
        reserve.id = doc.id;
        return reserve;
      });
      setReserves(gotReserves);
    }
    async function loadUsers() {
      const q = query(
        collection(db, "users"),
        where("role", "==", "teacher"),
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
    loadReserves();
    loadUsers();
  }, [process, browser, user]);
  /**=======
   * 並び替え
   *=======*/
  //リセット
  const sortReset = async () => {
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", true),
      where("date", ">=", timestamp(xxx)),
      where("date", "<=", timestamp(xxx7)),
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
    setReserves(gotReservers);
  };
  //入力された生徒名 & 週目と曜日と時間で並び替え
  const filterStudent = async () => {
    setErr(false);
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", true),
      where("date", ">=", timestamp(xxx)),
      where("date", "<=", timestamp(xxx7)),
      where("student", "==", sortStudent),
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
    setReserves(gotReservers);
  };
  /**=======
   * キャンセル処理
   *======*/
  const deleteRsv = async (e: any) => {
    e.stopPropagation();
    await updateDoc(doc(db, "FreeSpace", rsvId), {
      reserved: false,
      student: "",
      reserverUid: "",
    }).then(async () => {
      handleClose2();
      toast.success("キャンセルしました", {
        position: "bottom-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const q = query(
        collection(db, "FreeSpace"),
        where("reserved", "==", true),
        where("date", ">=", timestamp(xxx)),
        where("date", "<=", timestamp(xxx7)),
        where("student", "==", sortStudent),
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
      setReserves(gotReservers);
    });
  };
  return (
    <React.Fragment>
      <Table size="small" sx={{ mt: 5 }}>
        <TableHead style={{ backgroundColor: "#FFFFDD" }}>
          <TableRow>
            <TableCell style={{ fontWeight: 600 }}>
              <Box>
                講師名
                <IconButton onClick={handleOpen}>
                  <FilterListIcon />
                </IconButton>
                <IconButton onClick={sortReset}>
                  <RestartAltIcon />
                </IconButton>
              </Box>
              {/* モーダル */}
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
                    <Box display="flex" justifyContent="center">
                      <TextField
                        sx={{ width: "80%", height: 30, mb: 5 }}
                        margin="normal"
                        required
                        id="sortTeacher"
                        label="講師名で絞り込み"
                        name="sortTeacher"
                        autoComplete="sortTeacher"
                        autoFocus
                        onChange={(e) => setSortTeacher(e.target.value)}
                      />
                      <IconButton
                        onClick={async () => {
                          setOpen(true);
                          const db = getFirestore();
                          const q = query(
                            collection(db, "users"),
                            where("role", "==", "teacher"),
                            orderBy("userName"),
                            startAt(sortTeacher),
                            endAt(sortTeacher + "\uf8ff")
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
                        <Box>
                          <SearchIcon fontSize="large" />
                        </Box>
                      </IconButton>
                    </Box>
                    <Table size="small" sx={{ margin: "auto" }}>
                      <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                        <TableRow>
                          <TableCell width="50%" sx={{ textAlign: "center" }}>
                            講師名
                          </TableCell>
                          <TableCell width="20%" sx={{ textAlign: "center" }} />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell width="50%" sx={{ textAlign: "center" }}>
                              <Box display="flex">
                                <Box
                                  component="img"
                                  sx={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: "50%",
                                  }}
                                  alt={user.userName}
                                  src={user.url}
                                />
                                <Box
                                  sx={{
                                    textAlign: "center",
                                    my: "auto",
                                    ml: 1,
                                    fontSize: "13px",
                                  }}
                                >
                                  {user.userName}
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell width="50%" sx={{ textAlign: "center" }}>
                              <Button
                                variant="contained"
                                sx={{ bgcolor: teal[500] }}
                                onClick={async () => {
                                  const db = getFirestore();
                                  const q = query(
                                    collection(db, "FreeSpace"),
                                    where("reserved", "==", true),
                                    where("date", ">=", timestamp(xxx)),
                                    where("date", "<=", timestamp(xxx7)),
                                    where("teacher", "==", user.userName),
                                    orderBy("date", "asc"),
                                    orderBy("time", "asc")
                                  );
                                  const snapshot = await getDocs(q);
                                  const gotReservers = snapshot.docs.map(
                                    (doc) => {
                                      const reserve = doc.data() as FreeList;
                                      reserve.id = doc.id;
                                      return reserve;
                                    }
                                  );
                                  handleClose();
                                  setReserves(gotReservers);
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
                </Box>
              </Modal>
              {/* ここまでモーダル */}
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              <Box>
                生徒名
                <IconButton onClick={handleOpen3}>
                  <FilterListIcon />
                </IconButton>
                <IconButton onClick={sortReset}>
                  <RestartAltIcon />
                </IconButton>
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
                    <Box textAlign="center">
                      <TextField
                        margin="normal"
                        required
                        id="sortTeacher"
                        label="生徒名で絞り込み"
                        name="sortStudent"
                        autoComplete="sortStudent"
                        autoFocus
                        onChange={(e) => setSortStudent(e.target.value)}
                      />
                      <Button
                        type="submit"
                        onClick={() => {
                          filterStudent(), handleClose3();
                        }}
                        variant="contained"
                        sx={{ mt: 3, mb: 2, ml: 3 }}
                      >
                        決定
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </Box>
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              <Box>予約日時</Box>
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reserves.map((rsv) => (
            <TableRow key={rsv.id}>
              <TableCell>{rsv.teacher}</TableCell>
              <TableCell>{rsv.student}</TableCell>
              <TableCell>
                {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
              </TableCell>
              <TableCell>
                {`${rsv.time}:00`}
                <Tooltip title="キャンセル・変更" arrow>
                  <IconButton
                    onClick={() => {
                      handleOpen();
                      setRsvId(rsv.id);
                      setStudent(rsv.student);
                      setTeacher(rsv.teacher);
                      setRsvDate(
                        `${dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")} ${
                          rsv.time
                        }:00~`
                      );
                    }}
                  >
                    <EditIcon sx={{ color: "teal", ml: 3 }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* モーダル　予約内容詳細 */}
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
                handleClose2();
              }}
            >
              閉じる
            </Button>
          </Box>
        </Box>
      </Modal>
      {err == true && (
        <Grid xs={12} sm={15}>
          <Alert
            variant="filled"
            severity="info"
            sx={{ m: 3, textAlign: "center" }}
          >
            予約は見つかりませんでした
          </Alert>
        </Grid>
      )}
      <ToastContainer />
    </React.Fragment>
  );
}
