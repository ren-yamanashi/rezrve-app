import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  Timestamp,
  limit,
  startAt,
  endAt,
  updateDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { useRouter } from "next/router";
import { blue, grey, teal } from "@mui/material/colors";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
//内部インポート
import SelectTeacherModal from "../templates/Modal/SelectTeacherModal";
import { useAuth } from "../../hooks/useUserAuth";
import { FreeList } from "../../models/FreeList";
import { Users } from "../../models/Users";
import { useTeacherList } from "../../hooks/user/useUserList";
import { useHandle } from "../../hooks/handle/useHandle";
import {
  useReserves_Week,
  useReserves_student,
} from "../../hooks/manager/useReserves";
import { useDeleteShift } from "../../hooks/manager/delete/useDeleteRsv";
import { useReserves_teacher } from "../../hooks/manager/useReserves";
import AlertComponent from "../atoms/Alert";

//Modalのスタイル
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
//予約一覧ページ　予約済みフラグ(reserved)が true のみ表示　※管理者のみこのページへの遷移が可能
export default function ReservesAll() {
  const [reserves, setReserves] = useState<FreeList[]>([]);
  const { handleOpen7 } = useHandle();
  const { error4 } = useReserves_teacher();
  const { usersList } = useTeacherList();
  const { chancelRsv } = useDeleteShift();
  const [users, setUsers] = useState<Users[]>([]);
  const { rsv, error2, loadRsv } = useReserves_Week();
  const { loadRsvStudent, error3 } = useReserves_student();
  const [rsvDate, setRsvDate] = useState("");
  const [teacher, setTeacher] = useState("");
  const [student, setStudent] = useState("");
  const [rsvId, setRsvId] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [sortTeacher, setSortTeacher] = useState<string>("");
  const [sortStudent, setSortStudent] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleOpen3 = () => setOpen3(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);
  const db = getFirestore();
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
  const day = new Date();
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  let xxx7 = new Date(y, m, d + 7, 12, 0, 0);

  return (
    <React.Fragment>
      <Table size="small" sx={{ mt: 5 }}>
        <TableHead style={{ backgroundColor: "#FFFFDD" }}>
          <TableRow>
            <TableCell style={{ fontWeight: 600 }}>
              <Box>
                講師名
                <IconButton onClick={handleOpen7}>
                  <FilterListIcon />
                </IconButton>
                <IconButton onClick={loadRsv}>
                  <RestartAltIcon />
                </IconButton>
              </Box>
              {/* モーダル */}
              <SelectTeacherModal
                changeEvent={(e) => setSortTeacher(e.target.value)}
                searchTeacher={async () => {
                  setOpen(true);
                  const db = getFirestore();
                  const q = query(
                    collection(db, "users"),
                    where("role", "==", "teacher"),
                    orderBy("userName"),
                    startAt(sortTeacher),
                    endAt(sortTeacher + "\uf8ff")
                  );
                  const snapshot = await getDocs(q);
                  const gotUser = snapshot.docs.map((doc) => {
                    const user = doc.data() as Users;
                    user.id = doc.id;
                    return user;
                  });
                  setUsers(gotUser);
                }}
                users={usersList && usersList}
              />
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              <Box>
                生徒名
                <IconButton onClick={handleOpen3}>
                  <FilterListIcon />
                </IconButton>
                <IconButton onClick={loadRsv}>
                  <RestartAltIcon />
                </IconButton>
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
                    <Box textAlign="center">
                      <TextField
                        margin="normal"
                        required
                        id="sortTeacher"
                        label="生徒名で絞り込み"
                        name="sortStudent"
                        autoComplete="sortStudent"
                        autoFocus
                        onChange={(e) => setSortStudent(e.target.value)}
                      />
                      <Button
                        type="submit"
                        onClick={() => {
                          loadRsvStudent(sortStudent), handleClose3();
                        }}
                        variant="contained"
                        sx={{ mt: 3, mb: 2, ml: 3 }}
                      >
                        決定
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </Box>
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              <Box>予約日時</Box>
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rsv &&
            rsv.map((rsv) => (
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
                        handleOpen2();
                        setRsvId(rsv.id);
                        setStudent(rsv.student);
                        setTeacher(rsv.teacher);
                        setRsvDate(
                          `${dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")} ${
                            rsv.time
                          }:00~`
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
      {/* モーダル　予約内容詳細 */}
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
              onClick={(e) => chancelRsv(e, rsvId, loadRsv())}
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
                handleClose2();
              }}
            >
              閉じる
            </Button>
          </Box>
        </Box>
      </Modal>
      {error2 && error2 == true ? (
        <AlertComponent>予約は見つかりませんでした</AlertComponent>
      ) : error3 && error3 == true ? (
        <AlertComponent>予約は見つかりませんでした</AlertComponent>
      ) : (
        error4 &&
        error4 == true && (
          <AlertComponent>予約は見つかりませんでした</AlertComponent>
        )
      )}
      <ToastContainer />
    </React.Fragment>
  );
}
