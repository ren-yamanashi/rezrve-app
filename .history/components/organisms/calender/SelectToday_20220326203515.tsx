import { getFirestore, Timestamp } from "firebase/firestore";
import dayjs from "dayjs";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import { createMedia } from "@artsy/fresnel";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import { browser } from "process";
import { blue, grey, teal } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
//内部インポート
import Title from "../../atoms/Title";
import DateRangePicker from "../../atoms/Date/Date ";
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import AlertComponent from "../../atoms/Alert";
import TitleComponent from "../../atoms/Text/Title";
import ModalComponent from "../../atoms/Modal";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import FieldTx from "../../atoms/Text/TextField";
import CreateShiftModal from "../../templates/Modal/CreateShift";
import RsvModal from "../../templates/Modal/RsvModal";
import { useAuth } from "../../../hooks/useUserAuth";
import { useSchedule } from "../../../hooks/teacher/reserves/useReserves";
import { useUserList, useSearchStudent } from "../../../hooks/user/useUserList";
import { useGetReserves } from "../../../hooks/teacher/getReserves/useGetReserves";
import { useCreateShift } from "../../../hooks/teacher/createShift/useCreateShift";
import { useDeleteShift } from "../../../hooks/teacher/deleteReserves/useDeleteRsv";

//メディアクエリ設定
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 750,
    lg: 990,
    xl: 1200,
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
export default function SelectDayAll() {
  const { user } = useAuth();
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
  const { usersList } = useUserList();
  const { chancelRsv } = useDeleteShift();
  const { loadSearchStudent } = useSearchStudent();
  const { loadGetReserves } = useGetReserves();
  const { createShift, err } = useCreateShift();
  const [value, setValue] = useState<Date | null>(new Date());
  const [open, setOpen] = useState(false); //シフト登録モーダル用
  const [open2, setOpen2] = useState(false); //予約確認モーダル用
  const [open3, setOpen3] = useState<boolean>(false); //生徒検索モーダル用
  const [open4, setOpen4] = useState<boolean>(false); //予約詳細確認
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);
  const [rsvDate, setRsvDate] = useState("");
  const [student, setStudent] = useState("");
  const [student2, setStudent2] = useState("");
  const [teacher, setTeacher] = useState("");
  const [rsvNum, setRsvNum] = useState("");
  const [rsvTime, setRsvTime] = useState<number>();
  const [userNum, setUserNum] = useState("");
  const [age, setAge] = React.useState<number | string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  //入力された日付を yyyy/mm/dd 12:00 に変換
  const day = new Date(value);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  //今日の日付を　yyyy/mm/dd 12:00　に変換
  const day2 = new Date();
  const y2 = day2.getFullYear();
  const m2 = day2.getMonth();
  const d2 = day2.getDate();
  let today = new Date(y2, m2, d2, 12, 0, 0);
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    loadSchedule(today);
    loadSchedule10(today);
    loadSchedule11(today);
    loadSchedule12(today);
    loadSchedule13(today);
    loadSchedule14(today);
    loadSchedule15(today);
    loadSchedule16(today);
    loadSchedule17(today);
    loadSchedule18(today);
  }, [process, browser, user]);
  return (
    <>
      <React.Fragment>
        <MediaContextProvider>
          <Box>
            <Title>予約スケジュール</Title>
          </Box>
          <Box
            ml={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <DateRangePicker
              value={value}
              changeDate={async (newValue) => {
                //onChangeに直接記述しないとうまく動作しない（setValue と　value に1回分のずれが生じる）
                setValue(newValue);
                const day3 = new Date(newValue);
                const y3 = day3.getFullYear();
                const m3 = day3.getMonth();
                const d3 = day3.getDate();
                let xxx = new Date(y3, m3, d3, 12, 0, 0);
                loadSchedule(xxx);
                loadSchedule10(xxx),
                  loadSchedule11(xxx),
                  loadSchedule12(xxx),
                  loadSchedule13(xxx),
                  loadSchedule14(xxx),
                  loadSchedule15(xxx);
                loadSchedule16(xxx);
                loadSchedule17(xxx);
                loadSchedule18(xxx);
              }}
            />
          </Box>
          <Table size="small" sx={{ my: 3 }}>
            <TableHead style={{ backgroundColor: "#FFFFDD" }}>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>10:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>11:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>12:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>13:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>14:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>15:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>16:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>17:00</TableCell>
                <TableCell style={{ fontWeight: 600 }}>18:00</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={rsv.length}>
                {/* シフトがない場合はエラーを返している　→ エラーだったらシフトを申請できる */}
                {error10 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(10);
                      }}
                    />
                  </Tooltip>
                )}
                {/* 予約済み or 未予約　を判定させて、返り値を変動させる */}
                {rsv10 &&
                  rsv10.map((value) =>
                    value.student !== "" ? (
                      <Tooltip
                        title={
                          <>
                            <Box>{`講師名:${value.teacher}`}</Box>
                            <Box>{`生徒名:${value.student}`}</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: teal[300],
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                            setTeacher(value.teacher);
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title={
                          <>
                            <Box>クリックして予約</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: "white",
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen3();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        ></TableCell>
                      </Tooltip>
                    )
                  )}
                {error11 && error11 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(11);
                      }}
                    />
                  </Tooltip>
                )}
                {rsv11 &&
                  rsv11.map((value) =>
                    value.student !== "" ? (
                      <Tooltip
                        title={
                          <>
                            <Box>{`講師名:${value.teacher}`}</Box>
                            <Box>{`生徒名:${value.student}`}</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: teal[300],
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                            setTeacher(value.teacher);
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title={
                          <>
                            <Box>クリックして予約</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: "white",
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen3();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        ></TableCell>
                      </Tooltip>
                    )
                  )}
                {error12 && error12 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(12);
                      }}
                    />
                  </Tooltip>
                )}
                {rsv12 &&
                  rsv12.map((value) =>
                    value.student !== "" ? (
                      <Tooltip
                        title={
                          <>
                            <Box>{`講師名:${value.teacher}`}</Box>
                            <Box>{`生徒名:${value.student}`}</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: teal[300],
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                            setTeacher(value.teacher);
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title={
                          <>
                            <Box>クリックして予約</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: "white",
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen3();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        ></TableCell>
                      </Tooltip>
                    )
                  )}
                {error13 && error13 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(13);
                      }}
                    />
                  </Tooltip>
                )}
                {rsv13 &&
                  rsv13.map((value) =>
                    value.student !== "" ? (
                      <Tooltip
                        title={
                          <>
                            <Box>{`講師名:${value.teacher}`}</Box>
                            <Box>{`生徒名:${value.student}`}</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: teal[300],
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                            setTeacher(value.teacher);
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title={
                          <>
                            <Box>クリックして予約</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: "white",
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen3();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        ></TableCell>
                      </Tooltip>
                    )
                  )}
                {error14 && error14 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(14);
                      }}
                    />
                  </Tooltip>
                )}
                {rsv14 &&
                  rsv14.map((value) =>
                    value.student !== "" ? (
                      <Tooltip
                        title={
                          <>
                            <Box>{`講師名:${value.teacher}`}</Box>
                            <Box>{`生徒名:${value.student}`}</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: teal[300],
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                            setTeacher(value.teacher);
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title={
                          <>
                            <Box>クリックして予約</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: "white",
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen3();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        ></TableCell>
                      </Tooltip>
                    )
                  )}
                {error15 && error15 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(15);
                      }}
                    />
                  </Tooltip>
                )}
                {rsv15 &&
                  rsv15.map((value) =>
                    value.student !== "" ? (
                      <Tooltip
                        title={
                          <>
                            <Box>{`講師名:${value.teacher}`}</Box>
                            <Box>{`生徒名:${value.student}`}</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: teal[300],
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                            setTeacher(value.teacher);
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title={
                          <>
                            <Box>クリックして予約</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: "white",
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen3();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        ></TableCell>
                      </Tooltip>
                    )
                  )}
                {error16 && error16 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(16);
                      }}
                    />
                  </Tooltip>
                )}
                {rsv16 &&
                  rsv16.map((value) =>
                    value.student !== "" ? (
                      <Tooltip
                        title={
                          <>
                            <Box>{`講師名:${value.teacher}`}</Box>
                            <Box>{`生徒名:${value.student}`}</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: teal[300],
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                            setTeacher(value.teacher);
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title={
                          <>
                            <Box>クリックして予約</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: "white",
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen3();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        ></TableCell>
                      </Tooltip>
                    )
                  )}

                {error17 && error17 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(17);
                      }}
                    />
                  </Tooltip>
                )}
                {rsv17 &&
                  rsv17.map((value) =>
                    value.student !== "" ? (
                      <Tooltip
                        title={
                          <>
                            <Box>{`講師名:${value.teacher}`}</Box>
                            <Box>{`生徒名:${value.student}`}</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: teal[300],
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                            setTeacher(value.teacher);
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title={
                          <>
                            <Box>クリックして予約</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: "white",
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen3();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        ></TableCell>
                      </Tooltip>
                    )
                  )}
                {error18 && error18 == true && (
                  <Tooltip title="シフトを申請" arrow>
                    <TableCell
                      sx={{
                        bgcolor: grey[300],
                        cursor: "pointer",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        height: 50,
                      }}
                      onClick={() => {
                        setOpen(true);
                        setAge(18);
                      }}
                    />
                  </Tooltip>
                )}
                {rsv18 &&
                  rsv18.map((value) =>
                    value.student !== "" ? (
                      <Tooltip
                        title={
                          <>
                            <Box>{`講師名:${value.teacher}`}</Box>
                            <Box>{`生徒名:${value.student}`}</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: teal[300],
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen4();
                            setRsvNum(value.id);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                            setStudent2(value.student);
                            setTeacher(value.teacher);
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title={
                          <>
                            <Box>クリックして予約</Box>
                            <Box>{`レッスン日時:${dayjs(
                              value.date.toDate()
                            ).format("YYYY/MM/DD ")} ${value.time}:00~`}</Box>
                          </>
                        }
                        arrow
                      >
                        <TableCell
                          key={value.id}
                          sx={{
                            bgcolor: "white",
                            cursor: "pointer",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            height: 50,
                          }}
                          onClick={() => {
                            handleOpen3();
                            setRsvNum(value.id);
                            setRsvTime(value.time);
                            setRsvDate(
                              `${dayjs(value.date.toDate()).format(
                                "YYYY/MM/DD "
                              )} ${value.time}:00~`
                            );
                          }}
                        ></TableCell>
                      </Tooltip>
                    )
                  )}
              </TableRow>
            </TableBody>
          </Table>
          {/* モーダルの作成 シフト登録確認画面　*/}
          <CreateShiftModal
            open={open}
            close={handleClose}
            teacher={user && user.displayName}
            time={age}
            changeSelect={handleChange}
            createShift={(e) => createShift(e, teacher, age, xxx)}
          />
          {/* 予約登録確認　モーダル作成 */}
          <GetRsvModal
            open={open2}
            close={handleClose2}
            date={rsvDate}
            teacher={user && user.displayName}
            student={student}
            clickEv={async (e) => {
              try {
                await loadGetReserves(
                  e,
                  timestamp(xxx),
                  rsvTime,
                  student,
                  rsvNum,
                  userNum,
                  handleClose2()
                );
              } catch {
                handleClose2();
              } finally {
                loadSchedule(xxx);
                loadSchedule10(xxx);
                loadSchedule11(xxx);
                loadSchedule12(xxx);
                loadSchedule13(xxx);
                loadSchedule14(xxx);
                loadSchedule15(xxx);
                loadSchedule16(xxx);
                loadSchedule17(xxx);
                loadSchedule18(xxx);
              }
            }}
          />
          {/* 生徒検索 */}
          <Modal
            open={open3}
            onClose={handleClose3}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ModalComponent>
              <TitleComponent>予約者を選択してください</TitleComponent>
              <Box display="flex">
                <FieldTx
                  style={{ mb: 3 }}
                  label="生徒名を入力"
                  changeEv={(e) => setStudent(e.target.value)}
                />
                <IconButton
                  onClick={() => {
                    loadSearchStudent(student);
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
                  {usersList &&
                    usersList.map((user) => (
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
                          <PrimaryBtn
                            style={{ bgcolor: teal[500], fontSize: 12 }}
                            buttonText={"選択"}
                            click={() => {
                              setStudent(user.userName);
                              setUserNum(user.id);
                              handleClose3();
                              handleOpen2();
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </ModalComponent>
          </Modal>
          {/* モーダル　予約内容詳細 */}
          <RsvModal
            open={open4}
            close={handleClose4}
            date={rsvDate}
            teacher={teacher}
            student={student2}
            chancelRsv={(e) => chancelRsv(e, rsvNum, handleClose4())}
          />
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
