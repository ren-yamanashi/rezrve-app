import dayjs from "dayjs";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
// import my File
import { useDate } from "../../../hooks/date/useDate";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useLoading } from "../../../hooks/useLoading";
import { useHandle } from "../../../hooks/useHandle";
import { usePrismaReserve } from "../../../hooks/prisma/useReserve";
import { reserveProps } from "../../../models/reserveProps";
import { format } from "date-fns";
import DateRangePicker from "../../atoms/Date/Date ";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import Loading from "../../atoms/loading/loadingComponent";
import AlertComponent from "../../atoms/Alert/Alert";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";

// 予約登録　（日付で絞り込み）
const RsvDate_Manager: React.FC<{ reserve: reserveProps[] }> = ({
  reserve,
}) => {
  const { open, handleOpen1, handleOpen2, handleClose1, handleClose2 } =
    useHandle();
  const { updateReserve } = usePrismaReserve();
  const { dateValue, newDateTime, chgDate } = useDate();
  const { loading } = useLoading();
  const { rsvData, selectRsv, selectStudent, setEmail, setPhoneNumber } =
    useSelectReserve();
  const data = {
    id: rsvData.id,
    reserver: rsvData.student,
    email: rsvData.email,
    phoneNumber: rsvData.phoneNumber,
    reserverUid: "管理者登録",
  };
  console.log(format(new Date(reserve[0].date), "yyyy-MM-dd"));
  console.log(format(newDateTime, "yyyy-MM-dd"));
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
                {!reserve || reserve.length == 0 ? (
                  <AlertComponent>
                    受付可能な予約は見つかりませんでした
                  </AlertComponent>
                ) : (
                  reserve.map((rsv) => (
                    <>
                      {format(newDateTime, "yyyy-MM-dd") ==
                      format(new Date(rsv.date), "yyyy-MM-dd") ? (
                        <>
                          <TableRow key={rsv.id}>
                            <TableCell>
                              <Box ml={3}>{rsv.staff}</Box>
                            </TableCell>
                            <TableCell>
                              <Box ml={3}>
                                {dayjs(rsv.date).format("YYYY/MM/DD")}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box ml={3}>{`${rsv.time}:00`}</Box>
                            </TableCell>
                            <TableCell>
                              <Box display="flex">
                                <Tooltip title={`予約する:${rsv.staff}`} arrow>
                                  <PrimaryBtn
                                    style={{ mt: 3, mb: 2, ml: 3 }}
                                    click={() => {
                                      selectRsv(rsv);
                                      handleOpen1();
                                    }}
                                    buttonText={"予約"}
                                  />
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <AlertComponent>
                          受付可能な予約は見つかりませんでした
                        </AlertComponent>
                      )}
                    </>
                  ))
                )}
              </TableBody>
            </Table>
          </>
        )}
        <GetRsvModal
          open={open.open2}
          handleClose={handleClose2}
          date={rsvData.date}
          teacher={rsvData.teacher}
          student={rsvData.student}
          email={rsvData.email}
          phoneNumber={rsvData.phoneNumber}
          clickEv={() => {
            updateReserve(data.id, data);
          }}
        />
        <SearchStudentModal
          open={open.open1}
          handleClose={handleClose1}
          loadOpen={() => handleOpen2()}
          changeEvent={(e) => selectStudent(e)}
          changeEmail={(e) => setEmail(e)}
          changePhoneNumber={(e) => setPhoneNumber(e)}
        />
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default RsvDate_Manager;
