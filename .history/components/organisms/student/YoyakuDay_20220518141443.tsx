import Table from "@mui/material/Table";
import Tooltip from "@mui/material/Tooltip";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { teal } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
import { useRouter } from "next/router";
import { format } from "date-fns";
//内部インポート
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import AlertComponent from "../../atoms/Alert/Alert";
import DateRangePicker from "../../atoms/Date/Date ";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import Loading from "../../atoms/loading/loadingComponent";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
import { useDate } from "../../../hooks/date/useDate";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { Query } from "../../../models/router_query";
import { useLoading } from "../../../hooks/useLoading";
import { useHandle } from "../../../hooks/useHandle";
import { reserveProps } from "../../../models/reserveProps";
import { usePrismaReserve } from "../../../hooks/prisma/useReserve";

//　Create Media
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

//　日程から探す
const RsvDate: React.FC<{ reserves: reserveProps[] }> = ({ reserves }) => {
  const router = useRouter();
  const query = router.query as Query;
  const { newDateTime, dateValue, chgDate } = useDate();
  const { rsvData, selectRsv, selectStudent, setEmail, setPhoneNumber } =
    useSelectReserve();
  const { updateReserve } = usePrismaReserve();
  const { loading } = useLoading();
  const { open, handleClose1, handleClose2, handleOpen1, handleOpen2 } =
    useHandle();
  const data = {
    id: rsvData.id,
    reserver: rsvData.student,
    email: rsvData.email,
    phoneNumber: rsvData.phoneNumber,
    reserverUid: "生徒登録",
  };
  const shiftArr = [];
  reserves.map((rsv) => {
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
            {/* Media PC */}
            <Media greaterThan="sm">
              <DateRangePicker
                value={dateValue}
                changeDate={async (newValue) => chgDate(newValue)}
              />
              <Table size="small">
                <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                  <TableRow>
                    <TableCell style={{ fontWeight: 600, width: "30%" }}>
                      <Box ml={3}>講師名</Box>
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, width: "25%" }}>
                      <Box ml={3}>日付</Box>
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, width: "25%" }}>
                      <Box display="flex" ml={3}>
                        時間
                      </Box>
                    </TableCell>
                    <TableCell style={{ fontWeight: 600 }} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!reserves || reserves.length == 0 ? (
                    <AlertComponent>
                      予約可能なレッスンは見つかりませんでした
                    </AlertComponent>
                  ) : (
                    reserves.map((freeList) => (
                      <>
                        {format(newDateTime, "yyyy-MM-dd") ==
                          format(new Date(freeList.date), "yyyy-MM-dd") && (
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
                                <Box ml={3}>{`${freeList.time}:00`} </Box>
                              </TableCell>
                              <TableCell>
                                <Box>
                                  <Tooltip
                                    title={`予約する:${freeList.staff}`}
                                    arrow
                                  >
                                    <PrimaryBtn
                                      style={{
                                        mt: 3,
                                        mb: 2,
                                        bgcolor: teal[400],
                                        color: "white",
                                        "&:hover": { bgcolor: teal[500] },
                                      }}
                                      click={() => {
                                        handleOpen1();
                                        selectRsv(freeList);
                                      }}
                                      buttonText={"予約"}
                                    />
                                  </Tooltip>
                                </Box>
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                      </>
                    ))
                  )}
                </TableBody>
              </Table>
            </Media>
            {/* Media Mobile */}
            <Media at="sm">
              <DateRangePicker
                value={dateValue}
                changeDate={async (newValue) => chgDate(newValue)}
              />
              <Table size="small">
                <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                  <TableRow>
                    <TableCell style={{ fontWeight: 600, width: "35%" }}>
                      <Box fontSize={12}>講師名</Box>
                    </TableCell>
                    <TableCell style={{ fontWeight: 600, width: "30%" }}>
                      <Box fontSize={12}>日付</Box>
                    </TableCell>
                    <TableCell style={{ fontWeight: 600 }}>
                      <Box fontSize={12} ml={1}>
                        時間
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!reserves || reserves.length == 0 ? (
                    <AlertComponent>
                      予約可能なレッスンは見つかりませんでした
                    </AlertComponent>
                  ) : (
                    reserves.map((freeList) => (
                      <>
                        {format(newDateTime, "yyyy-MM-dd") ==
                          format(new Date(freeList.date), "yyyy-MM-dd") && (
                          <>
                            <TableRow key={freeList.id}>
                              <TableCell>
                                <Box fontSize={12}>{freeList.staff}</Box>
                              </TableCell>
                              <TableCell>
                                <Box fontSize={12}>
                                  {dayjs(freeList.date).format("YYYY/MM/DD ")}
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Tooltip
                                  title={`予約する:${freeList.staff}`}
                                  arrow
                                >
                                  <PrimaryBtn
                                    style={{
                                      mt: 3,
                                      mb: 2,
                                      ml: 3,
                                      fontSize: 12,
                                      bgcolor: teal[400],
                                      color: "white",
                                      "&:hover": { bgcolor: teal[500] },
                                    }}
                                    click={() => {
                                      handleOpen1();
                                      selectRsv(freeList);
                                    }}
                                    buttonText={`${freeList.time}:00`}
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
            </Media>
            {/* 予約登録 */}
            <GetRsvModal
              open={open.open2}
              handleClose={handleClose2}
              date={rsvData.date}
              teacher={rsvData.teacher}
              student={rsvData.student}
              email={rsvData.email}
              phoneNumber={rsvData.phoneNumber}
              clickEv={() => updateReserve(data.id, data)}
            />
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

export default RsvDate;
