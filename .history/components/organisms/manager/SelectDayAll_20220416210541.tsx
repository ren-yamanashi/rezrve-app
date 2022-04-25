import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createMedia } from "@artsy/fresnel";
import { blue } from "@mui/material/colors";
import { useSchedule } from "../../../hooks/firebase/manager/useReserves";
import {
  useTeacherList,
  useStudentsList,
} from "../../../hooks/firebase/user/useUserList";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useDate } from "../../../hooks/date/useDate";
import { useHandle } from "../../../hooks/useHandle";
import { useCreateShift } from "../../../hooks/firebase/manager/useCreateShift";
import { useGetReserves } from "../../../hooks/firebase/manager/useReserves";
import { useChancelRsv } from "../../../hooks/firebase/manager/useReserves";
import { useSelectStudent } from "../../../hooks/useSelectStudent";
import DateRangePicker from "../../atoms/Date/Date ";
import CreateShiftModal from "../../templates/Modal/CreateShift_manager";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
import RsvModal from "../../templates/Modal/RsvModal";
import TableCellComponent8 from "../../atoms/TableCell/TableCell8";
import GetRsv_OK_Cancel from "../../atoms/andMore.../GetRsv_OK_Cancel3";
import Loading from "../../atoms/loading/loadingComponent";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1000,
    xl: 1220,
  },
});
type rsvObject = {
  student: string;
  rsvStudent: string;
  teacher: string;
  id: string;
  date: string;
  rsvTime: number;
  time: number | string;
  teacherId: string;
  teacherName: string;
};
const SelectDayAll = () => {
  console.log("スケジュール確認(管理者)");
  const { user } = useAuth();
  const { chgDate, newDateTime, dateValue } = useDate();
  const { studentName } = useSelectStudent();
  const { handleOpen3, handleOpen, handleOpen4, handleClose4 } = useHandle();
  const { createShift } = useCreateShift();
  const { chancelRsv } = useChancelRsv();
  const { usersList } = useTeacherList();
  const { studentsList, loadSearchStudentsList } = useStudentsList();
  const { getReserves } = useGetReserves();
  const {
    rsv10,
    rsv11,
    rsv12,
    rsv13,
    rsv14,
    rsv15,
    rsv16,
    rsv17,
    rsv18,
    loadScheduleAll,
  } = useSchedule();
  const [rsvData, setRsvData] = useState<rsvObject>({
    student: "",
    rsvStudent: "",
    teacher: "",
    id: "",
    date: "",
    rsvTime: null,
    time: "",
    teacherId: "",
    teacherName: "",
  });
  const [loading, setLoading] = useState(true);
  //　生徒検索に使用
  const handleChange = (event: SelectChangeEvent) => {
    setRsvData({ ...rsvData, time: event.target.value });
  };
  // シフト登録に使用
  const selectTeacher = (item) => {
    setRsvData({
      ...rsvData,
      teacherName: item.userName,
      teacherId: item.id,
    });
  };
  // 予約登録に使用
  const selectRsv = (item) => {
    setRsvData({
      ...rsvData,
      id: item.id,
      teacher: item.teacher,
      rsvStudent: item.student,
      rsvTime: item.time,
      date: `${dayjs(item.date.toDate()).format("YYYY/MM/DD ")} ${
        item.time
      }:00~`,
    });
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
              changeDate={(newValue) => chgDate(newValue)}
            />
            <GetRsv_OK_Cancel />
            <Box>
              <Table
                size="small"
                sx={{ my: 3, border: "2px", minWidth: "1000px" }}
              >
                <TableHead
                  style={{ backgroundColor: "#FFFFDD", border: "3px" }}
                >
                  <TableRow>
                    <TableCell style={{ fontWeight: 600, width: "20%" }}>
                      講師名
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, width: "8%" }}>
                      10:00
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, width: "8%" }}>
                      11:00
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, width: "8%" }}>
                      12:00
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, width: "8%" }}>
                      13:00
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, width: "8%" }}>
                      14:00
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, width: "8%" }}>
                      15:00
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, width: "8%" }}>
                      16:00
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, width: "8%" }}>
                      17:00
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, width: "8%" }}>
                      18:00
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersList &&
                    usersList.map((uu) => (
                      <TableRow key={uu.id}>
                        <TableCell style={{ fontWeight: 600 }}>
                          <MediaContextProvider>
                            <Box display="flex">
                              <Media greaterThan="lg">
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
                              </Media>
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
                            <Media greaterThan="lg">
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
                                <Box
                                  sx={{ color: blue[500], fontSize: "13px" }}
                                >
                                  シフトを登録
                                </Box>
                              </ListItem>
                            </Media>
                            <Media at="lg">
                              <Tooltip title="シフトを登録" arrow>
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
                                </ListItem>
                              </Tooltip>
                            </Media>
                          </MediaContextProvider>
                        </TableCell>
                        <TableCellComponent8
                          rsv={rsv10 && rsv10}
                          teacherName={uu.userName}
                          clickEvent={() => {
                            rsv10 &&
                              rsv10.map((item) => {
                                uu.userName == item.teacher &&
                                  (selectRsv(item),
                                  item.student !== ""
                                    ? handleOpen4()
                                    : handleOpen());
                              });
                          }}
                        />
                        <TableCellComponent8
                          rsv={rsv11 && rsv11}
                          teacherName={uu.userName}
                          clickEvent={() =>
                            rsv11 &&
                            rsv11.map((item) => {
                              uu.userName == item.teacher &&
                                (selectRsv(item),
                                item.student !== ""
                                  ? handleOpen4()
                                  : handleOpen());
                            })
                          }
                        />
                        <TableCellComponent8
                          rsv={rsv12 && rsv12}
                          teacherName={uu.userName}
                          clickEvent={() =>
                            rsv12 &&
                            rsv12.map((item) => {
                              uu.userName == item.teacher &&
                                (selectRsv(item),
                                item.student !== ""
                                  ? handleOpen4()
                                  : handleOpen());
                            })
                          }
                        />
                        <TableCellComponent8
                          rsv={rsv13 && rsv13}
                          teacherName={uu.userName}
                          clickEvent={() =>
                            rsv13 &&
                            rsv13.map((item) => {
                              uu.userName == item.teacher &&
                                (selectRsv(item),
                                item.student !== ""
                                  ? handleOpen4()
                                  : handleOpen());
                            })
                          }
                        />
                        <TableCellComponent8
                          rsv={rsv14 && rsv14}
                          teacherName={uu.userName}
                          clickEvent={() =>
                            rsv14 &&
                            rsv14.map((item) => {
                              uu.userName == item.teacher &&
                                (selectRsv(item),
                                item.student !== ""
                                  ? handleOpen4()
                                  : handleOpen());
                            })
                          }
                        />
                        <TableCellComponent8
                          rsv={rsv15 && rsv15}
                          teacherName={uu.userName}
                          clickEvent={() =>
                            rsv15 &&
                            rsv15.map((item) => {
                              uu.userName == item.teacher &&
                                (selectRsv(item),
                                item.student !== ""
                                  ? handleOpen4()
                                  : handleOpen());
                            })
                          }
                        />
                        <TableCellComponent8
                          rsv={rsv16 && rsv16}
                          teacherName={uu.userName}
                          clickEvent={() =>
                            rsv16 &&
                            rsv16.map((item) => {
                              uu.userName == item.teacher &&
                                (selectRsv(item),
                                item.student !== ""
                                  ? handleOpen4()
                                  : handleOpen());
                            })
                          }
                        />
                        <TableCellComponent8
                          rsv={rsv17 && rsv17}
                          teacherName={uu.userName}
                          clickEvent={() =>
                            rsv17 &&
                            rsv17.map((item) => {
                              uu.userName == item.teacher &&
                                (selectRsv(item),
                                item.student !== ""
                                  ? handleOpen4()
                                  : handleOpen());
                            })
                          }
                        />
                        <TableCellComponent8
                          rsv={rsv18 && rsv18}
                          teacherName={uu.userName}
                          clickEvent={() =>
                            rsv18 &&
                            rsv18.map((item) => {
                              uu.userName == item.teacher &&
                                (selectRsv(item),
                                item.student !== ""
                                  ? handleOpen4()
                                  : handleOpen());
                            })
                          }
                        />
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
          student={studentName}
          clickEv={(e) => {
            getReserves(
              e,
              newDateTime,
              rsvData.rsvTime,
              studentName,
              rsvData.id
            ).then(() => {
              loadScheduleAll(newDateTime);
            });
          }}
        />
        <SearchStudentModal
          changeEvent={(e) =>
            setRsvData({ ...rsvData, student: e.target.value })
          }
          searchStudent={() => loadSearchStudentsList(rsvData.student)}
          users={studentsList && studentsList}
        />
        <RsvModal
          date={rsvData.date}
          teacher={rsvData.teacher}
          student={rsvData.rsvStudent}
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
