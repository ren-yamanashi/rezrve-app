import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import dayjs from "dayjs";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import TextField from "@mui/material/TextField";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import Header from "../../templates/Header";
import { useRouter } from "next/router";
import { browser } from "process";
import { teal } from "@mui/material/colors";

//スケジュール表の作成　全てのスケジュールを参照することができる。
//※ただし、このサイトリンクが表示されるのは名前に「管理者」がつく場合のみ
export default function SelectDayAll() {
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [freeLists10, setFreeLists10] = useState<FreeList[]>([]);
  const [freeLists11, setFreeLists11] = useState<FreeList[]>([]);
  const [freeLists12, setFreeLists12] = useState<FreeList[]>([]);
  const [freeLists13, setFreeLists13] = useState<FreeList[]>([]);
  const [freeLists14, setFreeLists14] = useState<FreeList[]>([]);
  const [freeLists15, setFreeLists15] = useState<FreeList[]>([]);
  const [freeLists16, setFreeLists16] = useState<FreeList[]>([]);
  const [freeLists17, setFreeLists17] = useState<FreeList[]>([]);
  const [freeLists18, setFreeLists18] = useState<FreeList[]>([]);
  const [empty14, setEmpty14] = useState<boolean>(false);
  const [value, setValue] = useState<Date | null>(null);
  const [err, setErr] = useState(false);
  const [test, setTest] = useState("");
  const day = new Date(value);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  const { user } = useAuth();
  const router = useRouter();
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
  return (
    <>
      <React.Fragment>
        <Box ml={3}>
          <Title>予約スケジュール一覧</Title>
        </Box>
        <Box
          ml={5}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Box mr={5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="日付を選択"
                value={value}
                onChange={async (newValue) => {
                  console.log(newValue);
                  setValue(newValue);
                  setErr(false);
                  const day3 = new Date(newValue);
                  const y3 = day3.getFullYear();
                  const m3 = day3.getMonth();
                  const d3 = day3.getDate();
                  let xxx = new Date(y3, m3, d3, 12, 0, 0);
                  const db = getFirestore();
                  const q = query(
                    collection(db, "FreeSpace"),
                    where("senderUid", "==", user.uid),
                    where("date", "==", timestamp(xxx))
                  );
                  const snapshot = await getDocs(q);
                  if (snapshot.empty) {
                    setErr(true);
                  }
                  //FreeList一覧の展開
                  const gotFreeList = snapshot.docs.map((doc) => {
                    const free = doc.data() as FreeList;
                    free.id = doc.id;
                    return free;
                  });
                  setFreeLists(gotFreeList);
                  async function loadRsv() {
                    const db = getFirestore();
                    const u = user;
                    setTest(u.displayName);
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx))
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setErr(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists(gotFreeList);
                  }
                  //10時
                  async function loadRsv10() {
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 10)
                    );
                    const snapshot = await getDocs(q);
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists10(gotFreeList);
                  }
                  //11時
                  async function loadRsv11() {
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 11)
                    );
                    const snapshot = await getDocs(q);
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists11(gotFreeList);
                  }
                  //12時
                  async function loadRsv12() {
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 12)
                    );
                    const snapshot = await getDocs(q);
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists12(gotFreeList);
                  }
                  //13時
                  async function loadRsv13() {
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 13)
                    );
                    const snapshot = await getDocs(q);
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists13(gotFreeList);
                  }
                  //14時
                  async function loadRsv14() {
                    setEmpty14(false);
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 14)
                    );
                    const snapshot = await getDocs(q);
                    if (snapshot.empty) {
                      setEmpty14(true);
                    }
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists14(gotFreeList);
                  }
                  //15時
                  async function loadRsv15() {
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 15)
                    );
                    const snapshot = await getDocs(q);
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists15(gotFreeList);
                  }
                  //16時
                  async function loadRsv16() {
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 16)
                    );
                    const snapshot = await getDocs(q);
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists16(gotFreeList);
                  }
                  //17時
                  async function loadRsv17() {
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 17)
                    );
                    const snapshot = await getDocs(q);
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists17(gotFreeList);
                  }
                  //18時
                  async function loadRsv18() {
                    const db = getFirestore();
                    const q = query(
                      collection(db, "FreeSpace"),
                      where("senderUid", "==", user.uid),
                      where("date", "==", timestamp(xxx)),
                      where("time", "==", 18)
                    );
                    const snapshot = await getDocs(q);
                    //FreeList一覧の展開
                    const gotFreeList = snapshot.docs.map((doc) => {
                      const free = doc.data() as FreeList;
                      free.id = doc.id;
                      return free;
                    });
                    setFreeLists18(gotFreeList);
                  }
                  loadRsv(),
                    loadRsv10(),
                    loadRsv11(),
                    loadRsv12(),
                    loadRsv13(),
                    loadRsv14(),
                    loadRsv15(),
                    loadRsv16(),
                    loadRsv17(),
                    loadRsv18();
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        {err == true ? (
          <Box textAlign="center">
            <Grid xs={12} sm={15}>
              <Alert variant="filled" severity="info" sx={{ m: 3 }}>
                予約が見つかりませんでした
              </Alert>
            </Grid>
          </Box>
        ) : (
          // <Box display="flex">
          //   <Grid container>
          //     <Grid item xs={12} sm={12} lg={1.33} md={1.3}>
          //       <Typography
          //         sx={{ mt: 4, mb: 2, textAlign: "center" }}
          //         variant="h6"
          //         component="div"
          //       >
          //         10:30
          //       </Typography>
          //       <Divider />
          //       <List>
          //         {freeLists10.map((item) => (
          //           <ListItem key={item.id}>
          //             {item.student !== "" ? (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   bgcolor: "#3CB371",
          //                   "&:hover": { bgcolor: "#2E8B57" },
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() =>
          //                   router.push(`/reserve/edit/${item.id}`)
          //                 }
          //               />
          //             ) : (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() => router.push(`/reserve/add/${item.id}`)}
          //               />
          //             )}
          //           </ListItem>
          //         ))}
          //       </List>
          //     </Grid>
          //     <Grid item xs={12} sm={12} lg={1.33} md={1.3}>
          //       <Typography
          //         sx={{ mt: 4, mb: 2, textAlign: "center" }}
          //         variant="h6"
          //         component="div"
          //       >
          //         11:30
          //       </Typography>
          //       <Divider />
          //       <List>
          //         {freeLists11.map((item) => (
          //           <ListItem key={item.id}>
          //             {item.student !== "" ? (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   bgcolor: "#3CB371",
          //                   "&:hover": { bgcolor: "#2E8B57" },
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() =>
          //                   router.push(`/reserve/edit/${item.id}`)
          //                 }
          //               />
          //             ) : (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() => router.push(`/reserve/add/${item.id}`)}
          //               />
          //             )}
          //           </ListItem>
          //         ))}
          //       </List>
          //     </Grid>
          //     <Grid item xs={12} sm={12} lg={1.33} md={1.3}>
          //       <Typography
          //         sx={{ mt: 4, mb: 2, textAlign: "center" }}
          //         variant="h6"
          //         component="div"
          //       >
          //         12:30
          //       </Typography>
          //       <Divider />
          //       <List>
          //         {freeLists12.map((item) => (
          //           <ListItem key={item.id}>
          //             {item.student !== "" ? (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   bgcolor: "#3CB371",
          //                   "&:hover": { bgcolor: "#2E8B57" },
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() =>
          //                   router.push(`/reserve/edit/${item.id}`)
          //                 }
          //               />
          //             ) : (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() => router.push(`/reserve/add/${item.id}`)}
          //               />
          //             )}
          //           </ListItem>
          //         ))}
          //       </List>
          //     </Grid>
          //     <Grid item xs={12} sm={12} lg={1.33} md={1.3}>
          //       <Typography
          //         sx={{ mt: 4, mb: 2, textAlign: "center" }}
          //         variant="h6"
          //         component="div"
          //       >
          //         13:30
          //       </Typography>
          //       <Divider />
          //       <List>
          //         {freeLists13.map((item) => (
          //           <ListItem key={item.id}>
          //             {item.student !== "" ? (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   bgcolor: "#3CB371",
          //                   "&:hover": { bgcolor: "#2E8B57" },
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() =>
          //                   router.push(`/reserve/edit/${item.id}`)
          //                 }
          //               />
          //             ) : (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() => router.push(`/reserve/add/${item.id}`)}
          //               />
          //             )}
          //           </ListItem>
          //         ))}
          //       </List>
          //     </Grid>
          //     <Grid item xs={12} sm={12} lg={1.33} md={1.3}>
          //       <Typography
          //         sx={{ mt: 4, mb: 2, textAlign: "center" }}
          //         variant="h6"
          //         component="div"
          //       >
          //         14:30
          //       </Typography>
          //       <Divider />
          //       {empty14 == true ? (
          //         <Button
          //           variant="contained"
          //           sx={{
          //             bgcolor: "gray",
          //             "&:hover": { bgcolor: "#2E8B57" },
          //             height: 60,
          //             width: "100%",
          //           }}
          //         />
          //       ) : (
          //         <List>
          //           {freeLists14.map((item) => (
          //             <ListItem key={item.id}>
          //               {item.student !== "" ? (
          //                 <Button
          //                   variant="contained"
          //                   sx={{
          //                     bgcolor: "#3CB371",
          //                     "&:hover": { bgcolor: "#2E8B57" },
          //                     height: 60,
          //                     width: "100%",
          //                   }}
          //                   onClick={() =>
          //                     router.push(`/reserve/edit/${item.id}`)
          //                   }
          //                 />
          //               ) : (
          //                 <Button
          //                   variant="contained"
          //                   sx={{
          //                     bgcolor: "#3CB371",
          //                     "&:hover": { bgcolor: "#2E8B57" },
          //                     height: 60,
          //                     width: "100%",
          //                   }}
          //                   onClick={() =>
          //                     router.push(`/reserve/add/${item.id}`)
          //                   }
          //                 />
          //               )}
          //             </ListItem>
          //           ))}
          //         </List>
          //       )}
          //     </Grid>
          //     <Grid item xs={12} sm={12} lg={1.33} md={1.3}>
          //       <Typography
          //         sx={{ mt: 4, mb: 2, textAlign: "center" }}
          //         variant="h6"
          //         component="div"
          //       >
          //         15:30
          //       </Typography>
          //       <Divider />
          //       <List>
          //         {freeLists15.map((item) => (
          //           <ListItem key={item.id}>
          //             {item.student !== "" ? (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   bgcolor: "#3CB371",
          //                   "&:hover": { bgcolor: "#2E8B57" },
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() =>
          //                   router.push(`/reserve/edit/${item.id}`)
          //                 }
          //               />
          //             ) : (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() => router.push(`/reserve/add/${item.id}`)}
          //               />
          //             )}
          //           </ListItem>
          //         ))}
          //       </List>
          //     </Grid>
          //     <Grid item xs={12} sm={12} lg={1.33} md={1.3}>
          //       <Typography
          //         sx={{ mt: 4, mb: 2, textAlign: "center" }}
          //         variant="h6"
          //         component="div"
          //       >
          //         16:30
          //       </Typography>
          //       <Divider />
          //       <List>
          //         {freeLists16.map((item) => (
          //           <ListItem key={item.id}>
          //             {item.student !== "" ? (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   bgcolor: "#3CB371",
          //                   "&:hover": { bgcolor: "#2E8B57" },
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() =>
          //                   router.push(`/reserve/edit/${item.id}`)
          //                 }
          //               />
          //             ) : (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() => router.push(`/reserve/add/${item.id}`)}
          //               />
          //             )}
          //           </ListItem>
          //         ))}
          //       </List>
          //     </Grid>
          //     <Grid item xs={12} sm={12} lg={1.33} md={1.3}>
          //       <Typography
          //         sx={{ mt: 4, mb: 2, textAlign: "center" }}
          //         variant="h6"
          //         component="div"
          //       >
          //         17:30
          //       </Typography>
          //       <Divider />
          //       <List>
          //         {freeLists17.map((item) => (
          //           <ListItem key={item.id}>
          //             {item.student !== "" ? (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   bgcolor: "#3CB371",
          //                   "&:hover": { bgcolor: "#2E8B57" },
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() =>
          //                   router.push(`/reserve/edit/${item.id}`)
          //                 }
          //               />
          //             ) : (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() => router.push(`/reserve/add/${item.id}`)}
          //               />
          //             )}
          //           </ListItem>
          //         ))}
          //       </List>
          //     </Grid>
          //     <Grid item xs={12} sm={12} lg={1.33} md={1.3}>
          //       <Typography
          //         sx={{ mt: 4, mb: 2, textAlign: "center" }}
          //         variant="h6"
          //         component="div"
          //       >
          //         18:30
          //       </Typography>
          //       <Divider />
          //       <List>
          //         {freeLists18.map((item) => (
          //           <ListItem key={item.id}>
          //             {item.student !== "" ? (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   bgcolor: "#3CB371",
          //                   "&:hover": { bgcolor: "#2E8B57" },
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() =>
          //                   router.push(`/reserve/edit/${item.id}`)
          //                 }
          //               />
          //             ) : (
          //               <Button
          //                 variant="contained"
          //                 sx={{
          //                   height: 60,
          //                   width: "100%",
          //                 }}
          //                 onClick={() => router.push(`/reserve/add/${item.id}`)}
          //               />
          //             )}
          //           </ListItem>
          //         ))}
          //       </List>
          //     </Grid>
          //   </Grid>
          // </Box>
          <Table size="small">
            <TableHead style={{ backgroundColor: "#FFFFDD" }}>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>10:30</TableCell>
                <TableCell style={{ fontWeight: 600 }}>11:30</TableCell>
                <TableCell style={{ fontWeight: 600 }}>12:30</TableCell>
                <TableCell style={{ fontWeight: 600 }}>13:30</TableCell>
                <TableCell style={{ fontWeight: 600 }}>14:30</TableCell>
                <TableCell style={{ fontWeight: 600 }}>15:30</TableCell>
                <TableCell style={{ fontWeight: 600 }}>16:30</TableCell>
                <TableCell style={{ fontWeight: 600 }}>17:30</TableCell>
                <TableCell style={{ fontWeight: 600 }}>18:30</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={freeLists.length}>
                {freeLists10.map((value) =>
                  value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[500],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                        }}
                        onClick={() => router.push(`/reserve/add/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: "white",
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                        }}
                        onClick={() => router.push(`/reserve/edit/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
                {freeLists11.map((value) =>
                  value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[500],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                          height: 60,
                        }}
                        onClick={() => router.push(`/reserve/add/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: "white",
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                        }}
                        onClick={() => router.push(`/reserve/edit/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
                {freeLists12.map((value) =>
                  value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[500],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                        }}
                        onClick={() => router.push(`/reserve/add/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: "white",
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                        }}
                        onClick={() => router.push(`/reserve/edit/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
                {freeLists13.map((value) =>
                  value.student !== "" ? (
                    <Tooltip
                      title={
                        <>
                          <Box>{`講師名:${value.teacher}`}</Box>
                          <Box>{`生徒名:${value.student}`}</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: teal[500],
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                        }}
                        onClick={() => router.push(`/reserve/add/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        <>
                          <Box>クリックして予約</Box>
                          <Box>{`レッスン日時:${dayjs(
                            value.date.toDate()
                          ).format("YYYY/MM/DD ")} ${value.time}:30`}</Box>
                        </>
                      }
                      arrow
                    >
                      <TableCell
                        key={value.id}
                        sx={{
                          bgcolor: "white",
                          cursor: "pointer",
                          borderStyle: "dashed",
                          borderWidth: "1px",
                        }}
                        onClick={() => router.push(`/reserve/edit/${value.id}`)}
                      ></TableCell>
                    </Tooltip>
                  )
                )}
                {freeLists14.map((value) => (
                  <TableCell key={value.id}>{value.student}</TableCell>
                ))}
                {freeLists15.map((value) => (
                  <TableCell key={value.id}>{value.student}</TableCell>
                ))}
                {freeLists16.map((value) => (
                  <TableCell key={value.id}>{value.student}</TableCell>
                ))}
                {freeLists17.map((value) => (
                  <TableCell key={value.id}>{value.student}</TableCell>
                ))}
                {freeLists18.map((value) => (
                  <TableCell key={value.id}>{value.student}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        )}
      </React.Fragment>
    </>
  );
}
