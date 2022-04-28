import FilterListIcon from "@mui/icons-material/FilterList";
import Table from "@mui/material/Table";
import Tooltip from "@mui/material/Tooltip";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import React from "react";
import Box from "@mui/material/Box";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { teal } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import { createMedia } from "@artsy/fresnel";
import { useRouter } from "next/router";
//内部インポート
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import AlertComponent from "../../atoms/Alert/Alert";
import DateRangePicker from "../../atoms/Date/Date ";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useSelectUser } from "../../../hooks/firebase/user/useUserList";
import { useHandle } from "../../../hooks/useHandle";
import { useGetReserves } from "../../../hooks/firebase/teacher/useGetReserves";
import { useReserves_Date } from "../../../hooks/firebase/student/useReserves";
import { useDate } from "../../../hooks/date/useDate";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { Query } from "../../../models/router_query";
import { useLoading } from "../../../hooks/useLoading";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import Loading from "../../atoms/loading/loadingComponent";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";

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
const RsvDate = () => {
  const router = useRouter();
  const query = router.query as Query;
  const { newDateTime, dateValue, chgDate } = useDate();
  const { rsvData, selectRsv, selectStudent, setEmail } = useSelectReserve();
  const { loadGetReserves } = useGetReserves();
  const { handleOpen, handleClose2 } = useHandle();
  const { loadSelectUsers } = useSelectUser();
  const { loadRsv_date, reserve } = useReserves_Date();
  const { startLoading, loading, completeLoading } = useLoading();
  // ローディング関数
  const loadingReserves = (newDate) => {
    startLoading();
    loadRsv_date(newDate, query.id).then(() => {
      setTimeout(() => completeLoading(), 500);
    });
  };
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
                changeDate={async (newValue) =>
                  loadingReserves(chgDate(newValue))
                }
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
                        <Box mt={1}>時間</Box>
                        {/* <IconButton onClick={handleOpen6}>
                          <FilterListIcon />
                        </IconButton>
                        <Media greaterThan="md">
                          <IconButton
                            onClick={() => loadingReserves(newDateTime)}
                          >
                            <RestartAltIcon />
                          </IconButton>
                        </Media> */}
                      </Box>
                    </TableCell>
                    <TableCell style={{ fontWeight: 600 }} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!reserve || reserve.length == 0 ? (
                    <AlertComponent>
                      予約可能なレッスンは見つかりませんでした
                    </AlertComponent>
                  ) : (
                    reserve.map((freeList) => (
                      <TableRow key={freeList.id}>
                        <TableCell>
                          <Box ml={3}>{freeList.staff}</Box>
                        </TableCell>
                        <TableCell>
                          <Box ml={3}>
                            {dayjs(freeList.date.toDate()).format(
                              "YYYY/MM/DD "
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box ml={3}>{`${freeList.time}:00`} </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Tooltip title={`予約する:${freeList.staff}`} arrow>
                              <PrimaryBtn
                                style={{
                                  mt: 3,
                                  mb: 2,
                                  bgcolor: teal[400],
                                  color: "white",
                                  "&:hover": { bgcolor: teal[500] },
                                }}
                                click={() => {
                                  handleOpen();
                                  selectRsv(freeList);
                                  loadSelectUsers(freeList.senderUid);
                                }}
                                buttonText={"予約"}
                              />
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Media>
            {/* Media Mobile */}
            <Media at="sm">
              <DateRangePicker
                value={dateValue}
                changeDate={async (newValue) =>
                  loadingReserves(chgDate(newValue))
                }
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
                  {reserve &&
                    reserve.map((freeList) => (
                      <TableRow key={freeList.id}>
                        <TableCell>
                          <Box fontSize={12}>{freeList.staff}</Box>
                        </TableCell>
                        <TableCell>
                          <Box fontSize={12}>
                            {dayjs(freeList.date.toDate()).format(
                              "YYYY/MM/DD "
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Tooltip title={`予約する:${freeList.staff}`} arrow>
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
                              click={(e) => {
                                handleOpen();
                                selectRsv(freeList);
                                loadSelectUsers(freeList.senderUid);
                              }}
                              buttonText={`${freeList.time}:00`}
                            />
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Media>
            {/* 予約登録 */}
            <GetRsvModal
              date={`${newDateTime.getMonth() + 1}/${newDateTime.getDate()} ${
                rsvData.rsvTime
              }:00 ~ ${rsvData.rsvTime + 1}:00`}
              teacher={rsvData.teacher}
              student={rsvData.student}
              email={rsvData.email}
              clickEv={(e) =>
                loadGetReserves(
                  e,
                  newDateTime,
                  rsvData.rsvTime,
                  rsvData.student,
                  rsvData.id,
                  rsvData.email,
                  handleClose2()
                ).then(() => {
                  loadingReserves(newDateTime);
                })
              }
            />
            <SearchStudentModal
              changeEvent={(e) => selectStudent(e)}
              changeEmail={(e) => setEmail(e)}
            />
          </MediaContextProvider>
        )}
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default RsvDate;
