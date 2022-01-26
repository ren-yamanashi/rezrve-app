import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import Link_mui from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { ReserveList } from "../../models/ReserveList";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Reserves() {
  const [reserves, setReserves] = useState<ReserveList[]>([]);
  const { user } = useAuth();

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
    async function loadReserves() {
      const db = getFirestore();
      const q = query(collection(db, "ReserveList"));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //ReserveList一覧の展開
      const gotReserves = snapshot.docs.map((doc) => {
        const reserve = doc.data() as ReserveList;
        return reserve;
      });
      setReserves(gotReserves);
    }
    loadReserves();
  }, [process, browser, user]);

  return (
    <React.Fragment>
      <h1>固定予約一覧</h1>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>講師名</TableCell>
            <TableCell>生徒名</TableCell>
            <TableCell>週目・曜日</TableCell>
            <TableCell>時間</TableCell>
            <TableCell align="right">備考</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reserves.map((Reserve) => (
            <TableRow key={Reserve.id}>
              <TableCell>{Reserve.Teacher}</TableCell>
              <TableCell>{Reserve.Student}</TableCell>
              <TableCell>{Reserve.WeekAndDay}</TableCell>
              <TableCell>{Reserve.Time}</TableCell>
              <TableCell align="right">{Reserve.More}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
