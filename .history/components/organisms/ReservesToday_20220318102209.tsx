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
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Alert from "@mui/material/Alert";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { createMedia } from "@artsy/fresnel";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { useReserves } from "../../hooks/useReserves";
import { FreeList } from "../../models/FreeList";
import Title from "../atoms/Title";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 700,
    lg: 990,
    xl: 1200,
  },
});

//今日の予約一覧ページ　シフト提出者IDとユーザーIDが一致するもののみ表示
export default function ReserveToday() {
  const db = getFirestore();
  const [reserves, setReserves] = useState<FreeList[]>([]);
  const { rsv } = useReserves();
  const { user } = useAuth();
  const router = useRouter();
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
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("reserved", "==", true),
        where("date", "==", timestamp(xxx)),
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
      rsv && setReserves(rsv);
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
              <Media greaterThan="sm">
                <Box display="flex" mb={3}>
                  <Title>今日の予約</Title>
                  <Grid item xs={7} md={6}>
                    <Box ml={3} alignItems="center">
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#3CB371",
                          "&:hover": { bgcolor: "#2E8B57" },
                          fontSize: 13,
                        }}
                        onClick={() => router.push(`/reserve/${user.uid}`)}
                      >
                        <DoubleArrowIcon />
                        予約一覧へ
                      </Button>
                    </Box>
                  </Grid>
                </Box>
              </Media>
              <Media at="sm">
                <Box display="flex" mb={3}>
                  <Title>今日の予約</Title>
                </Box>
              </Media>
              <Grid item sm={20}>
                <Media greaterThan="sm">
                  <Table size="small">
                    <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                      <TableRow>
                        <TableCell style={{ fontWeight: 600 }}>
                          講師名
                        </TableCell>
                        <TableCell style={{ fontWeight: 600 }}>
                          生徒名
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
                          <TableCell>{rsv.student}</TableCell>
                          <TableCell>
                            {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                          </TableCell>
                          <TableCell>{`${rsv.time}:00`}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {err == true && (
                    <Grid xs={12} sm={15}>
                      <Alert
                        variant="filled"
                        severity="info"
                        sx={{ m: 3, textAlign: "center" }}
                      >
                        予約は見つかりませんでした
                      </Alert>
                    </Grid>
                  )}
                </Media>
                {/* スマホレスポンシブ */}
                <Media at="sm">
                  <Table size="small">
                    <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                      <TableRow>
                        <TableCell style={{ fontWeight: 600 }}>
                          生徒名
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
                          <TableCell>{rsv.student}</TableCell>
                          <TableCell>
                            {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                          </TableCell>
                          <TableCell>{`${rsv.time}:00`}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {err == true && (
                    <Grid xs={12} sm={15}>
                      <Alert
                        variant="filled"
                        severity="info"
                        sx={{ m: 3, textAlign: "center" }}
                      >
                        予約は見つかりませんでした
                      </Alert>
                    </Grid>
                  )}
                </Media>
              </Grid>
            </Box>
          </CardContent>
        </Box>
      </MediaContextProvider>
    </React.Fragment>
  );
}
