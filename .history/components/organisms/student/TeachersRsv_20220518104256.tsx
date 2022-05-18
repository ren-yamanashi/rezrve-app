import * as React from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import HomeIcon from "@mui/icons-material/Home";
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
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { blue, grey } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
import { format } from "date-fns";
// import my File
import SnackComponent2 from "../../atoms/Snack/SnackTitle2";
import TableCellComponent6 from "../../atoms/TableCell/TableCell6";
import GetRsv_OK_Cancel from "../../atoms/andMore.../GetRsv_OK_Cancel";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import Title_15 from "../../atoms/Text/Title_15";
import { useDate } from "../../../hooks/date/useDate";
import { useGetReserves } from "../../../hooks/firebase/manager/useReserves";
import { useRouter } from "next/router";
import { useSelectUser } from "../../../hooks/firebase/user/useUserList";
import { useStaffList } from "../../../hooks/firebase/user/useUserList";
import { useTeachersRsv_schedule } from "../../../hooks/firebase/student/useTeachersRsv";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { Query } from "../../../models/router_query";
import { useLoading } from "../../../hooks/useLoading";
import { useHandle } from "../../../hooks/useHandle";
import { userProps } from "../../../models/userProps";
import { reserveProps } from "../../../models/reserveProps";
import { timeProps } from "../../../models/timeProps";
import PrimaryText from "../../atoms/Text/Typography4";
import SelectTeacherModal from "../../templates/Modal/SelectTeacherModal";
import Loading from "../../atoms/loading/loadingComponent";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";

// Create Media
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});
// 講師予約
const TeachersRsv: React.FC<{
  reserves: reserveProps[];
  times: timeProps;
  user: userProps;
}> = ({ reserves, times, user }) => {
  const { loading } = useLoading();
  const router = useRouter();
  const query = router.query as Query;
  const { user_query } = useSelectUser();
  const { usersList } = useStaffList();
  const { getReserves } = useGetReserves();

  const { changeDateValue, newDateTime, dateArr, dayArr, xArr } = useDate();
  const { loadSchedulesY, loadSchedulesZ, rsvArr } = useTeachersRsv_schedule();
  const { rsvData, selectStudent, setEmail, setPhoneNumber, selectRsv } =
    useSelectReserve();
  const {
    open,
    handleClose1,
    handleClose2,
    handleClose3,
    handleOpen1,
    handleOpen2,
    handleOpen3,
  } = useHandle();
  const rsv1 = [];
  const rsv2 = [];
  const rsv3 = [];
  const rsv4 = [];
  const rsv5 = [];
  const rsv6 = [];
  const rsv7 = [];
  reserves.map((rsv) => {
    format(rsv.date, "yyyy-MM-dd") == format(xArr[0], "yyyy-MM-dd") &&
      rsv1.push(rsv);
  });
  console.log(rsv1);
  return (
    <>
      <React.Fragment>
        <MediaContextProvider>
          {loading == true ? (
            <Loading />
          ) : (
            <>
              <Media greaterThan="sm">
                <Box mt={2} display="flex" justifyContent="center" mx="auto">
                  <CardContent
                    style={{
                      width: 500,
                      height: 110,
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
                        textTitle={user.userName}
                      />
                      <Box
                        component="img"
                        ml={2}
                        sx={{ height: 50, width: 50, borderRadius: "50%" }}
                        alt={user.userName}
                        src={user.staffImageUrl}
                      />
                    </Box>
                    <Box display="flex" justifyContent="right">
                      <IconButton
                        onClick={() =>
                          router.push(`/${user.companyId}/reserver/`)
                        }
                      >
                        <HomeIcon sx={{ color: blue[500], fontSize: 23 }} />
                      </IconButton>
                      <Button onClick={handleOpen1}>
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
                      loadSchedulesY(query?.uid);
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
                      loadSchedulesZ(query?.uid);
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
                <Table
                  size="small"
                  sx={{
                    borderCollapse: "collapse",
                    mb: 5,
                    maxWidth: 1000,
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
                          <TableCellComponent6 date={item.date} />
                        </>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {times[0].number.map((t) => (
                      <TableRow key={t}>
                        <TableCell>
                          <Box fontSize={10} sx={{ height: 40, width: "8%" }}>
                            <Box>{`${t}:00`}</Box>
                          </Box>
                        </TableCell>
                        {rsvArr.map((item) => (
                          <>
                            <TableCell
                              sx={{
                                borderStyle: "dashed solid",
                                borderWidth: "1px",
                                borderColor: grey[400],
                                bgcolor: grey[200],
                                width: "13%",
                              }}
                            >
                              {item.map(
                                (i) =>
                                  i.time == t && (
                                    <Box
                                      display="flex"
                                      justifyContent="center"
                                      bgcolor={
                                        i.reserved == false
                                          ? blue[400]
                                          : grey[600]
                                      }
                                      borderRadius={2}
                                    >
                                      <Tooltip
                                        title={
                                          <>
                                            <Box>{`担当者名 : ${i.staff}`}</Box>
                                            <Box>{`日付 : ${dayjs(
                                              i.date.toDate()
                                            ).format("YYYY/MM/DD ")}`}</Box>
                                            <Box>{`時間 : ${i.time}:00~`}</Box>
                                          </>
                                        }
                                        arrow
                                      >
                                        <IconButton
                                          onClick={() => {
                                            selectRsv(i);
                                            i.reserved == false &&
                                              handleOpen2();
                                          }}
                                        >
                                          {i.reserved == false ? (
                                            <RadioButtonUncheckedIcon
                                              sx={{
                                                color: "white",
                                                fontSize: 12,
                                              }}
                                            />
                                          ) : (
                                            <CloseIcon
                                              sx={{
                                                color: "white",
                                                fontSize: 12,
                                              }}
                                            />
                                          )}
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  )
                              )}
                            </TableCell>
                          </>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Media>
            </>
          )}
          <GetRsvModal
            open={open.open3}
            handleClose={handleClose3}
            date={rsvData.date}
            teacher={user_query && user_query.userName}
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
                "顧客登録",
                user_query?.companyId,
                "anonymous"
              )
            }
          />
          <SearchStudentModal
            open={open.open2}
            handleClose={handleClose2}
            loadOpen={() => handleOpen3()}
            changeEvent={(e) => selectStudent(e)}
            changeEmail={(e) => setEmail(e)}
            changePhoneNumber={(e) => setPhoneNumber(e)}
          />
          <SelectTeacherModal
            open={open.open1}
            handleClose={handleClose1}
            users={usersList && usersList}
            queryId={query?.id}
          />
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default TeachersRsv;
