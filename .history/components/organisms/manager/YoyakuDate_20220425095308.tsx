import dayjs from "dayjs";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
// import my File
import { useShiftList_newDate } from "../../../hooks/firebase/manager/useShift";
import { useDate } from "../../../hooks/date/useDate";
import { useHandle } from "../../../hooks/useHandle";
import DateRangePicker from "../../atoms/Date/Date ";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import Loading from "../../atoms/loading/loadingComponent";
import AlertComponent from "../../atoms/Alert/Alert";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import { useGetReserves } from "../../../hooks/firebase/manager/useReserves";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useLoading } from "../../../hooks/useLoading";
import { useSelectUser_query } from "../../../hooks/firebase/user/useUserList";

// 日付で絞り込み
const YoyakuManager = () => {
  const { handleOpen } = useHandle();
  const { user_query, loadUser_query } = useSelectUser_query();
  const { user } = useAuth();
  const { rsvData, selectRsv, selectStudent, setEmail, setPhoneNumber } =
    useSelectReserve();
  const { dateValue, newDateTime, chgDate } = useDate();
  const { getReserves } = useGetReserves();
  const { startLoading, completeLoading, loading } = useLoading();
  const { loadShift, freeSpaces, error } = useShiftList_newDate();
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    startLoading;
    loadUser_query(user?.uid);
    loadShift(newDateTime, user_query?.companyId).then(() => {
      setTimeout(() => completeLoading(), 500);
    });
  }, [process.browser, user]);
  return (
    <>
      <React.Fragment>
        {loading == true ? (
          <Loading />
        ) : (
          <>
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
                        <Box ml={3}>{freeList.staff}</Box>
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
                          <Tooltip title={`予約する:${freeList.staff}`} arrow>
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
              <AlertComponent>
                受付可能な予約は見つかりませんでした
              </AlertComponent>
            )}
          </>
        )}
        <GetRsvModal
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
              "管理者登録"
            )
          }
        />
        <SearchStudentModal
          changeEvent={(e) => selectStudent(e)}
          changeEmail={(e) => setEmail(e)}
          changePhoneNumber={(e) => setPhoneNumber(e)}
        />
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default YoyakuManager;
