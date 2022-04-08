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
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import { blue, teal, grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField } from "@mui/material";
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
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import AlertComponent from "../../atoms/Alert";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import { useSelectStudent } from "../../../hooks/teacher/getReserves/useSelectStudent";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
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
  const { handleOpen2, handleOpen, handleClose } = useHandle();
  const { changeDateValue, dateValue, newDateTime } = useDate();
  const { studentName, studentNum } = useSelectStudent();
  const { freeSpaces, error } = useShiftList_today();
  const { loadFreeSpace_newValue } = useShiftList_newDate();
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const { studentsList } = useStudentsList();
  const [users2, setUsers2] = useState<Users[]>([]); //生徒用
  const [open3, setOpen3] = useState(false); //予約登録確認用
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
      where("date", "==", timestamp(newDateTime)),
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
        loadFreeSpace_newValue(newDateTime);
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
                    <Box display="flex">
                      <Tooltip title={`予約する:${freeList.teacher}`} arrow>
                        <PrimaryBtn
                          style={{ mt: 3, mb: 2, ml: 3 }}
                          click={() => {
                            setRsvNum(freeList.id);
                            setTeacher(freeList.teacher);
                            setRsvDate(
                              `${dayjs(freeList.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${freeList.time}:00~`
                            );
                            setRsvTime(freeList.time);
                            handleOpen();
                          }}
                          buttonText={"予約"}
                        />
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
                                } catch (error) {
                                  console.log(error);
                                } finally {
                                  loadFreeSpace_newValue(newDateTime);
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
        {error && error == true && (
          <AlertComponent>
            予約可能なレッスンは見つかりませんでした
          </AlertComponent>
        )}
        {/* 予約登録確認　モーダル作成 */}
        <GetRsvModal
          date={rsvDate}
          teacher={teacher}
          student={student}
          clickEv={(e) => getRsv(e)}
        />
        {/* モーダル 生徒名検索用　*/}
        <SearchStudentModal
          changeEvent={(e) => setStudent(e.target.value)}
          searchStudent={async () => {
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
          users={studentsList && studentsList}
        />
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
