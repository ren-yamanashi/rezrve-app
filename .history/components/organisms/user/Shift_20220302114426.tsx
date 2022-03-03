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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
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
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import DatePicker from "@mui/lab/DatePicker";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { createMedia } from "@artsy/fresnel";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import { teal } from "@mui/material/colors";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 450,
    lg: 990,
    xl: 1200,
  },
});

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
  const [err, setErr] = useState<boolean>(false);
  const [err2, setErr2] = useState<boolean>(false);
  const router = useRouter();
  const [test, setTest] = useState<string>("");
  const initialDate = new Date();
  const [value, setValue] = useState(initialDate);
  const day = new Date();
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  const day2 = new Date(value);
  const y2 = day2.getFullYear();
  const m2 = day2.getMonth();
  const d2 = day2.getDate();
  let xxx2 = new Date(y2, m2, d2, 12, 0, 0);
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
        where("date", "==", timestamp(xxx)),
        orderBy("time", "asc")
      );
      const snapshot = await getDocs(q);
      console.log(user.displayName);
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
        <>
          <Box ml={3}>
            <Title>提出シフト一覧</Title>
            <Box m={3} display="flex" alignItems="center">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="日付を選択"
                  value={value}
                  onChange={async (newValue) => {
                    setValue(newValue);
                    setErr(false);
                    const day2 = new Date(newValue);
                    const y2 = day2.getFullYear();
                    const m2 = day2.getMonth();
                    const d2 = day2.getDate();
                    let xxx2 = new Date(y2, m2, d2, 12, 0, 0);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("date", "==", timestamp(xxx2)),
                      where("senderUid", "==", user.uid),
                      orderBy("time", "asc")
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setErr(true);
                    }
                    const gotReservers = snapshot.docs.map((doc) => {
                      const reserve = doc.data() as FreeList;
                      reserve.id = doc.id;
                      return reserve;
                    });
                    setReserves(gotReservers);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Media greaterThan="sm">
                <Box ml={2}>
                  <IconButton
                    onClick={async () => {
                      const day4 = new Date(value);
                      const y4 = day4.getFullYear();
                      const m4 = day4.getMonth();
                      const d4 = day4.getDate() - 1;
                      let xxx4 = new Date(y4, m4, d4, 12, 0, 0);
                      console.log(xxx4);
                      setErr(false);
                      const db = getFirestore();
                      const q = query(
                        collection(db, "FreeSpace"),
                        where("senderUid", "==", user.uid),
                        where("date", "==", timestamp(xxx4)),
                        orderBy("time", "asc")
                      );
                      const snapshot = await getDocs(q);
                      if (snapshot.empty) {
                        setErr(true);
                      }
                      const getReservers = snapshot.docs.map((doc) => {
                        const reserve = doc.data() as FreeList;
                        return reserve;
                      });
                      setReserves(getReservers);
                      setValue(xxx4);
                      console.log(value);
                    }}
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                  <IconButton
                    onClick={async () => {
                      const day4 = new Date(value);
                      const y4 = day4.getFullYear();
                      const m4 = day4.getMonth();
                      const d4 = day4.getDate() + 1;
                      let xxx4 = new Date(y4, m4, d4, 12, 0, 0);
                      console.log(xxx4);
                      setErr(false);
                      const db = getFirestore();
                      const q = query(
                        collection(db, "FreeSpace"),
                        where("senderUid", "==", user.uid),
                        where("date", "==", timestamp(xxx4)),
                        orderBy("time", "asc")
                      );
                      const snapshot = await getDocs(q);
                      if (snapshot.empty) {
                        setErr(true);
                      }
                      const getReservers = snapshot.docs.map((doc) => {
                        const reserve = doc.data() as FreeList;
                        return reserve;
                      });
                      setReserves(getReservers);
                      setValue(xxx4);
                      console.log(value);
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>
              </Media>
            </Box>
          </Box>
          <Table size="small">
            <TableHead style={{ backgroundColor: "#FFFFDD" }}>
              <TableRow>
                <Media greaterThan="sm">
                  <TableCell style={{ fontWeight: 600, width: "25%" }}>
                    <Box>講師名</Box>
                  </TableCell>
                </Media>
                <TableCell style={{ fontWeight: 600 }}>
                  <Box>日時</Box>
                </TableCell>
                <TableCell style={{ fontWeight: 600 }}>時間</TableCell>
                <TableCell style={{ fontWeight: 600 }}>状態</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reserves.map((rsv) => (
                <TableRow key={rsv.id}>
                  <Media greaterThan="sm">
                    <TableCell style={{ width: "25%", height: 50 }}>
                      <Box my="auto" justifyContent="center">
                        {rsv.teacher}
                      </Box>
                    </TableCell>
                  </Media>
                  <TableCell>
                    {dayjs(rsv.date.toDate()).format("YYYY/MM/DD ")}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" height={35}>
                      {`${rsv.time}:30`}
                      {rsv.reserved == false && (
                        <Tooltip
                          title={
                            err2 == false
                              ? "シフトを閉じる"
                              : "もう一度クリックしてください"
                          }
                          arrow
                        >
                          <IconButton
                            onClick={async () => {
                              setErr2(false);
                              const db = getFirestore();
                              try {
                                await deleteDoc(doc(db, "FreeSpace", rsv.id));
                              } catch (error) {
                                setErr2(true);
                              }
                              const q = query(
                                collection(db, "FreeSpace"),
                                where("senderUid", "==", user.uid),
                                where("date", "==", timestamp(xxx2)),
                                orderBy("time", "asc")
                              );
                              const snapshot = await getDocs(q);
                              if (snapshot.empty) {
                                setErr(true);
                              }
                              const gotShift = snapshot.docs.map((doc) => {
                                const shift = doc.data() as FreeList;
                                shift.id = doc.id;
                                return shift;
                              });
                              setReserves(gotShift);
                            }}
                          >
                            <DeleteIcon
                              sx={{
                                fontSize: 30,
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
          {err == true && (
            <Grid xs={12} sm={15}>
              <Alert
                variant="filled"
                severity="info"
                sx={{ m: 3, textAlign: "center" }}
              >
                提出済みのシフトはありません
              </Alert>
            </Grid>
          )}
        </>
      </MediaContextProvider>
    </React.Fragment>
  );
}
