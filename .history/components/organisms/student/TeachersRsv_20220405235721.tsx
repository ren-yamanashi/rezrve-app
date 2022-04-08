import React, { useEffect } from "react";
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
import AlertComponent from "../../atoms/Alert";
import TableCellComponent5 from "../../atoms/TableCell/TableCell5";
import TableCellComponent6 from "../../atoms/TableCell/TableCell6";
import GetRsv_OK_Cancel from "../../templates/andMore.../GetRsv_OK_Cancel";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import Title_15 from "../../atoms/Text/Title_15";
import { useDate } from "../../../hooks/date/useDate";
import { useAuth } from "../../../hooks/useUserAuth";
import { useGetReserves } from "../../../hooks/teacher/getReserves/useGetReserves";
import { useHandle } from "../../../hooks/handle/useHandle";
import { useRouter } from "next/router";
import { useSelectUser_query } from "../../../hooks/user/useUserList";
import { useTeacherList } from "../../../hooks/user/useUserList";
import { useSetData_teachersRsv } from "../../../hooks/student/teachersRsv/useSetData";
import { useTeachersRsv_schedule } from "../../../hooks/student/teachersRsv/useTeachersRsv";
import PrimaryText from "../../atoms/Text/Typography4";
import SelectTeacherModal from "../../templates/Modal/SelectTeacherModal";

type Query = {
  id: string;
};
// Create Media
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

