import { getFirestore, updateDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { createMedia } from "@artsy/fresnel";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { blue, grey, teal } from "@mui/material/colors";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import PrimaryText from "../../atoms/Text/Typography4";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import CardComponent from "../../atoms/CardComponent";
import EditButton from "../../atoms/Button/EditButton";
import AlertComponent from "../../atoms/Alert";
import RsvModal from "../../templates/Modal/RsvModal";
import { useReserves_AfterToday } from "../../../hooks/student/useReserves";
import { useDeleteShift } from "../../../hooks/student/deleteRsv/deleteRsv";
import { useHandle } from "../../../hooks/handle/useHandle";
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
    xs: 0,
    sm: 420,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});
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
  const db = getFirestore();
  console.log("今日以降の予約");
  const { rsv, error, loadReserves_AfterToday } = useReserves_AfterToday();
  const { handleOpen4 } = useHandle();
  const { chancelRsv } = useDeleteShift();
  const [open, setOpen] = useState<boolean>(false);
  const [rsvDate, setRsvDate] = useState("");
  const [teacher, setTeacher] = useState("");
  const [student, setStudent] = useState("");
  const [rsvId, setRsvId] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      loadReserves_AfterToday();
    });
  };
  return (
    <React.Fragment>
      <MediaContextProvider>
        <Box>
          <CardComponent>
            <Box>
              <Media greaterThan="xs">
                <Box display="flex" mb={3}>
                  <Title>予約済みレッスン</Title>
                </Box>
              </Media>
              <Media at="xs">
                <Box display="flex" mb={3}>
                  <PrimaryText
                    size={15}
                    color={blue[600]}
                    style={{ fontWeight: 600 }}
                    textTitle={"予約済みレッスン"}
                  />
                </Box>
              </Media>
              <Media greaterThan="xs">
                <Grid item sm={20}>
                  <Table size="small">
                    <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                      <TableRow>
                        <TableCell style={{ fontWeight: 600 }}>
                          講師名
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>
                          予約日時
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rsv &&
                        rsv.map((rsv) => (
                          <TableRow key={rsv.id}>
                            <TableCell>{rsv.teacher}</TableCell>
                            <TableCell>
                              {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                            </TableCell>
                            <TableCell>
                              {`${rsv.time}:00`}
                              <EditButton
                                tooltipText={"詳細確認・キャンセル"}
                                onClickEvent={() => {
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
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {error && error == true && (
                    <AlertComponent>次回のレッスンはありません</AlertComponent>
                  )}
                </Grid>
              </Media>
              {/* スマホレスポンシブ　~420 */}
              <Media at="xs">
                <Grid item sm={20}>
                  <Table size="small">
                    <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                      <TableRow>
                        <TableCell style={{ fontWeight: 600, fontSize: 12 }}>
                          講師名
                        </TableCell>
                        <TableCell style={{ fontWeight: 600, fontSize: 12 }}>
                          日時
                        </TableCell>
                        <TableCell style={{ fontWeight: 600, fontSize: 12 }}>
                          時間
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rsv &&
                        rsv.map((rsv) => (
                          <TableRow key={rsv.id}>
                            <TableCell style={{ fontSize: 12 }}>
                              {rsv.teacher}
                            </TableCell>
                            <TableCell style={{ fontSize: 12 }}>
                              {dayjs(rsv.date.toDate()).format("MM/DD ")}
                            </TableCell>
                            <TableCell style={{ fontSize: 12 }}>
                              {`${rsv.time}:00`}
                              <EditButton
                                tooltipText={"詳細確認・キャンセル"}
                                onClickEvent={() => {
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
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {error && error == true && (
                    <AlertComponent>次回のレッスンはありません</AlertComponent>
                  )}
                </Grid>
              </Media>
              {/* モーダル　予約内容詳細 */}
              <RsvModal
                date={rsvDate}
                teacher={teacher}
                student={student}
                chancelRsv={(e) =>
                  chancelRsv(e, rsvId, loadReserves_AfterToday())
                }
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
          </CardComponent>
        </Box>
      </MediaContextProvider>
      <ToastContainer />
    </React.Fragment>
  );
}
