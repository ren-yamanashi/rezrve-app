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
import { createMedia } from "@artsy/fresnel";
//内部インポート
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useDate } from "../../../hooks/date/useDate";
import { useHandle } from "../../../hooks/useHandle";
import { useGetReserves } from "../../../hooks/firebase/teacher/useGetReserves";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useLoading } from "../../../hooks/useLoading";
import {
  useUserList,
  useSearchStudent,
} from "../../../hooks/firebase/user/useUserList";
import { useFreeSpace_newValue } from "../../../hooks/firebase/teacher/useFreeSpace";
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
const FreeSpace = () => {
  const { loading, startLoading, completeLoading } = useLoading();
  const { selectRsv, rsvData, selectStudent, setEmail, setPhoneNumber } =
    useSelectReserve();
  const { handleOpen, handleClose2 } = useHandle();
  const { newDateTime, dateValue, chgDate } = useDate();
  const { loadFreeSpace_newValue, error, freeSpaces } = useFreeSpace_newValue();
  const { loadSearchStudent } = useSearchStudent();
  const { usersList } = useUserList();
  const { loadGetReserves } = useGetReserves();
  const { user } = useAuth();
  //ローディング関数
  const loadShifts = (newDate) => {
    startLoading();
    loadFreeSpace_newValue(newDate).then(() =>
      setTimeout(() => completeLoading(), 500)
    );
  };
  React.useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    loadShifts(newDateTime);
  }, [process.browser, user]);
  return (
    <>
      <React.Fragment>
        {loading == true ? (
          <Loading />
        ) : (
          <MediaContextProvider>
            <DateRangePicker
              value={dateValue}
              changeDate={(newValue) => loadShifts(chgDate(newValue))}
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
                  {freeSpaces &&
                    freeSpaces.map((freeList) => (
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
                          <Box ml={3}>{`${freeList.time}:00`}</Box>
                        </TableCell>
                        <TableCell>
                          <Tooltip title={`予約する:${freeList.staff}`} arrow>
                            <PrimaryBtn
                              click={() => {
                                handleOpen();
                                selectRsv(freeList);
                              }}
                              buttonText={"登録"}
                              style={{ mt: 2.5, mb: 2, ml: 1 }}
                            />
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
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
                    {freeSpaces &&
                      freeSpaces.map((freeList) => (
                        <TableRow key={freeList.id}>
                          <TableCell sx={{ fontSize: "13px" }}>
                            <Box ml={3}>
                              {dayjs(freeList.date.toDate()).format(
                                "YYYY/MM/DD "
                              )}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            <Box ml={3}>{`${freeList.time}:00`}</Box>
                          </TableCell>
                          <TableCell sx={{ fontSize: "13px" }}>
                            <Tooltip title={`予約する:${freeList.staff}`} arrow>
                              <PrimaryBtn
                                style={{
                                  mt: 2.5,
                                  mb: 2,
                                  ml: 1,
                                  fontSize: "10px",
                                }}
                                click={() => {
                                  handleOpen();
                                  selectRsv(freeList);
                                }}
                                buttonText={"登録"}
                              />
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </Media>
            {error && error == true && (
              <AlertComponent>
                受付可能な予約は見つかりませんでした
              </AlertComponent>
            )}
            {/* 予約登録 */}
            <GetRsvModal
              date={rsvData.date}
              teacher={user && user.displayName}
              student={rsvData.student}
              email={rsvData.email}
              phoneNumber={rsvData.phoneNumber}
              reserver={rsvData.reserver}
              clickEv={async (e) => {
                try {
                  console.log(rsvData.phoneNumber);
                  await loadGetReserves(
                    e,
                    newDateTime,
                    rsvData.rsvTime,
                    rsvData.student,
                    rsvData.id,
                    user?.uid,
                    handleClose2(),
                    "講師登録",
                    rsvData.email,
                    rsvData.phoneNumber
                  );
                } catch (error) {
                  handleClose2();
                } finally {
                  loadFreeSpace_newValue(newDateTime);
                }
              }}
            />
            {/* 生徒検索 */}
            <SearchStudentModal
              changeEvent={(e) => selectStudent(e)}
              changeEmail={(e) => setEmail(e)}
              changePhoneNumber={(e) => setPhoneNumber(e)}
              searchStudent={() => {
                loadSearchStudent(rsvData.student);
              }}
              users={usersList && usersList}
            />
          </MediaContextProvider>
        )}
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default FreeSpace;
