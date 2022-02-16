import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  Timestamp,
  startAt,
  endAt,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { useRouter } from "next/router";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import { teal } from "@mui/material/colors";

//Modalのスタイル
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

//予約一覧ページ　予約済みフラグ(reserved)が true のみ表示
//シフト提出者IDとユーザーIDが一致する予約のみ表示
export default function Shifts() {
  const [reserves, setReserves] = useState<FreeList[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  const [test, setTest] = useState<string>("");
  const day = new Date();
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
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
        where("senderUid", "==", user.uid),
        orderBy("date", "desc"),
        orderBy("time", "asc")
      );
      const snapshot = await getDocs(q);
      console.log(user.displayName);
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
  /**=======
   * 並び替え
   *=======*/
  const sortReset = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      orderBy("date", "desc"),
      orderBy("time", "asc")
    );
    const snapshot = await getDocs(q);
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as FreeList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  //過去含めた全ての予約を表示
  const dayFilter = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("date", ">=", timestamp(xxx)),
      where("senderUid", "==", user.uid),
      orderBy("date", "desc"),
      orderBy("time", "asc")
    );
    const snapshot = await getDocs(q);
    const gotReservers = snapshot.docs.map((doc) => {
      const reserve = doc.data() as FreeList;
      reserve.id = doc.id;
      return reserve;
    });
    setReserves(gotReservers);
  };
  /**========
   * シフト削除
   *========*/
  const deleteShift = async (id: string, e: any) => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      orderBy("date", "desc"),
      orderBy("time", "asc")
    );
    e.stopPropagation();
    await deleteDoc(doc(db, "FreeSpace", id));
    const snapshot = await getDocs(q);
    const gotShift = snapshot.docs.map((doc) => {
      const shift = doc.data() as FreeList;
      shift.id = doc.id;
      return shift;
    });
    setReserves(gotShift);
  };
  return (
    <React.Fragment>
      <>
        <Box ml={3}>
          <Title>提出シフト一覧</Title>
        </Box>
        {test.indexOf("管理者") !== -1 && (
          <Box ml={3}>
            <Button onClick={() => router.push(`/shift/list/all/${user.uid}`)}>
              全講師のシフトを見る
            </Button>
          </Box>
        )}
        <Table size="small">
          <TableHead style={{ backgroundColor: "#FFFFDD" }}>
            <TableRow>
              <TableCell style={{ fontWeight: 600, width: "25%" }}>
                <Box>講師名</Box>
              </TableCell>
              <TableCell style={{ fontWeight: 600 }}>
                <Box>
                  日時
                  <IconButton
                    onClick={() => {
                      dayFilter();
                    }}
                  >
                    <FilterListIcon />
                  </IconButton>
                  <IconButton onClick={sortReset}>
                    <RestartAltIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
              <TableCell style={{ fontWeight: 600 }}>状態</TableCell>
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
                  <Box display="flex" alignItems="center">
                    {`${rsv.time}:30`}
                    {rsv.reserved == false && (
                      <Tooltip title="シフトを閉じる" arrow>
                        <IconButton onClick={(e) => deleteShift(rsv.id, e)}>
                          <DeleteIcon
                            sx={{
                              fontSize: 20,
                              color: teal[500],
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  {rsv.student === "" ? "未予約" : "予約済み"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    </React.Fragment>
  );
}
