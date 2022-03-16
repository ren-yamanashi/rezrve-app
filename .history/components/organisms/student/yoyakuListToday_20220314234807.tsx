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
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
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
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { createMedia } from "@artsy/fresnel";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import { blue } from "@mui/material/colors";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    xs: 0,
    sm: 420,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

//今日の予約一覧ページ　シフト提出者IDとユーザーIDが一致するもののみ表示
export default function YoyakuListToday() {
  const [reserves, setReserves] = useState<FreeList[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  const [test, setTest] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
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
      const u = user;
      setTest(u.displayName);
      console.log(test);
      const db = getFirestore();
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
              <Grid item sm={20}>
                <Table size="small">
                  <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                    <TableRow>
                      <TableCell style={{ fontWeight: 600 }}>講師名</TableCell>
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
                          <Tooltip title="キャンセル・変更" arrow>
                            <IconButton
                              onClick={() =>
                                router.push(`/reserve/edit/${rsv.id}`)
                              }
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
            </Box>
          </CardContent>
        </Box>
      </MediaContextProvider>
    </React.Fragment>
  );
}
