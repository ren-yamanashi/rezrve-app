import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import Link_mui from "@mui/material/Link";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { ReserveList } from "../../models/ReserveList";
import Title from "../atoms/Title";
import { Checkbox } from "@mui/material";

export default function Reserves() {
  const [Reserves, setReserves] = useState<ReserveList[]>([]);
  const { user } = useAuth();
  const [comp, setComp] = useState<boolean>(false);

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
        reserve.id = doc.id;
        return reserve;
      });
      setReserves(gotReserves);
    }
    loadReserves();
  }, [process, browser, user]);
  /**=========
   * 完了・未完了の設定
   *=========*/
  const UpdateReserve = async (id: string) => {
    setComp(!comp);
    const db = getFirestore();
    const ReserveRef = doc(db, "ReserveList", id);
    await updateDoc(ReserveRef, {
      completed: comp,
    });
    const q = query(collection(db, "ReserveList"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as ReserveList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  /**=======
   * 並び替え
   *=======*/
  const sortReset = async () => {
    const db = getFirestore();
    const q = query(collection(db, "ReserveList"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as ReserveList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  const sortWeek = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "ReserveList"),
      orderBy("WeekNumber", "asc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as ReserveList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  const sortWeekAndWeekday = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "ReserveList"),
      orderBy("WeekNumber", "asc"),
      orderBy("DayOfWeekNumber", "asc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return;
    }
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as ReserveList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  return (
    <React.Fragment>
      <Title>固定予約一覧表</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>講師名</TableCell>
            <TableCell>生徒名</TableCell>
            <TableCell>コース</TableCell>
            <TableCell>
              週目
              <IconButton onClick={sortWeek}>
                <FilterListIcon />
              </IconButton>
              <IconButton onClick={sortReset}>
                <RestartAltIcon />
              </IconButton>
            </TableCell>
            <TableCell onClick={sortWeekAndWeekday}>
              曜日
              <IconButton>
                <FilterListIcon />
              </IconButton>
              <IconButton onClick={sortReset}>
                <RestartAltIcon />
              </IconButton>
            </TableCell>
            <TableCell>
              時間
              <IconButton>
                <FilterListIcon />
              </IconButton>
              <IconButton onClick={sortReset}>
                <RestartAltIcon />
              </IconButton>
            </TableCell>
            <TableCell>備考</TableCell>
            <TableCell>
              完了
              <IconButton>
                <FilterListIcon />
              </IconButton>
              <IconButton onClick={sortReset}>
                <RestartAltIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Reserves.map((rsv) => (
            <TableRow key={rsv.id}>
              <TableCell>{rsv.Teacher}</TableCell>
              <TableCell>{rsv.Student}</TableCell>
              <TableCell>{rsv.Course}</TableCell>
              <TableCell>{rsv.WeekNumber}</TableCell>
              <TableCell>{rsv.DayOfWeek}</TableCell>
              <TableCell>{dayjs(rsv.Time.toDate()).format("HH:mm")}</TableCell>
              <TableCell>{rsv.More}</TableCell>
              <TableCell>
                <Checkbox
                  checked={rsv.completed}
                  onClick={() => UpdateReserve(rsv.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
