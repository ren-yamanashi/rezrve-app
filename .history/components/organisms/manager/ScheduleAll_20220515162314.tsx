import * as React from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { blue } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
// import my File
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useDate } from "../../../hooks/date/useDate";
import { useCreateShift } from "../../../hooks/firebase/manager/useCreateShift";
import { useGetReserves } from "../../../hooks/firebase/manager/useReserves";
import { useChancelRsv } from "../../../hooks/firebase/manager/useReserves";
import { useLoading } from "../../../hooks/useLoading";
import { useSelectUser_query } from "../../../hooks/firebase/user/useUserList";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useHandle } from "../../../hooks/useHandle";
import { reserveProps } from "../../../models/reserveProps";
import { userProps } from "../../../models/userProps";
import { timeProps } from "../../../models/timeProps";
import DateRangePicker from "../../atoms/Date/Date ";
import CreateShiftModal from "../../templates/Modal/CreateShift_manager";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
import RsvModal from "../../templates/Modal/RsvModal";
import TableCellComponent8 from "../../atoms/TableCell/TableCell8";
import GetRsv_OK_Cancel from "../../atoms/andMore.../GetRsv_OK_Cancel3";
import Loading from "../../atoms/loading/loadingComponent";
import AlertComponent from "../../atoms/Alert/Alert";

