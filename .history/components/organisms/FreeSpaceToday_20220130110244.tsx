import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  startAt,
  endAt,
  Timestamp,
  limit,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";

//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { FreeList } from "../../models/FreeList";
import Title from "../atoms/Title";
import Header from "../templates/Header";

export default function FreeSpaceToday() {
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const { user } = useAuth();
  const router = useRouter();
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
        orderBy("date", "asc")
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
          <CardContent
            style={{
              width: "80%",
              borderRadius: "7px",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#4689FF",
              margin: "auto",
            }}
          >
            <Box ml={3} display="flex" alignItems="center">
              <Box mr={5}>
                <Box display="flex" mb={3}>
                  <Title>予約登録</Title>
                  <Grid item xs={7} md={6}>
                    <Box ml={3} alignItems="center">
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#3CB371",
                          "&:hover": { bgcolor: "#2E8B57" },
                        }}
                        onClick={() => router.push(`/shift/${user.uid}`)}
                      >
                        <DoubleArrowIcon />
                        もっと見る
                      </Button>
                    </Box>
                  </Grid>
                </Box>
              </Box>
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
        </Box>
      </React.Fragment>
    </>
  );
}
