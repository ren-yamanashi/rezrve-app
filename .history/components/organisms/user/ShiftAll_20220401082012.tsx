import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  Timestamp,
  startAt,
  endAt,
  deleteDoc,
  doc,
  limit,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
//内部インポート
import {
  useFreeSpace_Today,
  useFreeSpace_newValue,
} from "../../../hooks/manager/shift/useShift";
import { useTeacherList } from "../../../hooks/user/useUserList";
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import { teal } from "@mui/material/colors";
import { Users } from "../../../models/Users";
import { ja } from "date-fns/locale";
import { useDate } from "../../../hooks/date/useDate";
import DateRangePicker from "../../atoms/Date/Date ";

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

//予約一覧ページ　予約済みフラグ(reserved)が true のみ表示
//シフト提出者IDとユーザーIDが一致する予約のみ表示
export default function ShiftsAll() {
  console.log("シフト一覧　（管理者）");
  const db = getFirestore();
  const { changeDateValue, dateValue, newDateTime } = useDate();
  const { freeSpaces, loadFreeSpace } = useFreeSpace_Today();
  const { loadFreeSpace_newValue } = useFreeSpace_newValue();
  const { usersList } = useTeacherList();
  const [reserves, setReserves] = useState<FreeList[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const { user } = useAuth();
  const initialDate = new Date();
  const [err, setErr] = useState(false);
  const [value, setValue] = useState(initialDate);
  const [sortTeacher, setSortTeacher] = useState<string>("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const day = new Date();
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  const day2 = new Date(value);
  const y2 = day2.getFullYear();
  const m2 = day2.getMonth();
  const d2 = day2.getDate();
  let xxx2 = new Date(y2, m2, d2, 12, 0, 0);
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };

  /**========
   * シフト削除
   *========*/
  const deleteShift = async (id: string, e: any) => {
    const q = query(
      collection(db, "FreeSpace"),
      where("date", "==", timestamp(xxx2)),
      orderBy("time", "asc")
    );
    e.stopPropagation();
    await deleteDoc(doc(db, "FreeSpace", id));
    const snapshot = await getDocs(q);
    const gotShift = snapshot.docs.map((doc) => {
      const shift = doc.data() as FreeList;
      shift.id = doc.id;
      return shift;
    });
    setReserves(gotShift);
  };
  return (
    <React.Fragment>
      <>
        <Box ml={3}>
          <Title>提出シフト一覧</Title>
          <DateRangePicker
            value={dateValue}
            changeDate={(newValue) => {
              changeDateValue(newValue);
              const day = new Date(newValue);
              const y = day.getFullYear();
              const m = day.getMonth();
              const d = day.getDate();
              let newDate = new Date(y, m, d, 12, 0, 0);
              loadFreeSpace_newValue(newDate);
            }}
          />
        </Box>
        <Table size="small">
          <TableHead style={{ backgroundColor: "#FFFFDD" }}>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>
                <Box>
                  講師名
                  <IconButton onClick={handleOpen}>
                    <FilterListIcon />
                  </IconButton>
                  <IconButton onClick={loadFreeSpace}>
                    <RestartAltIcon />
                  </IconButton>
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
                              <TableCell
                                width="50%"
                                sx={{ textAlign: "center" }}
                              >
                                講師名
                              </TableCell>
                              <TableCell
                                width="20%"
                                sx={{ textAlign: "center" }}
                              />
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {usersList &&
                              usersList.map((user) => (
                                <TableRow key={user.id}>
                                  <TableCell
                                    width="50%"
                                    sx={{ textAlign: "center" }}
                                  >
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
                                  <TableCell
                                    width="50%"
                                    sx={{ textAlign: "center" }}
                                  >
                                    <Button
                                      variant="contained"
                                      sx={{ bgcolor: teal[500] }}
                                      onClick={async () => {
                                        const q = query(
                                          collection(db, "FreeSpace"),
                                          where("date", "==", timestamp(xxx2)),
                                          where("teacher", "==", user.userName),
                                          orderBy("time", "asc")
                                        );
                                        const snapshot = await getDocs(q);
                                        const gotReservers = snapshot.docs.map(
                                          (doc) => {
                                            const reserve =
                                              doc.data() as FreeList;
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
                </Box>
              </TableCell>
              <TableCell style={{ fontWeight: 600 }}>
                <Box>日時</Box>
              </TableCell>
              <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
              <TableCell style={{ fontWeight: 600 }}>状態</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {freeSpaces &&
              freeSpaces.map((rsv) => (
                <TableRow key={rsv.id}>
                  <TableCell>{rsv.teacher}</TableCell>
                  <TableCell>
                    {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" height={35}>
                      {`${rsv.time}:00`}
                      {rsv.reserved == false && (
                        <Tooltip title="シフトを閉じる" arrow>
                          <IconButton onClick={(e) => deleteShift(rsv.id, e)}>
                            <DeleteIcon
                              sx={{
                                fontSize: 30,
                                color: teal[500],
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {rsv.student == "" ? "未予約" : "予約済み"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {err == true && (
          <Grid xs={12} sm={15}>
            <Alert
              variant="filled"
              severity="info"
              sx={{ m: 3, textAlign: "center" }}
            >
              提出済みのシフトはありません
            </Alert>
          </Grid>
        )}
      </>
    </React.Fragment>
  );
}
