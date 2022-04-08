import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ToastContainer } from "react-toastify";
//内部インポート
import Title from "../../atoms/Title";
import DateRangePicker from "../../atoms/Date/Date ";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import CreateShiftModal from "../../templates/Modal/CreateShift";
import RsvModal from "../../templates/Modal/RsvModal";
import TableCellComponent from "../../atoms/TableCell/TableCell";
import TableCellComponent2 from "../../atoms/TableCell/TableCell2";
import TableCellComponent3 from "../../atoms/TableCell/TableCell3";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
import { useAuth } from "../../../hooks/useUserAuth";
import { useSchedule } from "../../../hooks/teacher/reserves/useReserves";
import { useHandle } from "../../../hooks/handle/useHandle";
import { useUserList, useSearchStudent } from "../../../hooks/user/useUserList";
import { useGetReserves } from "../../../hooks/teacher/getReserves/useGetReserves";
import { useCreateShift } from "../../../hooks/teacher/createShift/useCreateShift";
import { useDeleteShift } from "../../../hooks/teacher/deleteReserves/useDeleteRsv";
import { useSelectStudent } from "../../../hooks/teacher/getReserves/useSelectStudent";
import { useDate } from "../../../hooks/date/useDate";
export default function SelectDayAll() {
  const { user } = useAuth();
  const {
    loadSchedule,
    rsv,
    loadSchedule10,
    rsv10,
    error10,
    loadSchedule11,
    rsv11,
    error11,
    loadSchedule12,
    rsv12,
    error12,
    loadSchedule13,
    rsv13,
    error13,
    loadSchedule14,
    rsv14,
    error14,
    loadSchedule15,
    rsv15,
    error15,
    loadSchedule16,
    rsv16,
    error16,
    loadSchedule17,
    rsv17,
    error17,
    loadSchedule18,
    rsv18,
    error18,
  } = useSchedule();
  const { usersList } = useUserList();
  const { chancelRsv } = useDeleteShift();
  const { handleOpen, handleClose2, handleOpen3, handleOpen4, handleClose4 } =
    useHandle();
  const { loadSearchStudent } = useSearchStudent();
  const { loadGetReserves } = useGetReserves();
  const { createShift } = useCreateShift();
  const { studentName, studentNum } = useSelectStudent();
  const { changeDateValue, dateValue } = useDate();
  const [rsvDate, setRsvDate] = useState("");
  const [student, setStudent] = useState("");
  const [student2, setStudent2] = useState("");
  const [rsvNum, setRsvNum] = useState("");
  const [rsvTime, setRsvTime] = useState<number>();
  const [time, setTime] = React.useState<number | string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };
  const day = new Date(dateValue);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let newDate = new Date(y, m, d, 12, 0, 0);
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
  return (
    <>
      <React.Fragment>
        <Box>
          <Title>予約スケジュール</Title>
        </Box>
        <Box
          ml={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <DateRangePicker
            value={value}
            changeDate={async (newValue) => {
              //onChangeに直接記述しないとうまく動作しない（setValue と　value に1回分のずれが生じる）
              changeDateValue(newValue);
              const day3 = new Date(newValue);
              const y3 = day3.getFullYear();
              const m3 = day3.getMonth();
              const d3 = day3.getDate();
              let newDate = new Date(y3, m3, d3, 12, 0, 0);
              loadSchedule(newDate);
              loadSchedule10(newDate),
                loadSchedule11(newDate),
                loadSchedule12(newDate),
                loadSchedule13(newDate),
                loadSchedule14(newDate),
                loadSchedule15(newDate);
              loadSchedule16(newDate);
              loadSchedule17(newDate);
              loadSchedule18(newDate);
            }}
          />
        </Box>
        <Table size="small" sx={{ my: 3 }}>
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
              {/* シフトがない場合はエラーを返している　→ エラーだったらシフトを申請できる */}
              {error10 == true && (
                <TableCellComponent
                  click={() => {
                    handleOpen3();
                    setTime(10);
                  }}
                />
              )}
              {/* 予約済み or 未予約　を判定させて、返り値を変動させる */}
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
        {/* シフト登録確認画面　*/}
        <CreateShiftModal
          teacher={user && user.displayName}
          time={time}
          changeSelect={handleChange}
          createShift={(e) =>
            createShift(e, user && user.displayName, time, newDate)
          }
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
                timestamp(newDate),
                rsvTime,
                studentName,
                rsvNum,
                studentNum,
                handleClose2()
              );
            } catch {
              handleClose2();
            } finally {
              loadSchedule(newDate);
              loadSchedule10(newDate);
              loadSchedule11(newDate);
              loadSchedule12(newDate);
              loadSchedule13(newDate);
              loadSchedule14(newDate);
              loadSchedule15(newDate);
              loadSchedule16(newDate);
              loadSchedule17(newDate);
              loadSchedule18(newDate);
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
          teacher={user && user.displayName} //直す
          student={student2}
          chancelRsv={(e) => chancelRsv(e, rsvNum, handleClose4())}
        />
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
