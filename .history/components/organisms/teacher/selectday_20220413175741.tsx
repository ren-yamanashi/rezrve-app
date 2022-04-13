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
import { useSchedule } from "../../../hooks/firebase/teacher/reserves/useReserves";
import {
  useUserList,
  useSearchStudent,
} from "../../../hooks/firebase/user/useUserList";
import { useGetReserves } from "../../../hooks/firebase/teacher/getReserves/useGetReserves";
import { useCreateShift } from "../../../hooks/firebase/teacher/createShift/useCreateShift";
import { useDeleteShift } from "../../../hooks/firebase/teacher/deleteReserves/useDeleteRsv";
import { useSelectStudent } from "../../../hooks/useSelectStudent";
import { useDate } from "../../../hooks/date/useDate";
import { useReserves_Today } from "../../../hooks/firebase/teacher/reserves/useReserves";
const SelectDayAll = () => {
  const { user } = useAuth();
  const {
    loadScheduleAll,
    rsv,
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
  const { loadRsv } = useReserves_Today();
  const { usersList } = useUserList();
  const { chancelRsv } = useDeleteShift();
  const { handleOpen, handleClose2, handleOpen3, handleOpen4, handleClose4 } =
    useHandle();
  const { loadSearchStudent } = useSearchStudent();
  const { loadGetReserves } = useGetReserves();
  const { createShift } = useCreateShift();
  const { studentName, studentNum } = useSelectStudent();
  const { changeDateValue, dateValue, newDateTime } = useDate();
  const [rsvDate, setRsvDate] = useState("");
  const [student, setStudent] = useState("");
  const [student2, setStudent2] = useState("");
  const [rsvNum, setRsvNum] = useState("");
  const [rsvTime, setRsvTime] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [time, setTime] = React.useState<number | string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };
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
              changeDate={async (newValue) => {
                //onChangeに直接記述しないとうまく動作しない（setValue と　value に1回分のずれが生じる）
                changeDateValue(newValue);
                const day3 = new Date(newValue);
                const y3 = day3.getFullYear();
                const m3 = day3.getMonth();
                const d3 = day3.getDate();
                let newDate = new Date(y3, m3, d3, 12, 0, 0);
                loadScheduleAll(newDate);
              }}
            />
            <GetRsv_OK_Cancel />
            <Table size="small" sx={{ my: 2 }}>
              <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: 600 }}>10:00</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>11:00</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>12:00</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>13:00</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>14:00</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>15:00</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>16:00</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>17:00</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>18:00</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={rsv.length}>
                  {error10 == true && (
                    <TableCellComponent
                      click={() => {
                        handleOpen3();
                        setTime(10);
                      }}
                    />
                  )}
                  {rsv10 &&
                    rsv10.map((value) =>
                      value.student !== "" ? (
                        <TableCellComponent2
                          teacher={value.teacher}
                          student={value.student}
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                          }}
                        />
                      ) : (
                        <TableCellComponent3
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        />
                      )
                    )}
                  {error11 && error11 == true && (
                    <TableCellComponent
                      click={() => {
                        handleOpen3();
                        setTime(11);
                      }}
                    />
                  )}
                  {rsv11 &&
                    rsv11.map((value) =>
                      value.student !== "" ? (
                        <TableCellComponent2
                          teacher={value.teacher}
                          student={value.student}
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                          }}
                        />
                      ) : (
                        <TableCellComponent3
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        />
                      )
                    )}
                  {error12 && error12 == true && (
                    <TableCellComponent
                      click={() => {
                        handleOpen3();
                        setTime(12);
                      }}
                    />
                  )}
                  {rsv12 &&
                    rsv12.map((value) =>
                      value.student !== "" ? (
                        <TableCellComponent2
                          teacher={value.teacher}
                          student={value.student}
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                          }}
                        />
                      ) : (
                        <TableCellComponent3
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        />
                      )
                    )}
                  {error13 && error13 == true && (
                    <TableCellComponent
                      click={() => {
                        handleOpen3();
                        setTime(13);
                      }}
                    />
                  )}
                  {rsv13 &&
                    rsv13.map((value) =>
                      value.student !== "" ? (
                        <TableCellComponent2
                          teacher={value.teacher}
                          student={value.student}
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                          }}
                        />
                      ) : (
                        <TableCellComponent3
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        />
                      )
                    )}
                  {error14 && error14 == true && (
                    <TableCellComponent
                      click={() => {
                        handleOpen3();
                        setTime(14);
                      }}
                    />
                  )}
                  {rsv14 &&
                    rsv14.map((value) =>
                      value.student !== "" ? (
                        <TableCellComponent2
                          teacher={value.teacher}
                          student={value.student}
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                          }}
                        />
                      ) : (
                        <TableCellComponent3
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        />
                      )
                    )}
                  {error15 && error15 == true && (
                    <TableCellComponent
                      click={() => {
                        handleOpen3();
                        setTime(15);
                      }}
                    />
                  )}
                  {rsv15 &&
                    rsv15.map((value) =>
                      value.student !== "" ? (
                        <TableCellComponent2
                          teacher={value.teacher}
                          student={value.student}
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                          }}
                        />
                      ) : (
                        <TableCellComponent3
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        />
                      )
                    )}
                  {error16 && error16 == true && (
                    <TableCellComponent
                      click={() => {
                        handleOpen3();
                        setTime(16);
                      }}
                    />
                  )}
                  {rsv16 &&
                    rsv16.map((value) =>
                      value.student !== "" ? (
                        <TableCellComponent2
                          teacher={value.teacher}
                          student={value.student}
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                          }}
                        />
                      ) : (
                        <TableCellComponent3
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        />
                      )
                    )}
                  {error17 && error17 == true && (
                    <TableCellComponent
                      click={() => {
                        handleOpen3();
                        setTime(17);
                      }}
                    />
                  )}
                  {rsv17 &&
                    rsv17.map((value) =>
                      value.student !== "" ? (
                        <TableCellComponent2
                          teacher={value.teacher}
                          student={value.student}
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                          }}
                        />
                      ) : (
                        <TableCellComponent3
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        />
                      )
                    )}
                  {error18 && error18 == true && (
                    <TableCellComponent
                      click={() => {
                        handleOpen3();
                        setTime(18);
                      }}
                    />
                  )}
                  {rsv18 &&
                    rsv18.map((value) =>
                      value.student !== "" ? (
                        <TableCellComponent2
                          teacher={value.teacher}
                          student={value.student}
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                          }}
                        />
                      ) : (
                        <TableCellComponent3
                          date={value.date}
                          time={value.time}
                          id={value.id}
                          click={() => {
                            handleOpen();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        />
                      )
                    )}
                </TableRow>
              </TableBody>
            </Table>
          </>
        )}
        <CreateShiftModal
          teacher={user && user.displayName}
          time={time}
          changeSelect={handleChange}
          createShift={(e) => createShift(e, user && user.displayName, time)}
        />
        {/* 予約登録確認　*/}
        <GetRsvModal
          date={rsvDate}
          teacher={user && user.displayName}
          student={studentName}
          clickEv={async (e) => {
            try {
              await loadGetReserves(
                e,
                newDateTime,
                rsvTime,
                studentName,
                rsvNum,
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
          changeEvent={(e) => setStudent(e.target.value)}
          searchStudent={() => {
            loadSearchStudent(student);
          }}
          users={usersList && usersList}
        />
        {/* 予約内容詳細 */}
        <RsvModal
          date={rsvDate}
          teacher={user && user.displayName}
          student={student2}
          chancelRsv={(e) => chancelRsv(e, rsvNum, handleClose4())}
        />
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default SelectDayAll;
