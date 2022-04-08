import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  deleteDoc,
  getDocs,
  startAt,
  endAt,
  doc,
  limit,
  Timestamp,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import dayjs from "dayjs";
import { blue, teal, grey } from "@mui/material/colors";
import { browser } from "process";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
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
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
import SearchIcon from "@mui/icons-material/Search";
import { ja } from "date-fns/locale";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { useGetReserves } from "../../hooks/teacher/getReserves/useGetReserves";
import { useUserList } from "../../hooks/user/useUserList";
import { Users } from "../../models/Users";
import {
  useFreeSpace_Today,
  useFreeSpace_newValue,
} from "../../hooks/teacher/reserves/useFreeSpace";
import Modals from "../atoms/Modal";
import DeleteButton from "../atoms/Button/DeleteButton";
import AlertComponent from "../atoms/Alert";
import TitleComponent from "../atoms/Text/Title";
import PrimaryBtn from "../atoms/Button/PrimaryButton";
import FieldTx from "../atoms/Text/TextField";
import GetRsvModal from "../templates/Modal/GetReserveModal";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});
//日付をTimeStamp型にして返す
const timestamp = (datetimeStr: any) => {
  return Timestamp.fromDate(new Date(datetimeStr));
};
export default function FreeSpace() {
  const db = getFirestore();
  const { freeSpaces, loadFreeSpace, err } = useFreeSpace_Today();
  const { loadFreeSpace_newValue, error } = useFreeSpace_newValue();
  const { usersList, loadUsers } = useUserList();
  const { loadGetReserves } = useGetReserves();
  const [users, setUsers] = useState<Users[]>([]);
  const { user } = useAuth();
  const [open, setOpen] = useState(false); //予約登録確認モーダル用
  const [open2, setOpen2] = useState(false); //生徒検索モーダル用
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [value, setValue] = useState<Date | null>(new Date());
  const [student, setStudent] = useState("");
  const [studentId, setStudentId] = useState("");
  const [rsvDate, setRsvDate] = useState("");
  const [rsvTime, setRsvTime] = useState<number>();
  const [rsvId, setRsvId] = useState("");
  const day = new Date(value);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let date = new Date(y, m, d, 12, 0, 0);
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    loadUsers();
    loadFreeSpace();
  }, [process, browser, user]);
  return (
    <>
      <React.Fragment>
        <MediaContextProvider>
          <Box m={3} display="flex" alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
              <DatePicker
                label="日付を選択"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                  const day = new Date(newValue);
                  const y = day.getFullYear();
                  const m = day.getMonth();
                  const d = day.getDate();
                  let date = new Date(y, m, d, 12, 0, 0);
                  loadFreeSpace_newValue(date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          {/* Res PC */}
          <Media greaterThan="sm">
            <Table size="small">
              <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: 600 }}>
                    <Box ml={3}>講師名</Box>
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
                        <Tooltip title={`予約する:${freeList.teacher}`} arrow>
                          <PrimaryBtn
                            click={() => {
                              handleOpen2();
                              setRsvTime(freeList.time);
                              setRsvId(freeList.id);
                              setRsvDate(
                                `${dayjs(freeList.date.toDate()).format(
                                  "YYYY/MM/DD "
                                )} ${freeList.time}:00~`
                              );
                            }}
                            title={"登録"}
                            style={{ mt: 2.5, mb: 2, ml: 1 }}
                          />
                        </Tooltip>
                        <Tooltip title="シフトを閉じる" arrow>
                          <IconButton
                            onClick={async () => {
                              try {
                                await deleteDoc(
                                  doc(db, "FreeSpace", freeList.id)
                                );
                              } catch (error) {
                                console.log(error);
                              }
                              loadFreeSpace_newValue(date);
                            }}
                          >
                            <DeleteButton />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Media>
          {/* Res Phone */}
          <Media at="sm">
            <Box width="100%">
              <Table size="small">
                <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                  <TableRow>
                    <TableCell style={{ fontWeight: 600, fontSize: "13px" }}>
                      <Box ml={3}>日付</Box>
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, fontSize: "13px" }}>
                      <Box ml={3}>時間</Box>
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, fontSize: "13px" }} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {freeSpaces &&
                    freeSpaces.map((freeList) => (
                      <TableRow key={freeList.id}>
                        <TableCell sx={{ fontSize: "13px" }}>
                          <Box ml={3}>
                            {dayjs(freeList.date.toDate()).format(
                              "YYYY/MM/DD "
                            )}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          <Box ml={3}>{`${freeList.time}:00`}</Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          <Tooltip title={`予約する:${freeList.teacher}`} arrow>
                            <PrimaryBtn
                              style={{
                                mt: 2.5,
                                mb: 2,
                                ml: 1,
                                fontSize: "10px",
                              }}
                              click={() => {
                                handleOpen2();
                                setRsvTime(freeList.time);
                                setRsvId(freeList.id);
                                setRsvDate(
                                  `${dayjs(freeList.date.toDate()).format(
                                    "YYYY/MM/DD "
                                  )} ${freeList.time}:00~`
                                );
                              }}
                              title={"登録"}
                            />
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Media>
          {err && err == true ? (
            <AlertComponent>
              予約可能なレッスンが見つかりませんでした
            </AlertComponent>
          ) : (
            error &&
            error == true && (
              <AlertComponent>
                予約可能なレッスンが見つかりませんでした
              </AlertComponent>
            )
          )}
          {/* 予約登録確認　モーダル作成 */}
          <GetRsvModal
            open={open}
            close={handleClose}
            date={rsvDate}
            teacher={user && user.displayName}
            student={student}
            clickEv={async (e) => {
              try {
                await loadGetReserves(
                  e,
                  timestamp(date),
                  rsvTime,
                  student,
                  rsvId,
                  studentId,
                  handleClose()
                );
              } catch (error) {
                handleClose();
              } finally {
                loadFreeSpace_newValue(date);
              }
            }}
          />
          {/* 生徒検索 */}
          <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Modals>
              <TitleComponent>予約者を選択してください</TitleComponent>
              <Box display="flex">
                <FieldTx
                  style={{ mb: 3 }}
                  label="生徒名を入力"
                  changeEv={(e) => setStudent(e.target.value)}
                />
                <IconButton
                  onClick={async () => {
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
                  {usersList &&
                    usersList.map((user) => (
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
                          <PrimaryBtn
                            style={{ bgcolor: teal[500], fontSize: 12 }}
                            click={() => {
                              setStudent(user.userName);
                              setStudentId(user.id);
                              handleClose2();
                              handleOpen();
                            }}
                            title={"選択"}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Modals>
          </Modal>
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
