import * as React from "react";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
import { format } from "date-fns";
import {
  Box,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
// import my File
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useDate } from "../../../hooks/date/useDate";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useLoading } from "../../../hooks/useLoading";
import { useHandle } from "../../../hooks/useHandle";
import { reserveProps } from "../../../models/reserveProps";
import { usePrismaReserve } from "../../../hooks/prisma/useReserve";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
import AlertComponent from "../../atoms/Alert/Alert";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import DateRangePicker from "../../atoms/Date/Date ";
import Loading from "../../atoms/loading/loadingComponent";
// Create Media
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});
//　予約登録
const FreeSpace: React.FC<{ reserves_false: reserveProps[] }> = ({
  reserves_false,
}) => {
  const { loading } = useLoading();
  const { newDateTime, dateValue, chgDate } = useDate();
  const { updateReserve } = usePrismaReserve();
  const { user } = useAuth();
  const { selectRsv, rsvData, selectStudent, setEmail, setPhoneNumber } =
    useSelectReserve();
  const { open, handleOpen1, handleOpen2, handleClose1, handleClose2 } =
    useHandle();
  const data = {
    id: rsvData.id,
    reserver: rsvData.student,
    email: rsvData.email,
    phoneNumber: rsvData.phoneNumber,
    reserverUid: user?.uid,
  };
  const shiftArr = [];
  reserves_false.map((rsv) => {
    format(newDateTime, "yyyy-MM-dd") ==
      format(new Date(rsv.date), "yyyy-MM-dd") && shiftArr.push(rsv);
  });
  return (
    <>
      <React.Fragment>
        {loading == true ? (
          <Loading />
        ) : (
          <MediaContextProvider>
            <DateRangePicker
              value={dateValue}
              changeDate={(newValue) => chgDate(newValue)}
            />
            {/* Res PC */}
            <Media greaterThan="sm">
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
                  {!shiftArr || shiftArr.length == 0 ? (
                    <AlertComponent>
                      受付可能な予約は見つかりませんでした
                    </AlertComponent>
                  ) : (
                    shiftArr.map((freeList) => (
                      <>
                        <TableRow key={freeList.id}>
                          <TableCell>
                            <Box ml={3}>{freeList.staff}</Box>
                          </TableCell>
                          <TableCell>
                            <Box ml={3}>
                              {dayjs(freeList.date).format("YYYY/MM/DD ")}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box ml={3}>{`${freeList.time}:00`}</Box>
                          </TableCell>
                          <TableCell>
                            <Tooltip title={`予約する:${freeList.staff}`} arrow>
                              <PrimaryBtn
                                click={() => {
                                  handleOpen1();
                                  selectRsv(freeList);
                                }}
                                buttonText={"登録"}
                                style={{ mt: 2.5, mb: 2, ml: 1 }}
                              />
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      </>
                    ))
                  )}
                </TableBody>
              </Table>
            </Media>
            {/* Res Mobile */}
            <Media at="sm">
              <Box width="100%">
                <Table size="small">
                  <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                    <TableRow>
                      <TableCell style={{ fontWeight: 600, fontSize: "13px" }}>
                        <Box ml={3}>日付</Box>
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, fontSize: "13px" }}>
                        <Box ml={3}>時間</Box>
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: 600, fontSize: "13px" }}
                      />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!reserves_false || reserves_false.length == 0 ? (
                      <AlertComponent>
                        受付可能な予約は見つかりませんでした
                      </AlertComponent>
                    ) : (
                      reserves_false.map((freeList) => (
                        <>
                          {format(newDateTime, "yyyy-MM-dd") ==
                            format(new Date(freeList.date), "yyyy-MM-dd") && (
                            <>
                              <TableRow key={freeList.id}>
                                <TableCell sx={{ fontSize: "13px" }}>
                                  <Box ml={3}>
                                    {dayjs(freeList.date).format("YYYY/MM/DD ")}
                                  </Box>
                                </TableCell>
                                <TableCell sx={{ fontSize: "13px" }}>
                                  <Box ml={3}>{`${freeList.time}:00`}</Box>
                                </TableCell>
                                <TableCell sx={{ fontSize: "13px" }}>
                                  <Tooltip
                                    title={`予約する:${freeList.staff}`}
                                    arrow
                                  >
                                    <PrimaryBtn
                                      style={{
                                        mt: 2.5,
                                        mb: 2,
                                        ml: 1,
                                        fontSize: "10px",
                                      }}
                                      click={() => {
                                        handleOpen1();
                                        selectRsv(freeList);
                                      }}
                                      buttonText={"登録"}
                                    />
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            </>
                          )}
                        </>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Media>
            {/* 予約登録 */}
            <GetRsvModal
              open={open.open2}
              handleClose={handleClose2}
              date={rsvData.date}
              teacher={user && user.displayName}
              student={rsvData.student}
              email={rsvData.email}
              phoneNumber={rsvData.phoneNumber}
              clickEv={() => updateReserve(data.id, data)}
            />
            {/* 生徒検索 */}
            <SearchStudentModal
              open={open.open1}
              handleClose={handleClose1}
              loadOpen={() => handleOpen2()}
              changeEvent={(e) => selectStudent(e)}
              changeEmail={(e) => setEmail(e)}
              changePhoneNumber={(e) => setPhoneNumber(e)}
            />
          </MediaContextProvider>
        )}
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default FreeSpace;
