import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
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
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import { blue, grey, teal } from "@mui/material/colors";

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
  const [reserves, setReserves] = useState<FreeList[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  const [err, setErr] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [rsvDate, setRsvDate] = useState("");
  const [teacher, setTeacher] = useState("");
  const [student, setStudent] = useState("");
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
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**========
     * Firebaseからシフトを取得
     *========*/
    async function loadReserves() {
      const q = query(
        collection(db, "FreeSpace"),
        where("student", "==", user.displayName),
        where("date", ">=", timestamp(xxx)),
        where("reserved", "==", true),
        orderBy("date", "desc"),
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
    }
    loadReserves();
  }, [process, browser, user]);
  return (
    <React.Fragment>
      <MediaContextProvider>
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
              <Media greaterThan="xs">
                <Box display="flex" mb={3}>
                  <Title>予約済みレッスン</Title>
                </Box>
              </Media>
              <Media at="xs">
                <Box display="flex" mb={3}>
                  <Typography
                    fontSize={15}
                    component="div"
                    color={blue[600]}
                    textAlign="left"
                    fontWeight={600}
                  >
                    予約済みレッスン
                  </Typography>
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
                      {reserves.map((rsv) => (
                        <TableRow key={rsv.id}>
                          <TableCell>{rsv.teacher}</TableCell>
                          <TableCell>
                            {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                          </TableCell>
                          <TableCell>
                            {`${rsv.time}:00`}
                            <Tooltip title="キャンセル" arrow>
                              <IconButton
                                onClick={() => {
                                  handleOpen();
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
                  {err == true && (
                    <Grid xs={12} sm={15}>
                      <Alert
                        variant="filled"
                        severity="info"
                        sx={{ m: 1, textAlign: "center" }}
                      >
                        次回のレッスンはありません
                      </Alert>
                    </Grid>
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
                      {reserves.map((rsv) => (
                        <TableRow key={rsv.id}>
                          <TableCell style={{ fontSize: 12 }}>
                            {rsv.teacher}
                          </TableCell>
                          <TableCell style={{ fontSize: 12 }}>
                            {dayjs(rsv.date.toDate()).format("MM/DD ")}
                          </TableCell>
                          <TableCell style={{ fontSize: 12 }}>
                            {`${rsv.time}:00`}
                            <Tooltip title="キャンセル" arrow>
                              <IconButton
                                onClick={() =>
                                  router.push(`/reserve/edit/${rsv.id}`)
                                }
                              >
                                <EditIcon
                                  sx={{ color: "teal", ml: 1, fontSize: 15 }}
                                />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {err == true && (
                    <Grid xs={12} sm={15}>
                      <Alert
                        variant="filled"
                        severity="info"
                        sx={{ m: 1, textAlign: "center" }}
                      >
                        次回のレッスンはありません
                      </Alert>
                    </Grid>
                  )}
                </Grid>
              </Media>
              {/* モーダル　予約内容詳細 */}
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
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      キャンセル
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </Box>
          </CardContent>
        </Box>
      </MediaContextProvider>
    </React.Fragment>
  );
}
