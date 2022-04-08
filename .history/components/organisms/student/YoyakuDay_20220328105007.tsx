import {
  getFirestore,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FilterListIcon from "@mui/icons-material/FilterList";
import RadioGroup from "@mui/material/RadioGroup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import DatePicker from "@mui/lab/DatePicker";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { browser } from "process";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Typography from "@mui/material/Typography";
import { blue, grey, teal } from "@mui/material/colors";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
//内部インポート
import GetRsvModal from "../../templates/Modal/GetReserveModal";
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import { FreeList } from "../../../models/FreeList";
import { useTeacherList } from "../../../hooks/user/useUserList";
import { useSelectUser } from "../../../hooks/user/useUserList";
import { useHandle } from "../../../hooks/handle/useHandle";
import { useGetReserves } from "../../../hooks/teacher/getReserves/useGetReserves";
import {
  useReserves_Date,
  useReserves_dateTime,
} from "../../../hooks/student/useReserves";
import { useDate } from "../../../hooks/date/useDate";
import { ja } from "date-fns/locale";

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
//メディアクエリ設定
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});
//Modalのスタイル（予約登録確認画面）
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
//Modalのスタイル（予約登録確認画面　スマホ）
const style3 = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const style2 = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

//ユーザーリストの作成　名前に管理者があればユーザーの削除が可能。 メアドに @bee が入っていればシフトの登録が可能
export default function UsersList() {
  const db = getFirestore();
  const { usersList } = useTeacherList();
  const { changeDateValue, newDateTime, dateValue } = useDate();
  const { loadGetReserves } = useGetReserves();
  const { handleOpen2, handleClose2 } = useHandle();
  const { loadSelectUsers } = useSelectUser();
  const { loadRsv_date, rsv2, error2 } = useReserves_Date();
  const { loadRsv_dateTime } = useReserves_dateTime();
  const { user } = useAuth();
  const [err, setErr] = useState<boolean>(false);
  const [sortTime, setSortTime] = useState<number>();
  const [time, setTime] = useState(0);
  const [i, setI] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleOpen3 = () => setOpen3(true);
  const handleClose = () => setOpen(false);
  const handleClose3 = () => setOpen3(false);
  /**=========
   * 予約登録
   *========*/
  const getRsv = async (e: any) => {
    e.preventDefault();
    await updateDoc(doc(db, "FreeSpace", i), {
      student: user.displayName,
      reserved: true,
      reserverUid: user.uid,
      reserveAt: serverTimestamp(),
    }).then(() => {
      handleClose();
      toast.success("予約を登録しました", {
        position: "bottom-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      loadRsv_date(newDateTime);
    });
  };
  /**=========
   * 予約登録
   *========*/
  const getRsv2 = async (e: any) => {
    e.preventDefault();
    await updateDoc(doc(db, "FreeSpace", i), {
      student: user.displayName,
      reserved: true,
      reserverUid: user.uid,
      reserveAt: serverTimestamp(),
    }).then(() => {
      handleClose2();
      toast.success("予約を登録しました", {
        position: "bottom-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      loadRsv_date(newDateTime);
    });
  };
  return (
    <>
      <React.Fragment>
        <MediaContextProvider>
          {/* レスポンシブ 601~ */}
          <Media greaterThan="sm">
            <Box m={3} display="flex" alignItems="center">
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
                <DatePicker
                  label="日付を選択"
                  value={dateValue}
                  onChange={async (newValue) => {
                    changeDateValue(newValue);
                    setErr(false);
                    setOpen(false);
                    const day = new Date(newValue);
                    const y = day.getFullYear();
                    const m = day.getMonth();
                    const d = day.getDate();
                    let newDate = new Date(y, m, d, 12, 0, 0);
                    loadRsv_date(newDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Table size="small">
              <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: 600, width: "30%" }}>
                    <Box ml={3}>講師名</Box>
                  </TableCell>
                  <TableCell style={{ fontWeight: 600, width: "25%" }}>
                    <Box ml={3}>日付</Box>
                  </TableCell>
                  <TableCell style={{ fontWeight: 600, width: "25%" }}>
                    <Box display="flex" ml={1}>
                      <Box mt={1}>時間</Box>
                      <IconButton onClick={handleOpen3}>
                        <FilterListIcon />
                      </IconButton>
                      <Media greaterThan="md">
                        <IconButton onClick={() => loadRsv_date(newDateTime)}>
                          <RestartAltIcon />
                        </IconButton>
                      </Media>
                    </Box>
                    <Modal
                      open={open3}
                      onClose={handleClose3}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Box alignItems="top" m={0}>
                          <IconButton onClick={handleClose3}>
                            <CloseIcon />
                          </IconButton>
                        </Box>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              checked={sortTime == 10}
                              onChange={() => setSortTime(10)}
                              label="10:00"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              checked={sortTime == 11}
                              onChange={() => setSortTime(11)}
                              label="11:00"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              checked={sortTime == 12}
                              onChange={() => setSortTime(12)}
                              label="12:00"
                            />
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              checked={sortTime == 13}
                              onChange={() => setSortTime(13)}
                              label="13:00"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              checked={sortTime == 14}
                              onChange={() => setSortTime(14)}
                              label="14:00"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              checked={sortTime == 15}
                              onChange={() => setSortTime(15)}
                              label="15:00"
                            />
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              checked={sortTime == 16}
                              onChange={() => setSortTime(16)}
                              label="16:00"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              checked={sortTime == 17}
                              onChange={() => setSortTime(17)}
                              label="17:00"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              checked={sortTime == 18}
                              onChange={() => setSortTime(18)}
                              label="18:00"
                            />
                          </RadioGroup>
                        </FormControl>
                        <Box textAlign="right" mr={5}>
                          <Button
                            type="submit"
                            onClick={() => {
                              loadRsv_dateTime(sortTime), handleClose3();
                            }}
                            variant="contained"
                            sx={{ mt: 3, mb: 2, ml: 3 }}
                          >
                            決定
                          </Button>
                        </Box>
                      </Box>
                    </Modal>
                  </TableCell>
                  <TableCell style={{ fontWeight: 600 }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {rsv2 &&
                  rsv2.map((freeList) => (
                    <TableRow key={freeList.id}>
                      <TableCell>
                        <Box ml={3}>{freeList.teacher}</Box>
                      </TableCell>
                      <TableCell>
                        <Box ml={3}>
                          {dayjs(freeList.date.toDate()).format("YYYY/MM/DD ")}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box ml={3}>{`${freeList.time}:00`} </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Tooltip title={`予約する:${freeList.teacher}`} arrow>
                            <Button
                              variant="contained"
                              sx={{
                                mt: 3,
                                mb: 2,
                                ml: 3,
                                bgcolor: teal[400],
                                color: "white",
                                "&:hover": { bgcolor: teal[500] },
                              }}
                              onClick={() => {
                                handleOpen2();
                                loadSelectUsers(freeList.senderUid);
                                setTime(freeList.time);
                                setI(freeList.id);
                              }}
                            >
                              予約
                            </Button>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Media>
          {/* レスポンシブ　〜600 */}
          <Media at="sm">
            <Box m={3} display="flex" alignItems="center">
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
                <DatePicker
                  label="日付を選択"
                  value={dateValue}
                  onChange={async (newValue) => {
                    changeDateValue(newValue);
                    setErr(false);
                    setOpen(false);
                    const day = new Date(newValue);
                    const y = day.getFullYear();
                    const m = day.getMonth();
                    const d = day.getDate();
                    let newDate = new Date(y, m, d, 12, 0, 0);
                    loadRsv_date(newDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Table size="small">
              <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: 600, width: "35%" }}>
                    <Box fontSize={12}>講師名</Box>
                  </TableCell>
                  <TableCell style={{ fontWeight: 600, width: "30%" }}>
                    <Box fontSize={12}>日付</Box>
                  </TableCell>
                  <TableCell style={{ fontWeight: 600 }}>
                    <Box fontSize={12} ml={1}>
                      時間
                      <IconButton onClick={handleOpen3}>
                        <FilterListIcon />
                      </IconButton>
                    </Box>
                    <Modal
                      open={open3}
                      onClose={handleClose3}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style2}>
                        <Box alignItems="top" m={0}>
                          <IconButton onClick={handleClose3}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              checked={sortTime == 10}
                              onChange={() => setSortTime(10)}
                              label="10:00"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              checked={sortTime == 11}
                              onChange={() => setSortTime(11)}
                              label="11:00"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              checked={sortTime == 12}
                              onChange={() => setSortTime(12)}
                              label="12:00"
                            />
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              checked={sortTime == 13}
                              onChange={() => setSortTime(13)}
                              label="13:00"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              checked={sortTime == 14}
                              onChange={() => setSortTime(14)}
                              label="14:00"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              checked={sortTime == 15}
                              onChange={() => setSortTime(15)}
                              label="15:00"
                            />
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              checked={sortTime == 16}
                              onChange={() => setSortTime(16)}
                              label="16:00"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              checked={sortTime == 17}
                              onChange={() => setSortTime(17)}
                              label="17:00"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              checked={sortTime == 18}
                              onChange={() => setSortTime(18)}
                              label="18:00"
                            />
                          </RadioGroup>
                        </FormControl>
                        <Box textAlign="right" mr={5}>
                          <Button
                            type="submit"
                            onClick={() => {
                              loadRsv_dateTime(sortTime), handleClose3();
                            }}
                            variant="contained"
                            sx={{ mt: 3, mb: 2, ml: 3 }}
                          >
                            決定
                          </Button>
                        </Box>
                      </Box>
                    </Modal>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rsv2 &&
                  rsv2.map((freeList) => (
                    <TableRow key={freeList.id}>
                      <TableCell>
                        <Box fontSize={12}>{freeList.teacher}</Box>
                      </TableCell>
                      <TableCell>
                        <Box fontSize={12}>
                          {dayjs(freeList.date.toDate()).format("YYYY/MM/DD ")}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={`予約する:${freeList.teacher}`} arrow>
                          <Button
                            variant="contained"
                            sx={{
                              mt: 3,
                              mb: 2,
                              ml: 3,
                              fontSize: 12,
                              bgcolor: teal[400],
                              color: "white",
                              "&:hover": { bgcolor: teal[500] },
                            }}
                            onClick={(e) => {
                              handleOpen2();
                              loadSelectUsers(freeList.senderUid);
                              setTime(freeList.time);
                              setI(freeList.id);
                            }}
                          >
                            {`${freeList.time}:00`}
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Media>
          {/* モーダル */}
          <GetRsvModal
            date={`${
              newDateTime.getMonth() + 1
            }/${newDateTime.getDate()} ${time}:00 ~ ${time + 1}:00`}
            teacher={usersList && usersList.map((user) => user.userName)}
            student={user && user.displayName}
            clickEv={(e) =>
              loadGetReserves(
                e,
                newDateTime,
                time,
                user && user.displayName,
                i,
                user && user.uid,
                handleClose2()
              )
            }
          />
          {/* エラー表示 */}
          {error2 && error2 == true && (
            <Box textAlign="center">
              <Grid xs={12} sm={15}>
                <Alert variant="filled" severity="info" sx={{ m: 3 }}>
                  予約可能なレッスンは見つかりませんでした
                </Alert>
              </Grid>
            </Box>
          )}
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
