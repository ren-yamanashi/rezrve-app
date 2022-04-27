import * as React from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { blue, grey } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
// import my File
import SnackComponent2 from "../../atoms/Snack/SnackTitle2";
import TableCellComponent4 from "../../atoms/TableCell/TableCell4";
import TableCellComponent5 from "../../atoms/TableCell/TableCell7";
import GetRsv_OK_Cancel from "../../atoms/andMore.../GetRsv_OK_Cancel";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import Title_15 from "../../atoms/Text/Title_15";
import { useDate } from "../../../hooks/date/useDate";
import { useGetReserves } from "../../../hooks/firebase/teacher/useGetReserves";
import { useHandle } from "../../../hooks/useHandle";
import { useRouter } from "next/router";
import { useSelectUser_query } from "../../../hooks/firebase/user/useUserList";
import { useSetData_teachersRsv } from "../../../hooks/useSetData";
import { useTeachersRsv_schedule } from "../../../hooks/firebase/student/useTeachersRsv";
import { useStaffList } from "../../../hooks/firebase/user/useUserList";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { Query } from "../../../models/router_query";
import { useLoading } from "../../../hooks/useLoading";
import PrimaryText from "../../atoms/Text/Typography4";
import SelectTeacherModal from "../../templates/Modal/SelectTeacherModal";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
import Loading from "../../atoms/loading/loadingComponent";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});
// 講師予約
const TeachersRsv_Mobile = () => {
  const router = useRouter();
  const query = router.query as Query;
  const { loading, startLoading, completeLoading } = useLoading();
  const { rsvData, selectStudent, setEmail, setPhoneNumber } =
    useSelectReserve();
  const { usersList } = useStaffList();
  const { user_query, loadUser_query } = useSelectUser_query();
  const { handleClose2, handleOpen7 } = useHandle();
  const { loadGetReserves } = useGetReserves();
  const { id, rsvDate, rsvTime } = useSetData_teachersRsv();
  const { changeDateValue, newDateTime, xArr, yArr, zArr, dateArr, dayArr } =
    useDate();
  const {
    loadRsvScheduleAll_X,
    loadRsvScheduleAll_Y,
    loadRsvScheduleAll_Z,
    rsvArr,
  } = useTeachersRsv_schedule();
  // ローディング関数
  const loadSchedulesX = () => {
    startLoading();
    loadRsvScheduleAll_X(
      user_query && user_query.userName,
      xArr[0],
      xArr[1],
      xArr[2],
      xArr[3],
      xArr[4],
      xArr[5],
      xArr[6]
    ).then(() => setTimeout(() => completeLoading(), 500));
  };
  const loadSchedulesY = () => {
    startLoading();
    loadRsvScheduleAll_Y(
      user_query && user_query.userName,
      zArr[0],
      zArr[1],
      zArr[2],
      zArr[3],
      zArr[4],
      zArr[5],
      zArr[6]
    ).then(() => setTimeout(() => completeLoading(), 500));
  };
  const loadSchedulesZ = () => {
    startLoading();
    loadRsvScheduleAll_Z(
      user_query && user_query.userName,
      yArr[0],
      yArr[1],
      yArr[2],
      yArr[3],
      yArr[4],
      yArr[5],
      yArr[6]
    ).then(() => setTimeout(() => completeLoading(), 500));
  };
  React.useEffect(() => {
    if (!process.browser) {
      return;
    }
    loadUser_query(query?.uid);
    loadSchedulesX();
  }, [process.browser, query?.uid]);
  return (
    <>
      <React.Fragment>
        <MediaContextProvider>
          {loading == true ? (
            <Loading />
          ) : (
            <>
              <Media at="sm">
                <Box mt={2} display="flex" justifyContent="center" mx="auto">
                  <CardContent
                    style={{
                      width: 300,
                      height: 100,
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: "#4689FF",
                    }}
                  >
                    <Box display="flex" justifyContent="center" mx="auto">
                      <Title_15
                        fontSize={15}
                        style={{ mt: 2 }}
                        color={blue[600]}
                        fontWeight={600}
                        textTitle={"指名スタッフ"}
                      />
                      <Title_15
                        style={{ ml: 2, mt: 2 }}
                        fontSize={15}
                        color="black"
                        textTitle={user_query && user_query.userName}
                      />
                      <Box
                        component="img"
                        ml={2}
                        sx={{ height: 50, width: 50, borderRadius: "50%" }}
                        alt={user_query && user_query.userName}
                        src={user_query && user_query.staffImageURL}
                      />
                    </Box>
                    <Box display="flex" justifyContent="right">
                      <IconButton
                        onClick={() => router.push(`/${query.id}/reserver/`)}
                      >
                        <KeyboardReturnIcon
                          sx={{ color: blue[500], fontSize: 20 }}
                        />
                      </IconButton>
                      <Button onClick={handleOpen7}>
                        <PrimaryText
                          size={12}
                          color={blue[600]}
                          textTitle={"条件を変更する"}
                        />
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
                <SnackComponent2 snackText={"ご希望の時間帯をお選びください"} />
                <GetRsv_OK_Cancel />
                <Box
                  display="flex"
                  justifyContent="center"
                  mx="auto"
                  fontSize={15}
                >
                  <IconButton
                    onClick={() => {
                      changeDateValue(
                        dayArr.today.setDate(dayArr.today.getDate() - 7)
                      );
                      loadSchedulesY();
                    }}
                  >
                    <ArrowLeftIcon
                      sx={{
                        fontSize: 40,
                        color: blue[500],
                      }}
                    />
                    <Typography fontSize={12} component="div" color={blue[600]}>
                      前の週
                    </Typography>
                  </IconButton>
                  <Box fontSize={15} fontWeight={600} mt={2.5} mx={3}>
                    {`${dayArr.today.getFullYear()}/${
                      dayArr.today.getMonth() + 1
                    }`}
                  </Box>
                  <IconButton
                    onClick={() => {
                      changeDateValue(
                        dayArr.today.setDate(dayArr.today.getDate() + 7)
                      );
                      loadSchedulesZ();
                    }}
                  >
                    <Typography fontSize={12} component="div" color={blue[600]}>
                      次の週
                    </Typography>
                    <ArrowRightIcon
                      sx={{
                        fontSize: 50,
                        color: blue[500],
                        alignItems: "center",
                      }}
                    />
                  </IconButton>
                </Box>
                <Box overflow="scroll">
                  <Table
                    size="small"
                    sx={{
                      borderCollapse: "collapse",
                      mb: 5,
                      width: 500,
                      mx: "auto",
                    }}
                  >
                    <TableHead
                      style={{ backgroundColor: "#FFFFDD", border: "3px" }}
                    >
                      <TableRow>
                        <TableCell
                          style={{
                            width: "8%",
                            borderStyle: "solid none",
                            borderWidth: "1px",
                            borderColor: grey[400],
                          }}
                        />
                        {dateArr.map((item) => (
                          <>
                            <TableCellComponent4 date={item.date} />
                          </>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {user_query?.times.map((t) => (
                        <TableRow key={t}>
                          <TableCell>
                            <Box fontSize={10} sx={{ height: 40, width: "8%" }}>
                              <Box>{`${t}:00`}</Box>
                            </Box>
                          </TableCell>
                          {rsvArr.map((item) => (
                            <>
                              <TableCellComponent5
                                reserve={item && item}
                                time={t}
                                teacher={user_query && user_query.userName}
                              />
                            </>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Media>
            </>
          )}
          <GetRsvModal
            date={"テスト"}
            teacher={user_query && user_query.userName}
            student={rsvData.student}
            email={rsvData.email}
            phoneNumber={rsvData.phoneNumber}
            clickEv={(e) => {
              loadGetReserves(
                e,
                newDateTime,
                rsvTime,
                rsvData.student,
                id,
                "anonymous",
                handleClose2(),
                "顧客登録",
                rsvData.email,
                rsvData.phoneNumber
              ).then(() => loadSchedulesX());
            }}
          />
          <SelectTeacherModal
            users={usersList && usersList}
            load={3}
            queryId={query?.id}
          />
          <SearchStudentModal
            changeEvent={(e) => selectStudent(e)}
            changeEmail={(e) => setEmail(e)}
            changePhoneNumber={(e) => setPhoneNumber(e)}
          />
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default TeachersRsv_Mobile;
