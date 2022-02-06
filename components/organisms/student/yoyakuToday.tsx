import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";

//今日の提出済みシフト一覧　※本日のみ
export default function YoyakuToday() {
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
  const day = new Date();
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  //Firebaseからデータを取得
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**========
     * Firebaseからデータを取得
     *========*/
    async function loadFree() {
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("reserved", "==", false),
        where("date", ">=", timestamp(xxx))
      );
      const snapshot = await getDocs(q);
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists(gotFreeList);
    }
    loadFree();
  }, [process, browser, user]);
  return (
    <>
      <React.Fragment>
        <Box mt={3}>
          <Grid item xs={20} md={40}>
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
              <Box display="flex" mb={3}>
                <Title>予約登録</Title>
                <Grid item xs={7} md={6}>
                  <Box ml={3} alignItems="center">
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#3CB371",
                        "&:hover": { bgcolor: "#2E8B57" },
                        fontSize: 13,
                      }}
                      onClick={() => router.push(`/shift/students/${user.uid}`)}
                    >
                      <DoubleArrowIcon />
                      もっと見る
                    </Button>
                  </Box>
                </Grid>
              </Box>
              <Table size="small">
                <TableHead style={{ backgroundColor: "#FFFFDD" }}>
                  <TableRow>
                    <TableCell style={{ fontWeight: 600 }}>講師名</TableCell>
                    <TableCell style={{ fontWeight: 600 }}>日付</TableCell>
                    <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {freeLists.map((freeList) => (
                    <TableRow key={freeList.id}>
                      <TableCell>{freeList.teacher}</TableCell>
                      <TableCell>
                        {dayjs(freeList.date.toDate()).format("YYYY/MM/DD ")}
                      </TableCell>
                      <TableCell>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ mt: 3, mb: 2, ml: 3 }}
                        >
                          <Link href={`/reserve/add/${freeList.id}`}>
                            {`${freeList.time}:30`}
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Grid>
        </Box>
      </React.Fragment>
    </>
  );
}