// スケジュール確認
const ScheduleAll: React.FC<{
  reserves: reserveProps[];
  staffs: userProps[];
  times: timeProps;
}> = ({ reserves, staffs, times }) => {
  const { user } = useAuth();
  const { user_query } = useSelectUser_query();
  const { loading } = useLoading();
  const { chgDate, newDateTime, dateValue } = useDate();
  const { createShift } = useCreateShift();
  const { chancelRsv } = useChancelRsv();
  const { getReserves } = useGetReserves();
  const {
    selectRsv,
    selectTeacher,
    setPhoneNumber,
    selectStudent,
    rsvData,
    handleChangeTime,
    setEmail,
  } = useSelectReserve();
  const {
    handleOpen1,
    handleOpen2,
    handleOpen3,
    handleOpen4,
    handleClose1,
    handleClose2,
    handleClose3,
    handleClose4,
    open,
  } = useHandle();
  // ローディング関数
  const rsv1 = [];
  const rsv2 = [];
  const rsv3 = [];
  const rsv4 = [];
  const rsv5 = [];
  const rsv6 = [];
  const rsv7 = [];
  const rsv8 = [];
  const rsv9 = [];
  const rsv10 = [];
  const rsv11 = [];
  const rsv12 = [];
  const rsv13 = [];
  const rsv14 = [];
  const rsv15 = [];
  const rsv16 = [];
  const rsv17 = [];
  const rsv18 = [];
  const rsv19 = [];
  const rsv20 = [];
  const rsv21 = [];
  const rsv22 = [];
  const rsv23 = [];
  const rsv24 = [];
  const arr = [];
  reserves.map((item) => {
    item.time == 1
      ? rsv1.push(item)
      : item.time == 2
      ? rsv2.push(item)
      : item.time == 3
      ? rsv3.push(item)
      : item.time == 4
      ? rsv4.push(item)
      : item.time == 5
      ? rsv5.push(item)
      : item.time == 6
      ? rsv6.push(item)
      : item.time == 7
      ? rsv7.push(item)
      : item.time == 8
      ? rsv8.push(item)
      : item.time == 9
      ? rsv9.push(item)
      : item.time == 10
      ? rsv10.push(item)
      : item.time == 11
      ? rsv11.push(item)
      : item.time == 12
      ? rsv12.push(item)
      : item.time == 13
      ? rsv13.push(item)
      : item.time == 14
      ? rsv14.push(item)
      : item.time == 15
      ? rsv15.push(item)
      : item.time == 16
      ? rsv16.push(item)
      : item.time == 17
      ? rsv17.push(item)
      : item.time == 18
      ? rsv18.push(item)
      : item.time == 19
      ? rsv19.push(item)
      : item.time == 20
      ? rsv20.push(item)
      : item.time == 21
      ? rsv21.push(item)
      : item.time == 22
      ? rsv22.push(item)
      : item.time == 23
      ? rsv23.push(item)
      : item.time == 24 && rsv24.push(item);
  });
  times[0].number.map((time) => {
    arr.push(
      time == 1
        ? rsv1
        : time == 2
        ? rsv2
        : time == 3
        ? rsv3
        : time == 4
        ? rsv4
        : time == 5
        ? rsv5
        : time == 6
        ? rsv6
        : time == 7
        ? rsv7
        : time == 8
        ? rsv8
        : time == 9
        ? rsv9
        : time == 10
        ? rsv10
        : time == 11
        ? rsv11
        : time == 12
        ? rsv12
        : time == 13
        ? rsv13
        : time == 14
        ? rsv14
        : time == 15
        ? rsv15
        : time == 16
        ? rsv16
        : time == 17
        ? rsv17
        : time == 18
        ? rsv18
        : time == 19
        ? rsv19
        : time == 20
        ? rsv20
        : time == 21
        ? rsv21
        : time == 22
        ? rsv22
        : time == 23
        ? rsv23
        : time == 24 && rsv24
    );
  });
  return (
    <>
      <React.Fragment>
        {loading == true ? (
          <Loading />
        ) : (
          <>
            <DateRangePicker
              value={dateValue}
              changeDate={(newValue) => {
                chgDate(newValue);
              }}
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
                    <TableCell style={{ fontWeight: 600 }}>
                      {"担当者名"}
                    </TableCell>
                    {times[0].number.map((time) => (
                      <>
                        <TableCell style={{ fontWeight: 600, width: "8%" }}>
                          {`${time}:00`}
                        </TableCell>
                      </>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!staffs || staffs.length == 0 ? (
                    <AlertComponent>スタッフを追加してください</AlertComponent>
                  ) : (
                    staffs.map((uu) => (
                      <TableRow key={uu.id}>
                        <Box overflow="scroll">
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
                                src={uu.staffImageUrl}
                              />
                              <Box
                                sx={{
                                  textAlign: "center",
                                  my: "auto",
                                  ml: 1,
                                  width: 120,
                                  fontSize: "13px",
                                }}
                              >
                                {uu.userName}
                              </Box>
                            </Box>
                            <ListItem
                              key="editUser"
                              onClick={() => {
                                handleOpen1();
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
                        </Box>
                        {arr.map((rsv) => (
                          <>
                            <TableCellComponent8
                              rsv={rsv && rsv}
                              teacherName={uu.userName}
                              clickEvent={() => {
                                rsv &&
                                  rsv.map((item) => {
                                    uu.userName == item.staff &&
                                      (selectRsv(item),
                                      item.reserved === true
                                        ? handleOpen4()
                                        : handleOpen2());
                                  });
                              }}
                            />
                          </>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Box>
          </>
        )}
        {/* モーダル */}
        <CreateShiftModal
          open={open.open1}
          handleClose={handleClose1}
          staffName={rsvData.teacherName}
          time={rsvData.time}
          changeSelect={handleChangeTime}
          createShift={(e) => {
            createShift(
              e,
              rsvData.teacherName,
              rsvData.time,
              rsvData.teacherId,
              user_query?.companyId
            );
            handleClose1();
          }}
        />
        <GetRsvModal
          open={open.open3}
          handleClose={handleClose3}
          date={rsvData.date}
          teacher={rsvData.teacher}
          student={rsvData.student}
          email={rsvData.email}
          phoneNumber={rsvData.phoneNumber}
          clickEv={(e) =>
            getReserves(
              e,
              newDateTime,
              rsvData.rsvTime,
              rsvData.student,
              rsvData.id,
              rsvData.email,
              rsvData.phoneNumber,
              "管理者登録",
              user_query?.companyId,
              user?.uid
            )
          }
        />
        <SearchStudentModal
          changeEvent={(e) => selectStudent(e)}
          changeEmail={(e) => setEmail(e)}
          changePhoneNumber={(e) => setPhoneNumber(e)}
          open={open.open2}
          handleClose={handleClose2}
          loadOpen={() => handleOpen3()}
        />
        <RsvModal
          open={open.open4}
          handleClose={handleClose4}
          date={rsvData.date}
          teacher={rsvData.teacher}
          student={rsvData.rsvStudent}
          email={rsvData.email}
          phoneNumber={rsvData.phoneNumber}
          reserver={rsvData.reserver}
          chancelRsv={(e) => {
            console.log(rsvData.id);
            handleClose4();
          }}
        />
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default ScheduleAll;
