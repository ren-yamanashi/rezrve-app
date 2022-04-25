import React, { useEffect, useState } from "react";
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
import CreateShiftModal from "../../templates/Modal/CreateShift_manager";
import RsvModal from "../../templates/Modal/RsvModal";
import TableCellComponent from "../../atoms/TableCell/TableCell";
import TableCellComponent2 from "../../atoms/TableCell/TableCell2";
import TableCellComponent3 from "../../atoms/TableCell/TableCell3";
import GetRsv_OK_Cancel from "../../atoms/andMore.../GetRsv_OKCancel2";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useHandle } from "../../../hooks/useHandle";
import { useGetReserves } from "../../../hooks/firebase/teacher/useGetReserves";
import { useCreateShift } from "../../../hooks/firebase/manager/useCreateShift";
import { useDeleteShift } from "../../../hooks/firebase/teacher/useDeleteRsv";
import { useSelectStudent } from "../../../hooks/useSelectStudent";
import { useDate } from "../../../hooks/date/useDate";
import { useReserves_Today } from "../../../hooks/firebase/teacher/useReserves";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useSelectUser_query } from "../../../hooks/firebase/user/useUserList";
import { useSchedule } from "../../../hooks/firebase/teacher/useSchedule";

const SelectDayAll = () => {
  const { user } = useAuth();
  const { loadUser_query, user_query } = useSelectUser_query();
  const { loadScheduleAll, rsvArr } = useSchedule();
  const {
    rsvData,
    selectRsv,
    selectStudent,
    handleChange,
    setEmail,
    handleChangeTime,
  } = useSelectReserve();
  const { loadRsv } = useReserves_Today();
  const { chancelRsv } = useDeleteShift();
  const { handleOpen, handleClose2, handleOpen3, handleOpen4, handleClose4 } =
    useHandle();
  const { loadGetReserves } = useGetReserves();
  const { createShift } = useCreateShift();
  const { studentNum } = useSelectStudent();
  const { dateValue, newDateTime, chgDate } = useDate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    loadUser_query(user?.uid);
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
                  {user_query?.times.map((item) => (
                    <>
                      <TableCell
                        style={{ fontWeight: 600 }}
                      >{`${item}:00`}</TableCell>
                    </>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={rsvArr.length}>
                  {rsvArr.map((index) => (
                    <>
                      {index.error == true && (
                        <TableCellComponent click={handleOpen3} />
                      )}
                      {index.rsv &&
                        index.rsv.map((value) =>
                          value.person !== "" ? (
                            <TableCellComponent2
                              teacher={value.staff}
                              student={value.person}
                              date={value.date}
                              time={value.time}
                              id={value.id}
                              click={() => {
                                handleOpen4();
                                selectRsv(value);
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
          staffName={user_query?.userName}
          time={rsvData.time}
          changeSelect={handleChangeTime}
          createShift={(e) => {
            createShift(
              e,
              user_query?.userName,
              rsvData.time,
              console.log("シフト登録"),
              user_query?.id
            ).then(() => loadScheduleAll(newDateTime));
          }}
        />
        {/* 予約登録確認　*/}
        <GetRsvModal
          date={rsvData.date}
          teacher={user && user.displayName}
          student={rsvData.student}
          email={rsvData.email}
          clickEv={async (e) => {
            try {
              await loadGetReserves(
                e,
                newDateTime,
                rsvData.rsvTime,
                rsvData.student,
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
        {/* 予約内容詳細 */}
        <RsvModal
          date={rsvData.date}
          teacher={user && user.displayName}
          student={rsvData.rsvStudent}
          chancelRsv={(e) =>
            chancelRsv(e, rsvData.id, handleClose4()).then(() =>
              loadScheduleAll(newDateTime)
            )
          }
        />
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default SelectDayAll;
