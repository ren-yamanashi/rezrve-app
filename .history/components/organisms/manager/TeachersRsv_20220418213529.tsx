import React, { useEffect, useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
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
// import mmy File
import SnackComponent2 from "../../atoms/Snack/SnackTitle2";
import TableCellComponent5 from "../../atoms/TableCell/TableCell7";
import TableCellComponent6 from "../../atoms/TableCell/TableCell6";
import GetRsv_OK_Cancel from "../../atoms/andMore.../GetRsv_OK_Cancel";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import Title_15 from "../../atoms/Text/Title_15";
import { useDate } from "../../../hooks/date/useDate";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useRouter } from "next/router";
import {
  useSelectUser_query,
  useStudentsList,
} from "../../../hooks/firebase/user/useUserList";
import { useSetData_teachersRsv } from "../../../hooks/useSetData";
import { useTeachersRsv_schedule } from "../../../hooks/firebase/student/useTeachersRsv";
import { useHandle } from "../../../hooks/useHandle";
import PrimaryText from "../../atoms/Text/Typography4";
import Loading from "../../atoms/loading/loadingComponent";
import { useGetReserves } from "../../../hooks/firebase/manager/useReserves";
import { useSelectStudent } from "../../../hooks/useSelectStudent";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
import SelectTeacherModal from "../../templates/Modal/SelectTeacherModal";
import { useTeacherList } from "../../../hooks/firebase/user/useUserList";
import { useSelectReserve } from "../../../hooks/useSelectReserve";

type Query = {
  id: string;
};

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