export default function TeachersRsv() {
  console.log("講師予約");
  const router = useRouter();
  const query_ = router.query as Query;
  const { changeDateValue, dateValue, newDateTime } = useDate();
  const { user_query, loadUser_query } = useSelectUser_query();
  const { handleClose2, handleOpen7 } = useHandle();
  const { usersList, loadUserError } = useTeacherList();
  const { loadGetReserves } = useGetReserves();
  const { id, rsvDate, rsvTime } = useSetData_teachersRsv();
  const { user } = useAuth();
  const {
    rsv,
    loadRsv_Schedule1_X,
    loadRsv_Schedule1_Y,
    loadRsv_Schedule1_Z,
    rsv2,
    loadRsv_Schedule2_X,
    loadRsv_Schedule2_Y,
    loadRsv_Schedule2_Z,
    rsv3,
    loadRsv_Schedule3_X,
    loadRsv_Schedule3_Y,
    loadRsv_Schedule3_Z,
    rsv4,
    loadRsv_Schedule4_X,
    loadRsv_Schedule4_Y,
    loadRsv_Schedule4_Z,
    rsv5,
    loadRsv_Schedule5_X,
    loadRsv_Schedule5_Y,
    loadRsv_Schedule5_Z,
    rsv6,
    loadRsv_Schedule6_X,
    loadRsv_Schedule6_Y,
    loadRsv_Schedule6_Z,
    rsv7,
    loadRsv_Schedule7_X,
    loadRsv_Schedule7_Y,
    loadRsv_Schedule7_Z,
  } = useTeachersRsv_schedule();
  let today = new Date(dateValue);
  let dy = new Date(dateValue);
  let dy2 = new Date(dateValue);
  let dy3 = new Date(dateValue);
  let dy4 = new Date(dateValue);
  let dy5 = new Date(dateValue);
  let dy6 = new Date(dateValue);
  let dy7 = new Date(dateValue);

  dy.setDate(dy.getDate() + 1);
  dy2.setDate(dy2.getDate() + 2);
  dy3.setDate(dy3.getDate() + 3);
  dy4.setDate(dy4.getDate() + 4);
  dy5.setDate(dy5.getDate() + 5);
  dy6.setDate(dy6.getDate() + 6);

  const y = today.getFullYear();
  const m = today.getMonth();
  const d = today.getDate();
  let xxx = new Date(y, m, d - 7, 12, 0, 0);
  let yyy = new Date(y, m, d + 7, 12, 0, 0);
  let xx = new Date(y, m, d, 12, 0, 0);

  const y2 = dy.getFullYear();
  const m2 = dy.getMonth();
  const d2 = dy.getDate();
  let xxx2 = new Date(y2, m2, d2 - 7, 12, 0, 0);
  let yyy2 = new Date(y2, m2, d2 + 7, 12, 0, 0);
  let xx2 = new Date(y2, m2, d2, 12, 0, 0);

  const y3 = dy2.getFullYear();
  const m3 = dy2.getMonth();
  const d3 = dy2.getDate();
  let xx3 = new Date(y3, m3, d3, 12, 0, 0);
  let xxx3 = new Date(y3, m3, d3 - 7, 12, 0, 0);
  let yyy3 = new Date(y3, m3, d3 + 7, 12, 0, 0);

  const y4 = dy3.getFullYear();
  const m4 = dy3.getMonth();
  const d4 = dy3.getDate();
  let xx4 = new Date(y4, m4, d4, 12, 0, 0);
  let xxx4 = new Date(y4, m4, d4 - 7, 12, 0, 0);
  let yyy4 = new Date(y4, m4, d4 + 7, 12, 0, 0);

  const y5 = dy4.getFullYear();
  const m5 = dy4.getMonth();
  const d5 = dy4.getDate();
  let xx5 = new Date(y5, m5, d5, 12, 0, 0);
  let xxx5 = new Date(y5, m5, d5 - 7, 12, 0, 0);
  let yyy5 = new Date(y5, m5, d5 + 7, 12, 0, 0);

  const y6 = dy5.getFullYear();
  const m6 = dy5.getMonth();
  const d6 = dy5.getDate();
  let xx6 = new Date(y6, m6, d6, 12, 0, 0);
  let xxx6 = new Date(y6, m6, d6 - 7, 12, 0, 0);
  let yyy6 = new Date(y6, m6, d6 + 7, 12, 0, 0);

  const y7 = dy6.getFullYear();
  const m7 = dy6.getMonth();
  const d7 = dy6.getDate();
  let xx7 = new Date(y7, m7, d7, 12, 0, 0);
  let xxx7 = new Date(y7, m7, d7 - 7, 12, 0, 0);
  let yyy7 = new Date(y7, m7, d7 + 7, 12, 0, 0);
  //時間を配列に（10:00 ~ 18:00）
  const time_arr = [10, 11, 12, 13, 14, 15, 16, 17, 18];
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    loadUser_query(query_.id).then(() => {
      loadRsv_Schedule1_X(user_query && user_query.userName, xx);
      loadRsv_Schedule2_X(user_query && user_query.userName, xx2);
      loadRsv_Schedule3_X(user_query && user_query.userName, xx3);
      loadRsv_Schedule4_X(user_query && user_query.userName, xx4);
      loadRsv_Schedule5_X(user_query && user_query.userName, xx5);
      loadRsv_Schedule6_X(user_query && user_query.userName, xx6);
      loadRsv_Schedule7_X(user_query && user_query.userName, xx7);
    });
  }, [process.browser, user, query_.id]);

  return (
    <>
      <React.Fragment>
        <MediaContextProvider>
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
                    changeDateValue(dy7.setDate(dy7.getDate() - 7));
                    loadRsv_Schedule1_Y(user_query && user_query.userName, xxx);
                    loadRsv_Schedule2_Y(
                      user_query && user_query.userName,
                      xxx2
                    );
                    loadRsv_Schedule3_Y(
                      user_query && user_query.userName,
                      xxx3
                    );
                    loadRsv_Schedule4_Y(
                      user_query && user_query.userName,
                      xxx4
                    );
                    loadRsv_Schedule5_Y(
                      user_query && user_query.userName,
                      xxx5
                    );
                    loadRsv_Schedule6_Y(
                      user_query && user_query.userName,
                      xxx6
                    );
                    loadRsv_Schedule7_Y(
                      user_query && user_query.userName,
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
                  {`${today.getFullYear()}/${today.getMonth() + 1}`}
                </Box>
                <IconButton
                  onClick={() => {
                    changeDateValue(dy7.setDate(dy7.getDate() + 7));
                    loadRsv_Schedule1_Z(user_query && user_query.userName, yyy);
                    loadRsv_Schedule2_Z(
                      user_query && user_query.userName,
                      yyy2
                    );
                    loadRsv_Schedule3_Z(
                      user_query && user_query.userName,
                      yyy3
                    );
                    loadRsv_Schedule4_Z(
                      user_query && user_query.userName,
                      yyy4
                    );
                    loadRsv_Schedule5_Z(
                      user_query && user_query.userName,
                      yyy5
                    );
                    loadRsv_Schedule6_Z(
                      user_query && user_query.userName,
                      yyy6
                    );
                    loadRsv_Schedule7_Z(
                      user_query && user_query.userName,
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
                    <TableCellComponent6 date={today} />
                    <TableCellComponent6 date={dy} />
                    <TableCellComponent6 date={dy2} />
                    <TableCellComponent6 date={dy3} />
                    <TableCellComponent6 date={dy4} />
                    <TableCellComponent6 date={dy5} />
                    <TableCellComponent6 date={dy6} />
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
                      <TableCellComponent5
                        reserve={rsv && rsv}
                        time={t}
                        teacher={user_query && user_query.userName}
                      />
                      <TableCellComponent5
                        reserve={rsv2 && rsv2}
                        time={t}
                        teacher={user_query && user_query.userName}
                      />
                      <TableCellComponent5
                        reserve={rsv3 && rsv3}
                        time={t}
                        teacher={user_query && user_query.userName}
                      />
                      <TableCellComponent5
                        reserve={rsv4 && rsv4}
                        time={t}
                        teacher={user_query && user_query.userName}
                      />
                      <TableCellComponent5
                        reserve={rsv5 && rsv5}
                        time={t}
                        teacher={user_query && user_query.userName}
                      />
                      <TableCellComponent5
                        reserve={rsv6 && rsv6}
                        time={t}
                        teacher={user_query && user_query.userName}
                      />
                      <TableCellComponent5
                        reserve={rsv7 && rsv7}
                        time={t}
                        teacher={user_query && user_query.userName}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Media>
          </>
          {loadUserError && loadUserError == true && (
            <AlertComponent>講師情報の読み取りに失敗しました</AlertComponent>
          )}
          <GetRsvModal
            date={rsvDate}
            teacher={user_query && user_query.userName}
            student={user && user.displayName}
            clickEv={(e) => {
              loadGetReserves(
                e,
                newDateTime,
                rsvTime,
                user && user.displayName,
                id,
                user && user.uid,
                handleClose2()
              ).then(() => {
                loadRsv_Schedule1_X(user_query && user_query.userName, xx);
                loadRsv_Schedule2_X(user_query && user_query.userName, xx2);
                loadRsv_Schedule3_X(user_query && user_query.userName, xx3);
                loadRsv_Schedule4_X(user_query && user_query.userName, xx4);
                loadRsv_Schedule5_X(user_query && user_query.userName, xx5);
                loadRsv_Schedule6_X(user_query && user_query.userName, xx6);
                loadRsv_Schedule7_X(user_query && user_query.userName, xx7);
              });
            }}
          />
          <SelectTeacherModal users={usersList && usersList} load={2} />
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
