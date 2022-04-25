import * as React from "react";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
// import my File
import { useReserves_Today } from "../../../hooks/firebase/manager/useReserves";
import { useHandle } from "../../../hooks/useHandle";
import { useChancelRsv } from "../../../hooks/firebase/manager/useReserves";
import { useShiftList_newDate } from "../../../hooks/firebase/manager/useShift";
import { useDate } from "../../../hooks/date/useDate";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import RsvModal from "../../templates/Modal/RsvModal";
import Title from "../../atoms/Text/PrimaryTitle";
import AlertComponent from "../../atoms/Alert/Alert";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useSelectUser_query } from "../../../hooks/firebase/user/useUserList";

const YoyakuListToday = () => {
  const { selectRsv, rsvData } = useSelectReserve();
  const { user_query, loadUser_query } = useSelectUser_query();
  const { user } = useAuth();
  const { rsv_today, loadRsv, error } = useReserves_Today();
  const { newDateTime } = useDate();
  const { loadShift } = useShiftList_newDate();
  const { handleClose4, handleOpen4 } = useHandle();
  const { chancelRsv } = useChancelRsv();
  React.useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    loadUser_query(user?.uid);
    console.log(user);
    console.log(user_query);
  }, [process.browser, user]);
  const companyId = user_query?.companyId;
  return (
    <React.Fragment>
      <Box>
        <CardContent
          style={{
            width: "95%",
            borderRadius: "7px",
            borderStyle: "solid",
            borderWidth: "2px",
            borderColor: "#4689FF",
            margin: "auto",
          }}
        >
          <Box>
            <Box display="flex" mb={3} ml={3}>
              <Title>本日の予約</Title>
            </Box>
            <Grid item sm={20}>
              <Table size="small">
                <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                  <TableRow>
                    <TableCell style={{ fontWeight: 600 }}>担当者名</TableCell>
                    <TableCell style={{ fontWeight: 600 }}>顧客名</TableCell>
                    <TableCell style={{ fontWeight: 600 }}>予約日時</TableCell>
                    <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rsv_today &&
                    rsv_today.map((rsv) => (
                      <TableRow key={rsv.id}>
                        <TableCell>{rsv.staff}</TableCell>
                        <TableCell>{rsv.person}</TableCell>
                        <TableCell>
                          {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                        </TableCell>
                        <TableCell>
                          {`${rsv.time}:00`}
                          <Tooltip title="詳細確認・キャンセル" arrow>
                            <IconButton
                              onClick={() => {
                                handleOpen4();
                                selectRsv(rsv);
                              }}
                            >
                              <EditIcon sx={{ color: "teal", ml: 3 }} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {error && error == true && (
                <AlertComponent>本日の予約はありません</AlertComponent>
              )}
            </Grid>
          </Box>
        </CardContent>
        <RsvModal
          date={rsvData.date}
          teacher={rsvData.teacher}
          student={rsvData.rsvStudent}
          phoneNumber={rsvData.phoneNumber}
          email={rsvData.email}
          reserver={rsvData.reserver}
          chancelRsv={(e) => {
            chancelRsv(e, rsvData.id, handleClose4()).then(() => {
              loadRsv(companyId);
              loadShift(newDateTime, companyId);
            });
          }}
        />
      </Box>
      <ToastContainer />
    </React.Fragment>
  );
};

export default YoyakuListToday;