const TeachersRsv = () => {
  console.log("講師予約 （管理者）");
  const { selectStudent, rsvData } = useSelectReserve();
  const router = useRouter();
  const { usersList } = useTeacherList();
  const query_ = router.query as Query;
  const { handleOpen7 } = useHandle();
  const { studentName } = useSelectStudent();
  const { changeDateValue, dateValue, newDateTime } = useDate();
  const { user_query, loadUser_query } = useSelectUser_query();
  const { studentsList, loadSearchStudentsList } = useStudentsList();
  const { id, rsvDate, rsvTime } = useSetData_teachersRsv();
  const { getReserves } = useGetReserves();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const {
    loadRsvScheduleAll_X,
    loadRsvScheduleAll_Y,
    loadRsvScheduleAll_Z,
    rsv,
    rsv2,
    rsv3,
    rsv4,
    rsv5,
    rsv6,
    rsv7,
  } = useTeachersRsv_schedule();
  // initialDateにすると全て更新されるため、あえて毎回 new Date()を作る
  let dayArr = {
    today: new Date(dateValue),
    dy: new Date(dateValue),
    dy2: new Date(dateValue),
    dy3: new Date(dateValue),
    dy4: new Date(dateValue),
    dy5: new Date(dateValue),
    dy6: new Date(dateValue),
    dy7: new Date(dateValue),
  };
  const rsvArr = [rsv, rsv2, rsv3, rsv4, rsv5, rsv6, rsv7];
  const dateArr = [
    dayArr.today,
    dayArr.dy,
    dayArr.dy2,
    dayArr.dy3,
    dayArr.dy4,
    dayArr.dy5,
    dayArr.dy6,
  ];
  const time_arr = [10, 11, 12, 13, 14, 15, 16, 17, 18];
  dateArr.map((item) => {
    for (let i = 0; i <= 7; i++) {
      item.setDate(item.getDate() + i);
    }
  });

  // dayArr.today.setDate(dayArr.today.getDate());
  // dayArr.dy.setDate(dayArr.dy.getDate() + 1);
  // dayArr.dy2.setDate(dayArr.dy2.getDate() + 2);
  // dayArr.dy3.setDate(dayArr.dy3.getDate() + 3);
  // dayArr.dy4.setDate(dayArr.dy4.getDate() + 4);
  // dayArr.dy5.setDate(dayArr.dy5.getDate() + 5);
  // dayArr.dy6.setDate(dayArr.dy6.getDate() + 6);

  const y = dayArr.today.getFullYear();
  const m = dayArr.today.getMonth();
  const d = dayArr.today.getDate();
  let xx = new Date(y, m, d, 12, 0, 0);
  let xxx = new Date(y, m, d - 7, 12, 0, 0);
  let yyy = new Date(y, m, d + 7, 12, 0, 0);

  const y2 = dayArr.dy.getFullYear();
  const m2 = dayArr.dy.getMonth();
  const d2 = dayArr.dy.getDate();
  let xx2 = new Date(y2, m2, d2, 12, 0, 0);
  let xxx2 = new Date(y2, m2, d2 - 7, 12, 0, 0);
  let yyy2 = new Date(y2, m2, d2 + 7, 12, 0, 0);

  const y3 = dayArr.dy2.getFullYear();
  const m3 = dayArr.dy2.getMonth();
  const d3 = dayArr.dy2.getDate();
  let xx3 = new Date(y3, m3, d3, 12, 0, 0);
  let xxx3 = new Date(y3, m3, d3 - 7, 12, 0, 0);
  let yyy3 = new Date(y3, m3, d3 + 7, 12, 0, 0);

  const y4 = dayArr.dy3.getFullYear();
  const m4 = dayArr.dy3.getMonth();
  const d4 = dayArr.dy3.getDate();
  let xx4 = new Date(y4, m4, d4, 12, 0, 0);
  let xxx4 = new Date(y4, m4, d4 - 7, 12, 0, 0);
  let yyy4 = new Date(y4, m4, d4 + 7, 12, 0, 0);

  const y5 = dayArr.dy4.getFullYear();
  const m5 = dayArr.dy4.getMonth();
  const d5 = dayArr.dy4.getDate();
  let xx5 = new Date(y5, m5, d5, 12, 0, 0);
  let xxx5 = new Date(y5, m5, d5 - 7, 12, 0, 0);
  let yyy5 = new Date(y5, m5, d5 + 7, 12, 0, 0);

  const y6 = dayArr.dy5.getFullYear();
  const m6 = dayArr.dy5.getMonth();
  const d6 = dayArr.dy5.getDate();
  let xx6 = new Date(y6, m6, d6, 12, 0, 0);
  let xxx6 = new Date(y6, m6, d6 - 7, 12, 0, 0);
  let yyy6 = new Date(y6, m6, d6 + 7, 12, 0, 0);

  const y7 = dayArr.dy6.getFullYear();
  const m7 = dayArr.dy6.getMonth();
  const d7 = dayArr.dy6.getDate();
  let xx7 = new Date(y7, m7, d7, 12, 0, 0);
  let xxx7 = new Date(y7, m7, d7 - 7, 12, 0, 0);
  let yyy7 = new Date(y7, m7, d7 + 7, 12, 0, 0);

  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    if (loading == false) {
      return;
    }
    loadUser_query(query_.id).then(() => setLoading2(false));
    if (loading2 == false) {
      loadRsvScheduleAll_X(
        user_query && user_query.userName,
        xx,
        xx2,
        xx3,
        xx4,
        xx5,
        xx6,
        xx7
      ).then(() => setTimeout(() => setLoading(false), 500));
    }
  }, [process.browser, user, query_.id, loading, loading2]);

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
                        src={user_query && user_query.url}
                      />
                    </Box>
                    <Box display="flex" justifyContent="right">
                      <IconButton onClick={() => router.back()}>
                        <KeyboardReturnIcon
                          sx={{ color: blue[500], fontSize: 20 }}
                        />
                      </IconButton>
                      <Button onClick={() => handleOpen7()}>
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
                      loadRsvScheduleAll_Y(
                        user_query && user_query.userName,
                        xxx,
                        xxx2,
                        xxx3,
                        xxx4,
                        xxx5,
                        xxx6,
                        xxx7
                      );
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
                      loadRsvScheduleAll_Z(
                        user_query && user_query.userName,
                        yyy,
                        yyy2,
                        yyy3,
                        yyy4,
                        yyy5,
                        yyy6,
                        yyy7
                      );
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
                          <TableCellComponent6 date={item} />
                        </>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {time_arr.map((t) => (
                      <TableRow key={time_arr.length}>
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
              </Media>
            </>
          )}
          <SearchStudentModal
            changeEvent={(e) => selectStudent(e)}
            searchStudent={() => loadSearchStudentsList(rsvData.student)}
            users={studentsList && studentsList}
          />
          <GetRsvModal
            date={rsvDate}
            teacher={user_query && user_query.userName}
            student={studentName}
            clickEv={(e) => {
              getReserves(e, newDateTime, rsvTime, studentName, id).then(() =>
                router.reload()
              );
            }}
          />
          <SelectTeacherModal users={usersList && usersList} load={1} />
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
};

export default TeachersRsv;
