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
import { useDate } from "../../../hooks/date/useDate";
import { useGetReserves } from "../../../hooks/firebase/manager/useReserves";
import { useRouter } from "next/router";
import { useSelectUser } from "../../../hooks/firebase/user/useUserList";
import { useTeachersRsv_schedule } from "../../../hooks/firebase/student/useTeachersRsv";
import { useStaffList } from "../../../hooks/firebase/user/useUserList";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { Query } from "../../../models/router_query";
import { useLoading } from "../../../hooks/useLoading";
import { useHandle } from "../../../hooks/useHandle";
import { userProps } from "../../../models/userProps";
import { reserveProps } from "../../../models/reserveProps";
import { timeProps } from "../../../models/timeProps";
import { usePrismaReserve } from "../../../hooks/prisma/useReserve";
import PrimaryText from "../../atoms/Text/Typography4";
import SelectTeacherModal from "../../templates/Modal/SelectTeacherModal";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
import Loading from "../../atoms/loading/loadingComponent";
import SnackComponent2 from "../../atoms/Snack/SnackTitle2";
import TableCellComponent4 from "../../atoms/TableCell/TableCell4";
import GetRsv_OK_Cancel from "../../atoms/andMore.../GetRsv_OK_Cancel";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import Title_15 from "../../atoms/Text/Title_15";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});
// 講師予約
const TeachersRsv_Mobile: React.FC<{
  reserves: reserveProps[];
  times: timeProps;
  user: userProps;
  staffs: userProps[];
}> = ({ reserves, times, user, staffs }) => {
  const router = useRouter();
  const query = router.query as Query;
  const { loading } = useLoading();
  const { usersList } = useStaffList();
  const { user_query } = useSelectUser();
  const { getReserves } = useGetReserves();
  const { changeDateValue, newDateTime, dateArr, dayArr, xArr } = useDate();
  const { updateReserve } = usePrismaReserve();
  const { rsvData, selectStudent, setEmail, setPhoneNumber, selectRsv } =
    useSelectReserve();
  const {
    open,
    handleOpen1,
    handleOpen2,
    handleOpen3,
    handleClose1,
    handleClose2,
    handleClose3,
  } = useHandle();
  const rsv1 = [];
  const rsv2 = [];
  const rsv3 = [];
  const rsv4 = [];
  const rsv5 = [];
  const rsv6 = [];
  const rsv7 = [];
  reserves.map((rsv) => {
    format(new Date(rsv.date), "yyyy-MM-dd") == format(xArr[0], "yyyy-MM-dd") &&
      rsv1.push(rsv);
    format(new Date(rsv.date), "yyyy-MM-dd") == format(xArr[1], "yyyy-MM-dd") &&
      rsv2.push(rsv);
    format(new Date(rsv.date), "yyyy-MM-dd") == format(xArr[2], "yyyy-MM-dd") &&
      rsv3.push(rsv);
    format(new Date(rsv.date), "yyyy-MM-dd") == format(xArr[3], "yyyy-MM-dd") &&
      rsv4.push(rsv);
    format(new Date(rsv.date), "yyyy-MM-dd") == format(xArr[4], "yyyy-MM-dd") &&
      rsv5.push(rsv);
    format(new Date(rsv.date), "yyyy-MM-dd") == format(xArr[5], "yyyy-MM-dd") &&
      rsv6.push(rsv);
    format(new Date(rsv.date), "yyyy-MM-dd") == format(xArr[6], "yyyy-MM-dd") &&
      rsv7.push(rsv);
  });
  const arr = [rsv1, rsv2, rsv3, rsv4, rsv5, rsv6, rsv7];
  const data = {
    id: rsvData.id,
    reserver: rsvData.student,
    email: rsvData.email,
    phoneNumber: rsvData.phoneNumber,
    reserverUid: "生徒登録",
  };
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
                        onClick={() => router.push(`/${query.id}/reserver/`)}
                      >
                        <HomeIcon sx={{ color: blue[500], fontSize: 20 }} />
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
                    onClick={() =>
                      changeDateValue(
                        dayArr.today.setDate(dayArr.today.getDate() - 7)
                      )
                    }
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
                    onClick={() =>
                      changeDateValue(
                        dayArr.today.setDate(dayArr.today.getDate() + 7)
                      )
                    }
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
                      {times[0].number.map((t) => (
                        <TableRow key={t}>
                          <TableCell>
                            <Box fontSize={10} sx={{ height: 40, width: "8%" }}>
                              <Box>{`${t}:00`}</Box>
                            </Box>
                          </TableCell>
                          {arr.map((item) => (
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
                                                i.date
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
                </Box>
              </Media>
            </>
          )}
          <GetRsvModal
            open={open.open3}
            handleClose={handleClose3}
            date={rsvData.date}
            teacher={user.userName}
            student={rsvData.student}
            email={rsvData.email}
            phoneNumber={rsvData.phoneNumber}
            clickEv={() => updateReserve(data.id, data)}
          />
          <SelectTeacherModal
            open={open.open1}
            handleClose={handleClose1}
            users={staffs}
          />
          <SearchStudentModal
            open={open.open2}
            handleClose={handleClose2}
            loadOpen={() => handleOpen3()}
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
