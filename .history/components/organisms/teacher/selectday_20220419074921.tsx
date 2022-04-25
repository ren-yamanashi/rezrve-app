import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ToastContainer } from "react-toastify";
//import my File
import DateRangePicker from "../../atoms/Date/Date ";
import Loading from "../../atoms/loading/loadingComponent";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import CreateShiftModal from "../../templates/Modal/CreateShift";
import RsvModal from "../../templates/Modal/RsvModal";
import TableCellComponent from "../../atoms/TableCell/TableCell";
import TableCellComponent2 from "../../atoms/TableCell/TableCell2";
import TableCellComponent3 from "../../atoms/TableCell/TableCell3";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
import GetRsv_OK_Cancel from "../../atoms/andMore.../GetRsv_OKCancel2";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useHandle } from "../../../hooks/useHandle";
import { useSchedule } from "../../../hooks/firebase/teacher/useReserves";
import {
  useUserList,
  useSearchStudent,
} from "../../../hooks/firebase/user/useUserList";
import { useGetReserves } from "../../../hooks/firebase/teacher/useGetReserves";
import { useCreateShift } from "../../../hooks/firebase/teacher/useCreateShift";
import { useDeleteShift } from "../../../hooks/firebase/teacher/useDeleteRsv";
import { useSelectStudent } from "../../../hooks/useSelectStudent";
import { useDate } from "../../../hooks/date/useDate";
import { useReserves_Today } from "../../../hooks/firebase/teacher/useReserves";
import { useEventTime } from "../../../hooks/useEventTime";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
const SelectDayAll = () => {
  const { user } = useAuth();
  const {
    loadScheduleAll,
    error10,
    rsv10,
    error11,
    rsv11,
    error12,
    rsv12,
    error13,
    rsv13,
    error14,
    rsv14,
    error15,
    rsv15,
    error16,
    rsv16,
    error17,
    rsv17,
    error18,
    rsv18,
  } = useSchedule();
  const reserveArr = [
    { rsv: rsv10, error: error10, number: 10 },
    { rsv: rsv11, error: error11, number: 11 },
    { rsv: rsv12, error: error12, number: 12 },
    { rsv: rsv13, error: error13, number: 13 },
    { rsv: rsv14, error: error14, number: 14 },
    { rsv: rsv15, error: error15, number: 15 },
    { rsv: rsv16, error: error16, number: 16 },
    { rsv: rsv17, error: error17, number: 17 },
    { rsv: rsv18, error: error18, number: 18 },
  ];
  const { rsvData, selectReserve, selectRsv, selectStudent, handleChange } =
    useSelectReserve();
  const { loadRsv } = useReserves_Today();
  const { usersList } = useUserList();
  const { timeArr } = useEventTime();
  const { chancelRsv } = useDeleteShift();
  const { handleOpen, handleClose2, handleOpen3, handleOpen4, handleClose4 } =
    useHandle();
  const { loadSearchStudent } = useSearchStudent();
  const { loadGetReserves } = useGetReserves();
  const { createShift } = useCreateShift();
  const { studentName, studentNum } = useSelectStudent();
  const { dateValue, newDateTime, chgDate } = useDate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    if (loading == false) {
      return;
    }
    loadScheduleAll(newDateTime).then(() =>
      setTimeout(() => setLoading(false), 500)
    );
  }, [process.browser, user, loading]);
  return (
    <>
      <React.Fragment>
        {loading == true ? (
          <Loading />
        ) : (
          <>
            <DateRangePicker
              value={dateValue}
              changeDate={(newValue) => loadScheduleAll(chgDate(newValue))}
            />
            <GetRsv_OK_Cancel />
            <Table size="small" sx={{ my: 2 }}>
              <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                <TableRow>
                  {timeArr.map((item) => (
                    <>
                      <TableCell
                        style={{ fontWeight: 600 }}
                      >{`${item}:00`}</TableCell>
                    </>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={reserveArr.length}>
                  {reserveArr.map((index) => (
                    <>
                      {index.error == true && (
                        <TableCellComponent click={handleOpen3} />
                      )}
                      {index.rsv &&
                        index.rsv.map((value) =>
                          value.student !== "" ? (
                            <TableCellComponent2
                              teacher={value.teacher}
                              student={value.student}
                              date={value.date}
                              time={value.time}
                              id={value.id}
                              click={() => {
                                handleOpen4();
                                selectReserve(index.rsv.map((value) => value));
                              }}
                            />
                          ) : (
                            // 予約登録
                            <TableCellComponent3
                              date={value.date}
                              time={value.time}
                              id={value.id}
                              click={() => {
                                handleOpen();
                                selectRsv(value);
                              }}
                            />
                          )
                        )}
                    </>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </>
        )}
        <CreateShiftModal
          teacher={user && user.displayName}
          time={rsvData.time}
          changeSelect={handleChange}
          createShift={(e) =>
            createShift(e, user && user.displayName, rsvData.time)
          }
        />
        {/* 予約登録確認　*/}
        <GetRsvModal
          date={rsvData.date}
          teacher={user && user.displayName}
          student={studentName}
          clickEv={async (e) => {
            try {
              await loadGetReserves(
                e,
                newDateTime,
                rsvData.rsvTime,
                studentName,
                rsvData.id,
                studentNum,
                handleClose2()
              );
            } catch {
              handleClose2();
            } finally {
              loadScheduleAll(newDateTime);
              loadRsv();
            }
          }}
        />
        {/* 生徒検索 */}
        <SearchStudentModal
          changeEvent={(e) => selectStudent(e)}
          searchStudent={() => {
            loadSearchStudent(rsvData.student);
          }}
          users={usersList && usersList}
        />
        {/* 予約内容詳細 */}
        <RsvModal
          date={rsvData.date}
          teacher={user && user.displayName}
          student={rsvData.rsvStudent}
          chancelRsv={(e) => chancelRsv(e, rsvData.id, handleClose4())}
        />
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default SelectDayAll;
