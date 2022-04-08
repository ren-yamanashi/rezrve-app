import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { styled } from "@mui/material/styles";
import { createMedia } from "@artsy/fresnel";
import { blue, grey, teal } from "@mui/material/colors";
// import my File
import { useSchedule } from "../../../hooks/manager/useReserves";
import {
  useTeacherList,
  useStudentsList,
} from "../../../hooks/user/useUserList";
import { useDate } from "../../../hooks/date/useDate";
import { useHandle } from "../../../hooks/handle/useHandle";
import { useCreateShift } from "../../../hooks/manager/shift/useCreateShift";
import { useGetReserves } from "../../../hooks/manager/useReserves";
import { useChancelRsv } from "../../../hooks/manager/useReserves";
import DateRangePicker from "../../atoms/Date/Date ";
import CreateShiftModal from "../../templates/Modal/CreateShift_manager";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import SearchStudentModal from "../../templates/Modal/SearchStudentModal";
import RsvModal from "../../templates/Modal/RsvModal";
//MediaQuery設定
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1000,
    xl: 1220,
  },
});
//Itemのスタイル
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "#FFFFDD",
}));
const Item2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

//Modalのスタイル
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

//スケジュール表の作成　全てのスケジュールを参照することができる。
//※ただし、このサイトリンクが表示されるのは名前に「管理者」がつく場合のみ
export default function SelectDayAll() {
  const { changeDateValue, newDateTime, dateValue } = useDate();
  const { handleOpen3 } = useHandle();
  const { createShift } = useCreateShift();
  const { chancelRsv } = useChancelRsv();
  const { usersList } = useTeacherList();
  const { studentsList, loadSearchStudentsList } = useStudentsList();
  const { getReserves } = useGetReserves();
  const {
    loadSchedule,
    rsv,
    loadSchedule10,
    rsv10,
    error10,
    loadSchedule11,
    rsv11,
    error11,
    loadSchedule12,
    rsv12,
    error12,
    loadSchedule13,
    rsv13,
    error13,
    loadSchedule14,
    rsv14,
    error14,
    loadSchedule15,
    rsv15,
    error15,
    loadSchedule16,
    rsv16,
    error16,
    loadSchedule17,
    rsv17,
    error17,
    loadSchedule18,
    rsv18,
    error18,
  } = useSchedule();
  const [student, setStudent] = useState("");
  const [student2, setStudent2] = useState("");
  const [teacher, setTeacher] = useState("");
  const [open4, setOpen4] = useState(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);
  const [rsvDate, setRsvDate] = useState("");
  const [rsvNum, setRsvNum] = useState("");
  const [rsvTime, setRsvTime] = useState<number>();
  const [time, setTime] = React.useState<number | string>("");
  const [teacherId, setTeacherId] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };
  return (
    <>
      <React.Fragment>
        <DateRangePicker
          value={dateValue}
          changeDate={async (newValue) => {
            //onChangeに直接記述しないとうまく動作しない（setValue と　value に1回分のずれが生じる）
            changeDateValue(newValue);
            const day3 = new Date(newValue);
            const y3 = day3.getFullYear();
            const m3 = day3.getMonth();
            const d3 = day3.getDate();
            let newDate = new Date(y3, m3, d3, 12, 0, 0);
            loadSchedule(newDate);
            loadSchedule10(newDate),
              loadSchedule11(newDate),
              loadSchedule12(newDate),
              loadSchedule13(newDate),
              loadSchedule14(newDate),
              loadSchedule15(newDate);
            loadSchedule16(newDate);
            loadSchedule17(newDate);
            loadSchedule18(newDate);
          }}
        />
        <Box>
          <Table size="small" sx={{ my: 3, border: "2px", minWidth: "1000px" }}>
            <TableHead style={{ backgroundColor: "#FFFFDD", border: "3px" }}>
              <TableRow>
                <TableCell style={{ fontWeight: 600, width: "20%" }}>
                  講師名
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  10:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  11:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  12:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  13:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  14:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  15:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  16:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  17:00
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "8%" }}>
                  18:00
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList &&
                usersList.map((uu) => (
                  <TableRow key={uu.id}>
                    <TableCell style={{ fontWeight: 600 }}>
                      <MediaContextProvider>
                        <Box display="flex">
                          <Media greaterThan="lg">
                            <Box
                              component="img"
                              sx={{
                                height: 40,
                                width: 40,
                                borderRadius: "50%",
                              }}
                              alt={uu.userName}
                              src={uu.url}
                            />
                          </Media>
                          <Box
                            sx={{
                              textAlign: "center",
                              my: "auto",
                              ml: 1,
                              fontSize: "13px",
                            }}
                          >
                            {uu.userName}
                          </Box>
                        </Box>
                        <Media greaterThan="lg">
                          <ListItem
                            key="editUser"
                            onClick={() => {
                              handleOpen3();
                              setTeacherName(uu.userName);
                            }}
                            sx={{ cursor: "pointer" }}
                          >
                            <PersonAddAltIcon
                              sx={{ color: blue[500], mr: 2 }}
                            />
                            <Box sx={{ color: blue[500], fontSize: "13px" }}>
                              シフトを登録
                            </Box>
                          </ListItem>
                        </Media>
                        <Media at="lg">
                          <Tooltip title="シフトを登録" arrow>
                            <ListItem
                              key="editUser"
                              onClick={() => {
                                handleOpen3();
                                setTeacherName(uu.userName);
                                setTeacherId(uu.id);
                              }}
                              sx={{ cursor: "pointer" }}
                            >
                              <PersonAddAltIcon
                                sx={{ color: blue[500], mr: 2 }}
                              />
                            </ListItem>
                          </Tooltip>
                        </Media>
                      </MediaContextProvider>
                    </TableCell>
                    <CreateShiftModal
                      teacher={teacherName}
                      time={time}
                      changeSelect={handleChange}
                      createShift={(e) =>
                        createShift(
                          e,
                          teacherName,
                          time,
                          console.log("シフト提出"),
                          teacherId
                        )
                      }
                    />
                    <TableCell
                      sx={{
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        cursor: "pointer",
                        height: 50,
                        bgcolor:
                          rsv10 &&
                          rsv10.map(
                            (item) =>
                              uu.userName == item.teacher &&
                              (item.student !== "" ? teal[300] : blue[200])
                          ),
                      }}
                      onClick={() => {
                        rsv10 &&
                          rsv10.map((item) => {
                            uu.userName == item.teacher && setRsvNum(item.id);
                            uu.userName == item.teacher &&
                              setTeacher(item.teacher);
                            uu.userName == item.teacher &&
                              setStudent2(item.student);
                            uu.userName == item.teacher &&
                              setRsvTime(item.time);
                            uu.userName == item.teacher &&
                              setRsvDate(
                                `${dayjs(item.date.toDate()).format(
                                  "YYYY/MM/DD "
                                )} ${item.time}:00~`
                              );
                            uu.userName == item.teacher &&
                              (item.student !== ""
                                ? handleOpen4()
                                : handleOpen3());
                          });
                      }}
                    >
                      {rsv10 &&
                        rsv10.map(
                          (item) =>
                            uu.userName == item.teacher &&
                            (item.student !== "" ? (
                              <Tooltip
                                title={
                                  <>
                                    <Box>{`講師名:${item.teacher}`}</Box>
                                    <Box>{`生徒名:${item.student}`}</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: teal[300],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: teal[300] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip
                                title={
                                  <>
                                    <Box>クリックして予約</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: blue[200],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: blue[200] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ))
                        )}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        cursor: "pointer",
                        height: 50,
                        bgcolor:
                          rsv11 &&
                          rsv11.map(
                            (item) =>
                              uu.userName == item.teacher &&
                              (item.student !== "" ? teal[300] : blue[200])
                          ),
                      }}
                      onClick={() =>
                        rsv11 &&
                        rsv11.map((item) => {
                          uu.userName == item.teacher && setRsvNum(item.id);
                          uu.userName == item.teacher &&
                            setTeacher(item.teacher);
                          uu.userName == item.teacher &&
                            setStudent2(item.student);
                          uu.userName == item.teacher && setRsvTime(item.time);
                          uu.userName == item.teacher &&
                            setRsvDate(
                              `${dayjs(item.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${item.time}:00~`
                            );
                          uu.userName == item.teacher &&
                            (item.student !== ""
                              ? handleOpen4()
                              : handleOpen3());
                        })
                      }
                    >
                      {rsv11 &&
                        rsv11.map(
                          (item) =>
                            uu.userName == item.teacher &&
                            (item.student !== "" ? (
                              <Tooltip
                                title={
                                  <>
                                    <Box>{`講師名:${item.teacher}`}</Box>
                                    <Box>{`生徒名:${item.student}`}</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: teal[300],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: teal[300] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip
                                title={
                                  <>
                                    <Box>クリックして予約</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: blue[200],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: blue[200] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ))
                        )}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        cursor: "pointer",
                        height: 50,
                        bgcolor:
                          rsv12 &&
                          rsv12.map(
                            (item) =>
                              uu.userName == item.teacher &&
                              (item.student !== "" ? teal[300] : blue[200])
                          ),
                      }}
                      onClick={() =>
                        rsv12 &&
                        rsv12.map((item) => {
                          uu.userName == item.teacher && setRsvNum(item.id);
                          uu.userName == item.teacher &&
                            setTeacher(item.teacher);
                          uu.userName == item.teacher &&
                            setStudent2(item.student);
                          uu.userName == item.teacher && setRsvTime(item.time);
                          uu.userName == item.teacher &&
                            setRsvDate(
                              `${dayjs(item.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${item.time}:00~`
                            );
                          uu.userName == item.teacher &&
                            (item.student !== ""
                              ? handleOpen4()
                              : handleOpen3());
                        })
                      }
                    >
                      {rsv12 &&
                        rsv12.map(
                          (item) =>
                            uu.userName == item.teacher &&
                            (item.student !== "" ? (
                              <Tooltip
                                title={
                                  <>
                                    <Box>{`講師名:${item.teacher}`}</Box>
                                    <Box>{`生徒名:${item.student}`}</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: teal[300],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: teal[300] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip
                                title={
                                  <>
                                    <Box>クリックして予約</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: blue[200],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: blue[200] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ))
                        )}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        cursor: "pointer",
                        height: 50,
                        bgcolor:
                          rsv13 &&
                          rsv13.map(
                            (item) =>
                              uu.userName == item.teacher &&
                              (item.student !== "" ? teal[300] : blue[200])
                          ),
                      }}
                      onClick={() =>
                        rsv13 &&
                        rsv13.map((item) => {
                          uu.userName == item.teacher && setRsvNum(item.id);
                          uu.userName == item.teacher &&
                            setTeacher(item.teacher);
                          uu.userName == item.teacher &&
                            setStudent2(item.student);
                          uu.userName == item.teacher && setRsvTime(item.time);
                          uu.userName == item.teacher &&
                            setRsvDate(
                              `${dayjs(item.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${item.time}:00~`
                            );
                          uu.userName == item.teacher &&
                            (item.student !== ""
                              ? handleOpen4()
                              : handleOpen3());
                        })
                      }
                    >
                      {rsv13 &&
                        rsv13.map(
                          (item) =>
                            uu.userName == item.teacher &&
                            (item.student !== "" ? (
                              <Tooltip
                                title={
                                  <>
                                    <Box>{`講師名:${item.teacher}`}</Box>
                                    <Box>{`生徒名:${item.student}`}</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: teal[300],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: teal[300] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip
                                title={
                                  <>
                                    <Box>クリックして予約</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: blue[200],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: blue[200] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ))
                        )}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        cursor: "pointer",
                        height: 50,
                        bgcolor:
                          rsv14 &&
                          rsv14.map(
                            (item) =>
                              uu.userName == item.teacher &&
                              (item.student !== "" ? teal[300] : blue[200])
                          ),
                      }}
                      onClick={() =>
                        rsv14 &&
                        rsv14.map((item) => {
                          uu.userName == item.teacher && setRsvNum(item.id);
                          uu.userName == item.teacher &&
                            setTeacher(item.teacher);
                          uu.userName == item.teacher &&
                            setStudent2(item.student);
                          uu.userName == item.teacher && setRsvTime(item.time);
                          uu.userName == item.teacher &&
                            setRsvDate(
                              `${dayjs(item.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${item.time}:00~`
                            );
                          uu.userName == item.teacher &&
                            (item.student !== ""
                              ? handleOpen4()
                              : handleOpen3());
                        })
                      }
                    >
                      {rsv14 &&
                        rsv14.map(
                          (item) =>
                            uu.userName == item.teacher &&
                            (item.student !== "" ? (
                              <Tooltip
                                title={
                                  <>
                                    <Box>{`講師名:${item.teacher}`}</Box>
                                    <Box>{`生徒名:${item.student}`}</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: teal[300],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: teal[300] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip
                                title={
                                  <>
                                    <Box>クリックして予約</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: blue[200],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: blue[200] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ))
                        )}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        cursor: "pointer",
                        height: 50,
                        bgcolor:
                          rsv15 &&
                          rsv15.map(
                            (item) =>
                              uu.userName == item.teacher &&
                              (item.student !== "" ? teal[300] : blue[200])
                          ),
                      }}
                      onClick={() =>
                        rsv15 &&
                        rsv15.map((item) => {
                          uu.userName == item.teacher && setRsvNum(item.id);
                          uu.userName == item.teacher &&
                            setTeacher(item.teacher);
                          uu.userName == item.teacher &&
                            setStudent2(item.student);
                          uu.userName == item.teacher && setRsvTime(item.time);
                          uu.userName == item.teacher &&
                            setRsvDate(
                              `${dayjs(item.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${item.time}:00~`
                            );
                          uu.userName == item.teacher &&
                            (item.student !== ""
                              ? handleOpen4()
                              : handleOpen3());
                        })
                      }
                    >
                      {rsv15 &&
                        rsv15.map(
                          (item) =>
                            uu.userName == item.teacher &&
                            (item.student !== "" ? (
                              <Tooltip
                                title={
                                  <>
                                    <Box>{`講師名:${item.teacher}`}</Box>
                                    <Box>{`生徒名:${item.student}`}</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: teal[300],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: teal[300] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip
                                title={
                                  <>
                                    <Box>クリックして予約</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: blue[200],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: blue[200] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ))
                        )}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        cursor: "pointer",
                        height: 50,
                        bgcolor:
                          rsv16 &&
                          rsv16.map(
                            (item) =>
                              uu.userName == item.teacher &&
                              (item.student !== "" ? teal[300] : blue[200])
                          ),
                      }}
                      onClick={() =>
                        rsv16 &&
                        rsv16.map((item) => {
                          uu.userName == item.teacher && setRsvNum(item.id);
                          uu.userName == item.teacher &&
                            setTeacher(item.teacher);
                          uu.userName == item.teacher &&
                            setStudent2(item.student);
                          uu.userName == item.teacher && setRsvTime(item.time);
                          uu.userName == item.teacher &&
                            setRsvDate(
                              `${dayjs(item.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${item.time}:00~`
                            );
                          uu.userName == item.teacher &&
                            (item.student !== ""
                              ? handleOpen4()
                              : handleOpen3());
                        })
                      }
                    >
                      {rsv16 &&
                        rsv16.map(
                          (item) =>
                            uu.userName == item.teacher &&
                            (item.student !== "" ? (
                              <Tooltip
                                title={
                                  <>
                                    <Box>{`講師名:${item.teacher}`}</Box>
                                    <Box>{`生徒名:${item.student}`}</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: teal[300],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: teal[300] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip
                                title={
                                  <>
                                    <Box>クリックして予約</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: blue[200],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: blue[200] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ))
                        )}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        cursor: "pointer",
                        height: 50,
                        bgcolor:
                          rsv17 &&
                          rsv17.map(
                            (item) =>
                              uu.userName == item.teacher &&
                              (item.student !== "" ? teal[300] : blue[200])
                          ),
                      }}
                      onClick={() =>
                        rsv17 &&
                        rsv17.map((item) => {
                          uu.userName == item.teacher && setRsvNum(item.id);
                          uu.userName == item.teacher &&
                            setTeacher(item.teacher);
                          uu.userName == item.teacher &&
                            setStudent2(item.student);
                          uu.userName == item.teacher && setRsvTime(item.time);
                          uu.userName == item.teacher &&
                            setRsvDate(
                              `${dayjs(item.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${item.time}:00~`
                            );
                          uu.userName == item.teacher &&
                            (item.student !== ""
                              ? handleOpen4()
                              : handleOpen3());
                        })
                      }
                    >
                      {rsv17 &&
                        rsv17.map(
                          (item) =>
                            uu.userName == item.teacher &&
                            (item.student !== "" ? (
                              <Tooltip
                                title={
                                  <>
                                    <Box>{`講師名:${item.teacher}`}</Box>
                                    <Box>{`生徒名:${item.student}`}</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: teal[300],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: teal[300] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip
                                title={
                                  <>
                                    <Box>クリックして予約</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: blue[200],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: blue[200] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ))
                        )}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        cursor: "pointer",
                        height: 50,
                        bgcolor:
                          rsv18 &&
                          rsv18.map(
                            (item) =>
                              uu.userName == item.teacher &&
                              (item.student !== "" ? teal[300] : blue[200])
                          ),
                      }}
                      onClick={() =>
                        rsv18 &&
                        rsv18.map((item) => {
                          uu.userName == item.teacher && setRsvNum(item.id);
                          uu.userName == item.teacher &&
                            setTeacher(item.teacher);
                          uu.userName == item.teacher &&
                            setStudent2(item.student);
                          uu.userName == item.teacher && setRsvTime(item.time);
                          uu.userName == item.teacher &&
                            setRsvDate(
                              `${dayjs(item.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${item.time}:00~`
                            );
                          uu.userName == item.teacher &&
                            (item.student !== ""
                              ? handleOpen4()
                              : handleOpen3());
                        })
                      }
                    >
                      {rsv18 &&
                        rsv18.map(
                          (item) =>
                            uu.userName == item.teacher &&
                            (item.student !== "" ? (
                              <Tooltip
                                title={
                                  <>
                                    <Box>{`講師名:${item.teacher}`}</Box>
                                    <Box>{`生徒名:${item.student}`}</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: teal[300],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: teal[300] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip
                                title={
                                  <>
                                    <Box>クリックして予約</Box>
                                    <Box>{`レッスン日時:${dayjs(
                                      item.date.toDate()
                                    ).format("YYYY/MM/DD ")} ${
                                      item.time
                                    }:00~`}</Box>
                                  </>
                                }
                              >
                                <Button
                                  sx={{
                                    bgcolor: blue[200],
                                    boxShadow: "none",
                                    height: 30,
                                    "&:hover": { bgcolor: blue[200] },
                                  }}
                                  fullWidth
                                />
                              </Tooltip>
                            ))
                        )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>

        {/* 予約登録確認　モーダル作成 */}
        <GetRsvModal
          date={rsvDate}
          teacher={teacher}
          student={student}
          clickEv={(e) => {
            getReserves(e, newDateTime, rsvTime, studentName, rsvNum).then(
              () => {
                loadSchedule(newDateTime);
                loadSchedule10(newDateTime),
                  loadSchedule11(newDateTime),
                  loadSchedule12(newDateTime),
                  loadSchedule13(newDateTime),
                  loadSchedule14(newDateTime),
                  loadSchedule15(newDateTime);
                loadSchedule16(newDateTime);
                loadSchedule17(newDateTime);
                loadSchedule18(newDateTime);
              }
            );
          }}
        />
        <SearchStudentModal
          changeEvent={(e) => setStudent(e.target.value)}
          searchStudent={() => loadSearchStudentsList(student)}
          users={studentsList && studentsList}
        />

        {/* モーダル　予約内容詳細 */}
        <RsvModal
          date={rsvDate}
          teacher={teacher}
          student={student}
          chancelRsv={(e) => {
            chancelRsv(e, rsvNum, loadSchedule(newDateTime));
            handleClose4();
          }}
        />
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
