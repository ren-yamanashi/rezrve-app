import dayjs from "dayjs";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
// import my File
import { useStudentsList } from "../../../hooks/firebase/user/useUserList";
import {
  useShiftList_newDate,
  useShiftList_today,
} from "../../../hooks/firebase/manager/useShift";
import { useDate } from "../../../hooks/date/useDate";
import { useHandle } from "../../../hooks/useHandle";
import DateRangePicker from "../../atoms/Date/Date ";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import AlertComponent from "../../atoms/Alert/Alert";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import { useGetReserves } from "../../../hooks/firebase/manager/useReserves";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
import { useSelectReserve } from "../../../hooks/useSelectReserve";

// 日付で絞り込み
const YoyakuManager = () => {
  const { handleOpen } = useHandle();
  const { rsvData, selectRsv, selectStudent } = useSelectReserve();
  const { dateValue, newDateTime, chgDate } = useDate();
  const { getReserves } = useGetReserves();
  const { freeSpaces, error } = useShiftList_today();
  const { loadShift } = useShiftList_newDate();
  return (
    <>
      <React.Fragment>
        <DateRangePicker
          value={dateValue}
          changeDate={(newValue) => loadShift(chgDate(newValue))}
        />
        <Table size="small">
          <TableHead style={{ backgroundColor: "#FFFFDD" }}>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>
                <Box ml={3}>担当者名</Box>
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
                            selectRsv(freeList);
                            handleOpen();
                          }}
                          buttonText={"予約"}
                        />
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {error && error == true && (
          <AlertComponent>受付可能な予約は見つかりませんでした</AlertComponent>
        )}
        <GetRsvModal
          date={rsvData.date}
          teacher={rsvData.teacher}
          student={rsvData.student}
          clickEv={(e) =>
            getReserves(
              e,
              newDateTime,
              rsvData.rsvTime,
              rsvData.student,
              rsvData.id
            )
          }
        />
        <SearchStudentModal changeEvent={(e) => selectStudent(e)} />
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default YoyakuManager;
