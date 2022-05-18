import * as React from "react";
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
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
import GetRsv_OK_Cancel from "../../atoms/andMore.../GetRsv_OKCancel2";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useGetReserves } from "../../../hooks/firebase/manager/useReserves";
import { useCreateShift } from "../../../hooks/firebase/manager/useCreateShift";
import { useChancelRsv } from "../../../hooks/firebase/manager/useReserves";
import { useDate } from "../../../hooks/date/useDate";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useSelectUser_query } from "../../../hooks/firebase/user/useUserList";
import { useSchedule } from "../../../hooks/firebase/teacher/useSchedule";
import { useLoading } from "../../../hooks/useLoading";
import { useHandle } from "../../../hooks/useHandle";
import { timeProps } from "../../../models/timeProps";
import { reserveProps } from "../../../models/reserveProps";
import { userProps } from "../../../models/userProps";

const SelectDayAll: React.FC<{
  times: timeProps;
  user: userProps;
  reserves_all: reserveProps[];
}> = ({ times, user, reserves_all }) => {
  // const { user } = useAuth();
  const { user_query } = useSelectUser_query();
  const { loadScheduleAll, rsvArr } = useSchedule();
  const { startLoading, completeLoading, loading } = useLoading();
  const { chancelRsv } = useChancelRsv();
  const { getReserves } = useGetReserves();
  const { createShift } = useCreateShift();
  const { dateValue, newDateTime, chgDate } = useDate();
  const {
    rsvData,
    selectRsv,
    selectStudent,
    setEmail,
    handleChangeTime,
    setPhoneNumber,
  } = useSelectReserve();
  const {
    open,
    handleOpen1,
    handleOpen2,
    handleOpen3,
    handleOpen4,
    handleClose1,
    handleClose2,
    handleClose3,
    handleClose4,
  } = useHandle();
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
  const options = [];
  times[0].number.map((time) => [
    options.push({ value: time, label: `${time}:00` }),
  ]);
  reserves_all.map((item) => {
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
              changeDate={(newValue) => chgDate(newValue)}
            />
            <GetRsv_OK_Cancel />
            <Table size="small" sx={{ my: 2 }}>
              <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: 600 }}>スタッフ名</TableCell>
                  {times[0].number.map((time) => (
                    <>
                      <TableCell
                        style={{ fontWeight: 600 }}
                      >{`${time}:00`}</TableCell>
                    </>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={rsvArr.length}>
                  <TableCell>{user.userName}</TableCell>
                  {rsvArr.map((index) => (
                    <>
                      {index.error == true && (
                        <TableCellComponent click={handleOpen1} />
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
                                handleOpen2();
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
        {/* シフト登録 */}
        <CreateShiftModal
          open={open.open1}
          handleClose={handleClose1}
          staffName={user_query?.userName}
          time={rsvData.time}
          changeSelect={handleChangeTime}
          createShift={(e) => {
            createShift(
              e,
              user_query?.userName,
              rsvData.time,
              user_query?.id,
              user_query.companyId
            );
            handleClose1();
          }}
        />
        {/* 予約登録確認　*/}
        <GetRsvModal
          open={open.open3}
          handleClose={handleClose3}
          date={rsvData.date}
          teacher={user && user.userName}
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
              "講師登録",
              user_query?.companyId,
              user?.id
            )
          }
        />
        {/* 予約者入力 */}
        <SearchStudentModal
          open={open.open2}
          handleClose={handleClose2}
          loadOpen={() => handleOpen3()}
          changeEvent={(e) => selectStudent(e)}
          changeEmail={(e) => setEmail(e)}
          changePhoneNumber={(e) => setPhoneNumber(e)}
        />
        {/* 予約内容詳細 */}
        <RsvModal
          open={open.open4}
          handleClose={handleClose4}
          date={rsvData.date}
          teacher={user && user.userName}
          student={rsvData.rsvStudent}
          email={rsvData.email}
          phoneNumber={rsvData.phoneNumber}
          reserver={rsvData.reserver}
          chancelRsv={(e) => {
            chancelRsv(e, rsvData.id);
            handleClose4();
          }}
        />
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default SelectDayAll;
