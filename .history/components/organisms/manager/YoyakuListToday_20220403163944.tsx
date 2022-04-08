import React, { useState } from "react";
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
import { useReserves_Today } from "../../../hooks/manager/useReserves";
import { useHandle } from "../../../hooks/handle/useHandle";
import { useChancelRsv } from "../../../hooks/manager/useReserves";
import { useShiftList_newDate } from "../../../hooks/manager/shift/useShift";
import { useDate } from "../../../hooks/date/useDate";
import RsvModal from "../../templates/Modal/RsvModal";
import Title from "../../atoms/Title";
import AlertComponent from "../../atoms/Alert";

export default function YoyakuListToday() {
  console.log("今日の予約");
  const { rsv_today, loadRsv, error } = useReserves_Today();
  const { newDateTime } = useDate();
  const { loadFreeSpace_newValue } = useShiftList_newDate();
  const { handleClose4, handleOpen4 } = useHandle();
  const { chancelRsv } = useChancelRsv();
  const [rsvDate, setRsvDate] = useState("");
  const [teacher, setTeacher] = useState("");
  const [student, setStudent] = useState("");
  const [rsvId, setRsvId] = useState("");
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
              <Title>本日のレッスン</Title>
            </Box>
            <Grid item sm={20}>
              <Table size="small">
                <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                  <TableRow>
                    <TableCell style={{ fontWeight: 600 }}>講師名</TableCell>
                    <TableCell style={{ fontWeight: 600 }}>生徒名</TableCell>
                    <TableCell style={{ fontWeight: 600 }}>予約日時</TableCell>
                    <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rsv_today &&
                    rsv_today.map((rsv) => (
                      <TableRow key={rsv.id}>
                        <TableCell>{rsv.teacher}</TableCell>
                        <TableCell>{rsv.student}</TableCell>
                        <TableCell>
                          {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                        </TableCell>
                        <TableCell>
                          {`${rsv.time}:00`}
                          <Tooltip title="詳細確認・キャンセル" arrow>
                            <IconButton
                              onClick={() => {
                                handleOpen4();
                                setRsvId(rsv.id);
                                setStudent(rsv.student);
                                setTeacher(rsv.teacher);
                                setRsvDate(
                                  `${dayjs(rsv.date.toDate()).format(
                                    "YYYY/MM/DD "
                                  )} ${rsv.time}:00~`
                                );
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
                <AlertComponent>本日のレッスンはありません</AlertComponent>
              )}
            </Grid>
          </Box>
        </CardContent>
        <RsvModal
          date={rsvDate}
          teacher={teacher}
          student={student}
          chancelRsv={(e) => {
            chancelRsv(e, rsvId, loadRsv()).then(() => {
              loadFreeSpace_newValue(newDateTime);
            });
            handleClose4();
          }}
        />
      </Box>
      <ToastContainer />
    </React.Fragment>
  );
}
