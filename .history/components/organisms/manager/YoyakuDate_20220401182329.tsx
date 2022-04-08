import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import { blue, teal, grey } from "@mui/material/colors";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
// import my File
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
import { useGetReserves } from "../../../hooks/manager/useReserves";
import { useSearchStudentsList } from "../../../hooks/user/useUserList";
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

export default function YoyakuManager() {
  console.log("日付で絞り込み（管理者）");
  const { handleOpen2, handleOpen, handleClose } = useHandle();
  const { changeDateValue, dateValue, newDateTime } = useDate();
  const { studentName, studentNum } = useSelectStudent();
  const { getReserves } = useGetReserves();
  const { freeSpaces, error } = useShiftList_today();
  const { loadFreeSpace_newValue } = useShiftList_newDate();
  const { loadSearchStudentsList } = useSearchStudentsList();
  const { studentsList } = useStudentsList();
  const [users2, setUsers2] = useState<Users[]>([]); //生徒用
  const [rsvDate, setRsvDate] = useState("");
  const [rsvNum, setRsvNum] = useState("");
  const [rsvTime, setRsvTime] = useState<number>();
  const [student, setStudent] = useState("");
  const [teacher, setTeacher] = useState("");
  const [err2, setErr2] = useState<boolean>(false);
  const [err3, setErr3] = useState<boolean>(false);
  const db = getFirestore();
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
          student={studentName}
          clickEv={(e) =>
            getReserves(e, newDateTime, rsvTime, studentName, rsvNum)
          }
        />
        {/* モーダル 生徒名検索用　*/}
        <SearchStudentModal
          changeEvent={(e) => setStudent(e.target.value)}
          searchStudent={loadSearchStudentsList(student)}
          users={studentsList && studentsList}
        />
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
