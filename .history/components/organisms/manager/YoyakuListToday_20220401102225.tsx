import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { createMedia } from "@artsy/fresnel";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//内部インポート
import { useReserves_Today } from "../../../hooks/manager/useReserves";
import { useDeleteShift } from "../../../hooks/manager/delete/useDeleteRsv";
import { useAuth } from "../../../hooks/useUserAuth";
import { useHandle } from "../../../hooks/handle/useHandle";
import { FreeList } from "../../../models/FreeList";
import { useChancelRsv } from "../../../hooks/manager/useReserves";
import RsvModal from "../../templates/Modal/RsvModal";
import Title from "../../atoms/Title";
import { blue, grey, teal } from "@mui/material/colors";
import AlertComponent from "../../atoms/Alert";

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
//Modalのスタイル（予約確認画面）
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
//今日の予約一覧ページ　シフト提出者IDとユーザーIDが一致するもののみ表示
export default function YoyakuListToday() {
  console.log("今日の予約");
  const db = getFirestore();
  const { rsv, loadRsv, error } = useReserves_Today();
  const [reserves, setReserves] = useState<FreeList[]>([]);
  const { handleClose4, handleOpen4 } = useHandle();
  const { chancelRsv } = useChancelRsv();
  const [err, setErr] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [rsvDate, setRsvDate] = useState("");
  const [teacher, setTeacher] = useState("");
  const [student, setStudent] = useState("");
  const [rsvId, setRsvId] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
  const day = new Date();
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  /**=======
   * キャンセル処理
   *======*/
  const deleteRsv = async (e: any) => {
    e.stopPropagation();
    await updateDoc(doc(db, "FreeSpace", rsvId), {
      reserved: false,
      student: "",
      reserverUid: "",
    }).then(async () => {
      handleClose();
      toast.success("キャンセルしました", {
        position: "bottom-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const q = query(
        collection(db, "FreeSpace"),
        where("date", "==", timestamp(xxx)),
        where("reserved", "==", true),
        orderBy("time", "asc")
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setErr(true);
      }
      //ReserveList一覧の展開
      const gotReserves = snapshot.docs.map((doc) => {
        const reserve = doc.data() as FreeList;
        reserve.id = doc.id;
        return reserve;
      });
      setReserves(gotReserves);
    });
  };
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
        {/* モーダル　予約内容詳細 */}
        <RsvModal
          date={rsvDate}
          teacher={teacher}
          student={student}
          chancelRsv={(e) => {
            chancelRsv(e, rsvId, loadRsv());
            handleClose4();
          }}
        />
        <Modal
          open={open}
          onClose={handleClose}
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
                  handleClose();
                }}
              >
                閉じる
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
      <ToastContainer />
    </React.Fragment>
  );
}
