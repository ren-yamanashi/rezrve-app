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
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { FreeList } from "../../models/FreeList";
import Title from "../atoms/Title";
export default function ReserveToday() {
  const [reserves, setReserves] = useState<FreeList[]>([]);
  const { user } = useAuth();
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
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("reserved", "==", true),
        orderBy("date", "asc"),
        orderBy("time", "asc")
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
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
      <Card sx={{ minWidth: 275 }}>
        <CardContent
          style={{
            width: "70%",
            borderRadius: "7px",
            borderStyle: "solid",
            borderColor: "#4689FF",
            margin: "auto",
          }}
        >
          <Box ml={3}>
            <Title>本日の予約</Title>
            <Table size="small">
              <TableHead
                style={{ backgroundColor: "#FFFFDD", fontWeight: "100" }}
              >
                <TableRow>
                  <TableCell>講師名</TableCell>
                  <TableCell>生徒名</TableCell>
                  <TableCell>予約日時</TableCell>
                  <TableCell>コース</TableCell>
                  <TableCell>時間</TableCell>
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
                    <TableCell>{rsv.course}</TableCell>
                    <TableCell>{`${rsv.time}:30`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
