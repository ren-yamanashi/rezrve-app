import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  Timestamp,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
  limit,
  startAt,
  endAt,
} from "firebase/firestore";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import { browser } from "process";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { blue, teal, grey } from "@mui/material/colors";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { createMedia } from "@artsy/fresnel";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { styled } from "@mui/material/styles";
import { ja } from "date-fns/locale";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import { Users } from "../../../models/Users";
import { useTeacherList } from "../../../hooks/user/useUserList";
import { useStudentsList } from "../../../hooks/user/useUserList";
import {
  useShiftList_newDate,
  useShiftList_today,
} from "../../../hooks/manager/shift/useShift";
import { useDate } from "../../../hooks/date/useDate";
import { useHandle } from "../../../hooks/handle/useHandle";
import DateRangePicker from "../../atoms/Date/Date ";
import SelectTeacherModal from "../../templates/Modal/SelectTeacherModal";
//MediaQuery設定
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1090,
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

//提出済み全シフト一覧ページ　※このページから予約登録画面に遷移できる
//予約済みフラグ(reserved)が false のみ抽出　※displayNameに「管理者」が入っている場合のみこのページに遷移可能
export default function YoyakuManager() {
  const { usersList } = useTeacherList();
  const { handleOpen7 } = useHandle();
  const { changeDateValue, dateValue, newDateTime } = useDate();
  const { freeSpaces, error } = useShiftList_today();
  const { loadFreeSpace_newValue } = useShiftList_newDate();
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [sortTeacher, setSortTeacher] = useState<string>("");
  const { studentsList } = useStudentsList();
  const [users, setUsers] = useState<Users[]>([]); //講師用
  const [users2, setUsers2] = useState<Users[]>([]); //生徒用

  const [open, setOpen] = useState(false); //講師フィルター用
  const [open2, setOpen2] = useState(false); //生徒名選択用
  const [open3, setOpen3] = useState(false); //予約登録確認用
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const [rsvDate, setRsvDate] = useState("");
  const [rsvNum, setRsvNum] = useState("");
  const [rsvTime, setRsvTime] = useState<number>();
  const [userNum, setUserNum] = useState("");
  const [student, setStudent] = useState("");
  const [teacher, setTeacher] = useState("");
  const [err, setErr] = useState<boolean>(false);
  const [err2, setErr2] = useState<boolean>(false);
  const [err3, setErr3] = useState<boolean>(false);
  const db = getFirestore();
  const initialDate = new Date();
  const [value, setValue] = useState(initialDate);
  const day = new Date(value);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
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
      }).then(async () => {
        handleClose3();
        toast.success("予約を登録しました", {
          position: "bottom-left",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        loadFreeSpace_newValue(xxx);
      });
    } else {
      setErr3(true);
      return;
    }
  };
  return (
    <>
      <React.Fragment>
        <DateRangePicker
          value={dateValue}
          changeDate={(newValue) => {
            changeDateValue(newValue);
            const day = new Date(newValue);
            const y = day.getFullYear();
            const m = day.getMonth();
            const d = day.getDate();
            let date = new Date(y, m, d, 12, 0, 0);
            loadFreeSpace_newValue(date);
          }}
        />

        <Table size="small">
          <TableHead style={{ backgroundColor: "#FFFFDD" }}>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>
                <Box ml={3}>
                  講師名
                  <IconButton onClick={handleOpen7}>
                    <FilterListIcon />
                  </IconButton>
                  <IconButton onClick={() => loadFreeSpace_newValue(xxx)}>
                    <RestartAltIcon />
                  </IconButton>
                </Box>
                {/* モーダル */}
                {/* <SelectTeacherModal users={usersList && usersList} /> */}
              </TableCell>
              <TableCell style={{ fontWeight: 600 }}>
                <Box ml={3}>日付</Box>
              </TableCell>
              <TableCell style={{ fontWeight: 600 }}>
                <Box ml={3}>時間</Box>
              </TableCell>
              <TableCell style={{ fontWeight: 600 }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {freeSpaces &&
              freeSpaces.map((freeList) => (
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
                    <Box ml={3}>{`${freeList.time}:00`}</Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex">
                      <Tooltip title={`予約する:${freeList.teacher}`} arrow>
                        <Button
                          variant="contained"
                          sx={{ mt: 3, mb: 2, ml: 3 }}
                          onClick={() => {
                            setRsvNum(freeList.id);
                            setTeacher(freeList.teacher);
                            setRsvDate(
                              `${dayjs(freeList.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${freeList.time}:00~`
                            );
                            setRsvTime(freeList.time);
                            handleOpen2();
                          }}
                        >
                          予約
                        </Button>
                      </Tooltip>
                      <MediaContextProvider>
                        <Media greaterThan="md">
                          <Tooltip
                            title={
                              err2 == true
                                ? "もう一度クリックしてください"
                                : "シフトを閉じる"
                            }
                            arrow
                          >
                            <IconButton
                              onClick={async () => {
                                const db = getFirestore();
                                setErr2(false);
                                try {
                                  deleteDoc(doc(db, "FreeSpace", freeList.id));
                                } catch {
                                  setErr2(true);
                                } finally {
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
                                  const gotShift = snapshot.docs.map((doc) => {
                                    const shift = doc.data() as FreeList;
                                    shift.id = doc.id;
                                    return shift;
                                  });
                                  setFreeLists(gotShift);
                                }
                              }}
                            >
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
                        </Media>
                      </MediaContextProvider>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* エラー表示 */}
        {err == true && (
          <Grid xs={12} sm={15}>
            <Alert
              variant="filled"
              severity="info"
              sx={{ m: 3, textAlign: "center" }}
            >
              予約可能なレッスンは見つかりませんでした
            </Alert>
          </Grid>
        )}
        {/* 予約登録確認　モーダル作成 */}
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
                onClick={handleClose3}
              >
                キャンセル
              </Button>
            </Box>
            {err3 == true && (
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
        {/* モーダル 生徒名検索用　*/}
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
                  setErr3(false);
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
                {studentsList &&
                  studentsList.map((user) => (
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
                            setErr3(false);
                            setStudent(user.userName);
                            setUserNum(user.id);
                            handleClose2();
                            handleOpen3();
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
