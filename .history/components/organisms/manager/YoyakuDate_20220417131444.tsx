import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { teal } from "@mui/material/colors";
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
import { useSelectStudent } from "../../../hooks/useSelectStudent";
import { useGetReserves } from "../../../hooks/firebase/manager/useReserves";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
import { useReserves_Today } from "../../../hooks/firebase/manager/useReserves";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { db } from "../../../hooks/firebase/useFirebase";
// Create Media
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1090,
    xl: 1200,
  },
});

const YoyakuManager = () => {
  console.log("日付で絞り込み（管理者）");
  const { rsvData, selectRsv, selectStudent } = useSelectReserve();
  const { handleOpen } = useHandle();
  const { loadRsv } = useReserves_Today();
  const { dateValue, newDateTime, chgDate } = useDate();
  const { studentName } = useSelectStudent();
  const { getReserves } = useGetReserves();
  const { freeSpaces, error } = useShiftList_today();
  const { loadFreeSpace_newValue } = useShiftList_newDate();
  const { studentsList, loadSearchStudentsList } = useStudentsList();
  const deleteRsv = async (item) => {
    try {
      deleteDoc(doc(db, "FreeSpace", item.id));
    } catch (error) {
      console.log(error);
    } finally {
      loadFreeSpace_newValue(newDateTime).then(() => {
        loadRsv();
      });
    }
  };
  return (
    <>
      <React.Fragment>
        <DateRangePicker
          value={dateValue}
          changeDate={(newValue) => chgDate(newValue, 2)}
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
                            selectRsv(freeList);
                            handleOpen();
                          }}
                          buttonText={"予約"}
                        />
                      </Tooltip>
                      <MediaContextProvider>
                        <Media greaterThan="md">
                          <Tooltip title={"シフトを閉じる"} arrow>
                            <IconButton
                              onClick={async () => deleteRsv(freeList)}
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
        {error && error == true && (
          <AlertComponent>
            予約可能なレッスンは見つかりませんでした
          </AlertComponent>
        )}
        <GetRsvModal
          date={rsvData.date}
          teacher={rsvData.teacher}
          student={studentName}
          clickEv={(e) =>
            getReserves(
              e,
              newDateTime,
              rsvData.rsvTime,
              studentName,
              rsvData.id
            )
          }
        />
        <SearchStudentModal
          changeEvent={(e) => selectStudent(e)}
          searchStudent={() => loadSearchStudentsList(rsvData.student)}
          users={studentsList && studentsList}
        />
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default YoyakuManager;
