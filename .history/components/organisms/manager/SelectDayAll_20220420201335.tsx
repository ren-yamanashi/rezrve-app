import { ToastContainer } from "react-toastify";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { blue } from "@mui/material/colors";
import { useSchedule } from "../../../hooks/firebase/manager/useReserves";
import {
  useTeacherList,
  useBusinessHours,
} from "../../../hooks/firebase/user/useUserList";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useSelectStore } from "../../../hooks/firebase/user/useSelectStore";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useDate } from "../../../hooks/date/useDate";
import { useHandle } from "../../../hooks/useHandle";
import { useCreateShift } from "../../../hooks/firebase/manager/useCreateShift";
import { useGetReserves } from "../../../hooks/firebase/manager/useReserves";
import { useChancelRsv } from "../../../hooks/firebase/manager/useReserves";
import { useLoading } from "../../../hooks/useLoading";
import { useEventTime } from "../../../hooks/useEventTime";
import DateRangePicker from "../../atoms/Date/Date ";
import CreateShiftModal from "../../templates/Modal/CreateShift_manager";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
import RsvModal from "../../templates/Modal/RsvModal";
import TableCellComponent8 from "../../atoms/TableCell/TableCell8";
import GetRsv_OK_Cancel from "../../atoms/andMore.../GetRsv_OK_Cancel3";
import Loading from "../../atoms/loading/loadingComponent";
// 当日スケジュール確認
const SelectDayAll = () => {
  const { user } = useAuth();
  const { selectStore, store } = useSelectStore();
  const { startLoading, completeLoading, loading } = useLoading();
  const { timeArr } = useEventTime();
  const { chgDate, newDateTime, dateValue } = useDate();
  const { handleOpen3, handleOpen, handleOpen4, handleClose4 } = useHandle();
  const { createShift } = useCreateShift();
  const { chancelRsv } = useChancelRsv();
  const { usersList } = useTeacherList();
  const { getReserves } = useGetReserves();
  const { loadScheduleAll, rsvArr } = useSchedule();
  const {
    selectRsv,
    selectTeacher,
    handleChange,
    selectStudent,
    rsvData,
    setEmail,
  } = useSelectReserve();

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
    startLoading;
    loadScheduleAll(newDateTime).then(() => {
      setTimeout(() => completeLoading(), 500);
      console.log(user?.uid);
      selectStore(user?.uid);
    });
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
            <Box overflow="scroll">
              <Table
                size="small"
                sx={{ my: 3, border: "2px", minWidth: "1000px" }}
              >
                <TableHead
                  style={{ backgroundColor: "#FFFFDD", border: "3px" }}
                >
                  <TableRow>
                    <TableCell style={{ fontWeight: 600, width: "100px" }}>
                      担当者名
                    </TableCell>
                    {timeArr.map((time) => (
                      <>
                        <TableCell style={{ fontWeight: 600, width: "8%" }}>
                          {`${time}:00`}
                        </TableCell>
                      </>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersList &&
                    usersList.map((uu) => (
                      <TableRow key={uu.id}>
                        <TableCell style={{ fontWeight: 600, width: 300 }}>
                          <Box display="flex">
                            <Box
                              component="img"
                              sx={{
                                height: 40,
                                width: 40,
                                borderRadius: "50%",
                              }}
                              alt={uu.userName}
                              src={uu.url}
                            />
                            <Box
                              sx={{
                                textAlign: "center",
                                my: "auto",
                                ml: 1,
                                fontSize: "13px",
                              }}
                            >
                              {uu.userName}
                            </Box>
                          </Box>
                          <ListItem
                            key="editUser"
                            onClick={() => {
                              handleOpen3();
                              selectTeacher(uu);
                            }}
                            sx={{ cursor: "pointer" }}
                          >
                            <PersonAddAltIcon
                              sx={{ color: blue[500], mr: 2 }}
                            />
                            <Box sx={{ color: blue[500], fontSize: "13px" }}>
                              シフトを登録
                            </Box>
                          </ListItem>
                        </TableCell>
                        {rsvArr.map((rsv) => (
                          <>
                            <TableCellComponent8
                              rsv={rsv && rsv}
                              teacherName={uu.userName}
                              clickEvent={() => {
                                rsv &&
                                  rsv.map((item) => {
                                    uu.userName == item.teacher &&
                                      (selectRsv(item),
                                      item.student !== ""
                                        ? handleOpen4()
                                        : handleOpen());
                                  });
                              }}
                            />
                          </>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </>
        )}
        <CreateShiftModal
          teacher={rsvData.teacherName}
          time={rsvData.time}
          changeSelect={handleChange}
          createShift={(e) =>
            createShift(
              e,
              rsvData.teacherName,
              rsvData.time,
              1,
              rsvData.teacherId
            )
          }
        />
        <GetRsvModal
          date={rsvData.date}
          teacher={rsvData.teacher}
          student={rsvData.student}
          email={rsvData.email}
          clickEv={(e) => {
            getReserves(
              e,
              newDateTime,
              rsvData.rsvTime,
              rsvData.student,
              rsvData.id
            ).then(() => {
              loadScheduleAll(newDateTime);
            });
          }}
        />
        <SearchStudentModal
          changeEvent={(e) => selectStudent(e)}
          changeEmail={(e) => setEmail(e)}
        />
        <RsvModal
          date={rsvData.date}
          teacher={rsvData.teacher}
          student={rsvData.rsvStudent}
          email={rsvData.email}
          chancelRsv={(e) => {
            chancelRsv(e, rsvData.id, loadScheduleAll(newDateTime));
            handleClose4();
          }}
        />
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default SelectDayAll;
