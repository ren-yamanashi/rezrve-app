import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
  startAt,
  limit,
  endAt,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { styled } from "@mui/material/styles";
import { createMedia } from "@artsy/fresnel";
import { useRouter } from "next/router";
import { browser } from "process";
import { blue, grey, teal } from "@mui/material/colors";
import { ja } from "date-fns/locale";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import { Users } from "../../../models/Users";
import { useSchedule } from "../../../hooks/manager/useReserves";
import {
  useTeacherList,
  useStudentsList,
} from "../../../hooks/user/useUserList";
import { useDate } from "../../../hooks/date/useDate";
import { useHandle } from "../../../hooks/handle/useHandle";
import { useCreateShift } from "../../../hooks/manager/shift/useCreateShift";
import DateRangePicker from "../../atoms/Date/Date ";
import CreateShiftModal from "../../templates/Modal/CreateShift_manager";
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
  const db = getFirestore();
  const { changeDateValue, newDateTime, dateValue } = useDate();
  const { handleOpen3 } = useHandle();
  const { createShift } = useCreateShift();
  const { usersList } = useTeacherList();
  const { studentsList } = useStudentsList();
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

  const [users2, setUsers2] = useState<Users[]>([]); //生徒用
  const [value, setValue] = useState<Date | null>(new Date());
  const [student, setStudent] = useState("");
  const [student2, setStudent2] = useState("");
  const [teacher, setTeacher] = useState("");
  const [err2, setErr2] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false); //予約詳細確認
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);
  const [rsvDate, setRsvDate] = useState("");
  const [rsvNum, setRsvNum] = useState("");
  const [rsvTime, setRsvTime] = useState<number>();
  const [userNum, setUserNum] = useState("");
  const [age, setAge] = React.useState<number | string>("");
  const [uuu, setUuu] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const day = new Date(dateValue);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
  /**=========
   * 予約登録
   *========*/
  const getRsv = async (e: any) => {
    e.preventDefault();
    const q = query(
      collection(db, "FreeSpace"),
      where("date", "==", timestamp(newDateTime)),
      where("time", "==", rsvTime),
      where("student", "==", student)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      await updateDoc(doc(db, "FreeSpace", rsvNum), {
        student: student,
        reserved: true,
        reserverUid: userNum,
        reserveAt: serverTimestamp(),
      }).then(() => {
        handleClose2();
        loadRsv10();
        loadRsv11();
        loadRsv12();
        loadRsv13();
        loadRsv14();
        loadRsv15();
        loadRsv16();
        loadRsv17();
        loadRsv18();
        toast.success("予約を登録しました", {
          position: "bottom-left",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    } else {
      setErr2(true);
      return;
    }
  };
  /**=======
   * キャンセル処理
   *======*/
  const deleteRsv = async (e: any) => {
    e.stopPropagation();
    await updateDoc(doc(db, "FreeSpace", rsvNum), {
      reserved: false,
      student: "",
      reserverUid: "",
    }).then(async () => {
      handleClose4();
      loadRsv10();
      loadRsv11();
      loadRsv12();
      loadRsv13();
      loadRsv14();
      loadRsv15();
      loadRsv16();
      loadRsv17();
      loadRsv18();
      toast.success("キャンセルしました", {
        position: "bottom-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
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
                              setUuu(uu.userName);
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
                                setUuu(uu.userName);
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
                      teacher={uuu}
                      time={age}
                      changeSelect={handleChange}
                      createShift={(e) =>
                        createShift(
                          e,
                          teacher,
                          rsvTime,
                          console.log("シフト提出")
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
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack spacing={2} sx={{ width: "100%", my: 3, mx: "auto" }}>
              <SnackbarContent
                sx={{
                  bgcolor: blue[400],
                  justifyContent: "center",
                  boxShadow: "none",
                  fontWeight: 600,
                }}
                message={"予約登録確認"}
              />
            </Stack>
            <Box display="flex">
              <Typography
                variant="h5"
                component="div"
                color="black"
                textAlign="center"
                mx="auto"
                fontSize={17}
                fontWeight={400}
                mb={3}
              >
                以下の内容で予約登録します
              </Typography>
            </Box>
            <Item sx={{ my: 2 }}>
              <Box display="flex">
                <Typography
                  variant="h5"
                  component="div"
                  color="black"
                  textAlign="center"
                  mx="auto"
                  fontSize={19}
                  width={90}
                  fontWeight={500}
                >
                  予約情報
                </Typography>
              </Box>
            </Item>
            <Item2 sx={{ my: 2 }}>
              <Box display="flex">
                <Typography
                  variant="h5"
                  component="div"
                  ml={1}
                  color="black"
                  textAlign="left"
                  fontSize={17}
                  width={90}
                  fontWeight={400}
                >
                  予約日時
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  ml={5}
                  color={grey[600]}
                  textAlign="left"
                  fontSize={17}
                >
                  {rsvDate}
                </Typography>
              </Box>
            </Item2>
            <Item sx={{ my: 2 }}>
              <Box display="flex">
                <Typography
                  variant="h5"
                  component="div"
                  ml={1}
                  color="black"
                  textAlign="left"
                  fontSize={17}
                  width={90}
                  fontWeight={400}
                >
                  担当者
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  ml={5}
                  color={grey[600]}
                  textAlign="left"
                  fontSize={17}
                >
                  {teacher}
                </Typography>
              </Box>
            </Item>
            <Item2 sx={{ my: 2 }}>
              <Box display="flex">
                <Typography
                  variant="h5"
                  component="div"
                  ml={1}
                  color="black"
                  textAlign="left"
                  fontSize={17}
                  width={90}
                  fontWeight={400}
                >
                  お客様名
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  ml={5}
                  color={grey[600]}
                  textAlign="left"
                  fontSize={17}
                >
                  {student}
                </Typography>
              </Box>
            </Item2>
            <Item sx={{ my: 2 }}>
              <Box display="flex">
                <Typography
                  variant="h5"
                  component="div"
                  ml={1}
                  color="black"
                  textAlign="left"
                  fontSize={17}
                  width={90}
                  fontWeight={400}
                >
                  予約状態
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  ml={5}
                  color={grey[600]}
                  textAlign="left"
                  fontSize={17}
                >
                  確定
                </Typography>
              </Box>
            </Item>
            <Box display="flex" justifyContent="right">
              <Button
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  mr: 1,
                  bgcolor: teal[400],
                  color: "white",
                  "&:hover": { bgcolor: teal[500] },
                }}
                onClick={(e) => getRsv(e)}
              >
                予約登録
              </Button>
              <Button
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  mr: 1,
                  bgcolor: grey[500],
                  color: "white",
                  "&:hover": { bgcolor: grey[600] },
                }}
                onClick={() => setOpen2(false)}
              >
                キャンセル
              </Button>
            </Box>
            {err2 == true && (
              <Grid xs={12} sm={15}>
                <Alert
                  variant="filled"
                  severity="error"
                  sx={{ m: 3, textAlign: "center" }}
                >
                  同時間帯で既に予約済みです
                </Alert>
              </Grid>
            )}
          </Box>
        </Modal>
        {/* 生徒検索 */}
        <Modal
          open={open3}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack spacing={2} sx={{ width: "100%", my: 3, mx: "auto" }}>
              <SnackbarContent
                sx={{
                  bgcolor: blue[400],
                  justifyContent: "center",
                  boxShadow: "none",
                  fontWeight: 600,
                }}
                message={"予約登録確認"}
              />
            </Stack>
            <Box display="flex">
              <Typography
                variant="h5"
                component="div"
                color="black"
                textAlign="center"
                mx="auto"
                fontSize={17}
                fontWeight={400}
                mb={3}
              >
                予約者を選択してください
              </Typography>
            </Box>
            <Box display="flex">
              <TextField
                margin="normal"
                id="studentName"
                sx={{ mb: 3 }}
                label="生徒名を入力"
                fullWidth
                autoComplete="studentName"
                onChange={(e) => setStudent(e.target.value)}
              />
              <IconButton
                onClick={async () => {
                  setErr2(false);
                  const q = query(
                    collection(db, "users"),
                    where("role", "==", "student"),
                    orderBy("userName"),
                    startAt(student),
                    endAt(student + "\uf8ff")
                  );
                  const snapshot = await getDocs(q);
                  const gotUser = snapshot.docs.map((doc) => {
                    const user = doc.data() as Users;
                    user.id = doc.id;
                    return user;
                  });
                  setUsers2(gotUser);
                }}
              >
                <SearchIcon fontSize="large" />
              </IconButton>
            </Box>
            <Table size="small" sx={{ margin: "auto" }}>
              <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                <TableRow>
                  <TableCell
                    width="50%"
                    sx={{ textAlign: "center", fontSize: 13 }}
                  >
                    生徒名
                  </TableCell>
                  <TableCell
                    width="20%"
                    sx={{ textAlign: "center", fontSize: 13 }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentsList &&
                  studentsList.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell
                        width="50%"
                        sx={{ textAlign: "center", fontSize: 12 }}
                      >
                        {user.userName}
                      </TableCell>
                      <TableCell
                        width="50%"
                        sx={{ textAlign: "center", fontSize: 12 }}
                      >
                        <Button
                          variant="contained"
                          sx={{ bgcolor: teal[500], fontSize: 12 }}
                          onClick={async () => {
                            setErr2(false);
                            setStudent(user.userName);
                            setUserNum(user.id);
                            handleOpen2();
                          }}
                        >
                          選択
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </Modal>
        {/* モーダル　予約内容詳細 */}
        <Modal
          open={open4}
          onClose={handleClose4}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack spacing={2} sx={{ width: "100%", my: 3, mx: "auto" }}>
              <SnackbarContent
                sx={{
                  bgcolor: blue[400],
                  justifyContent: "center",
                  boxShadow: "none",
                  fontWeight: 600,
                }}
                message={"予約詳細"}
              />
            </Stack>
            <Item sx={{ my: 2 }}>
              <Box display="flex">
                <Typography
                  variant="h5"
                  component="div"
                  color="black"
                  textAlign="center"
                  mx="auto"
                  fontSize={19}
                  width={90}
                  fontWeight={500}
                >
                  予約情報
                </Typography>
              </Box>
            </Item>
            <Item2 sx={{ my: 2 }}>
              <Box display="flex">
                <Typography
                  variant="h5"
                  component="div"
                  ml={1}
                  color="black"
                  textAlign="left"
                  fontSize={17}
                  width={90}
                  fontWeight={400}
                >
                  予約日時
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  ml={5}
                  color={grey[600]}
                  textAlign="left"
                  fontSize={17}
                >
                  {rsvDate}
                </Typography>
              </Box>
            </Item2>
            <Item sx={{ my: 2 }}>
              <Box display="flex">
                <Typography
                  variant="h5"
                  component="div"
                  ml={1}
                  color="black"
                  textAlign="left"
                  fontSize={17}
                  width={90}
                  fontWeight={400}
                >
                  担当者
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  ml={5}
                  color={grey[600]}
                  textAlign="left"
                  fontSize={17}
                >
                  {teacher}
                </Typography>
              </Box>
            </Item>
            <Item2 sx={{ my: 2 }}>
              <Box display="flex">
                <Typography
                  variant="h5"
                  component="div"
                  ml={1}
                  color="black"
                  textAlign="left"
                  fontSize={17}
                  width={90}
                  fontWeight={400}
                >
                  お客様名
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  ml={5}
                  color={grey[600]}
                  textAlign="left"
                  fontSize={17}
                >
                  {student2}
                </Typography>
              </Box>
            </Item2>
            <Item sx={{ my: 2 }}>
              <Box display="flex">
                <Typography
                  variant="h5"
                  component="div"
                  ml={1}
                  color="black"
                  textAlign="left"
                  fontSize={17}
                  width={90}
                  fontWeight={400}
                >
                  予約状態
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  ml={5}
                  color={grey[600]}
                  textAlign="left"
                  fontSize={17}
                >
                  確定
                </Typography>
              </Box>
            </Item>
            <Box display="flex" justifyContent="right">
              <Button
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  mr: 1,
                  bgcolor: teal[400],
                  color: "white",
                  "&:hover": { bgcolor: teal[500] },
                }}
                onClick={(e) => deleteRsv(e)}
              >
                予約キャンセル
              </Button>
              <Button
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  mr: 1,
                  bgcolor: grey[500],
                  color: "white",
                  "&:hover": { bgcolor: grey[600] },
                }}
                onClick={() => {
                  handleClose4();
                }}
              >
                閉じる
              </Button>
            </Box>
          </Box>
        </Modal>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
