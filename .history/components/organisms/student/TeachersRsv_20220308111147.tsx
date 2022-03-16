import {
  collection,
  getFirestore,
  query,
  getDocs,
  deleteDoc,
  doc,
  where,
  Timestamp,
  orderBy,
  startAt,
  endAt,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FilterListIcon from "@mui/icons-material/FilterList";
import RadioGroup from "@mui/material/RadioGroup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment, { now } from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "@mui/lab/DatePicker";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { browser } from "process";
import Link_mui from "@mui/material/Link";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { TextField } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Typography from "@mui/material/Typography";
import { blue, teal } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import { ja } from "date-fns/locale";
import { useRouter } from "next/router";

moment.locale("ja");

//日付をTimeStamp型にして返す
const timestamp = (datetimeStr: any) => {
  return Timestamp.fromDate(new Date(datetimeStr));
};

//queryの方を準備
type Query = {
  id: string;
};

export default function TeachersRsv() {
  const router = useRouter();
  const query_ = router.query as Query;
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const { user } = useAuth();
  const [err, setErr] = useState<boolean>(false);
  const [u, setU] = useState<Users>();
  const [value, setValue] = useState("");

  const day = new Date();
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx2 = new Date(y, m, d, 12, 0, 0);
  const formats = {
    dateFormat: "M/D",
    dayFormat: "M/D(ddd)",
    monthHeaderFormat: "YYYY年/MM月",
    dayHeaderFormat: "YYYY",
    dayRangeHeaderFormat: "YYYY年",
  };
  const localizer = momentLocalizer(moment);

  //collection設定
  function getCollections() {
    const db = getFirestore();
    return {
      db,
      userCollection: collection(db, "users"),
    };
  }
  /**========
   * Firebaseからユーザーを取得
   *========*/
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    async function loadUser() {
      if (query_.id === undefined) {
        return;
      }
      const db = getFirestore();
      const { userCollection } = getCollections();
      const userDoc = await getDoc(doc(userCollection, query_.id));
      if (!userDoc.exists()) {
        return;
      }
      const gotUser = userDoc.data() as Users;
      gotUser.id = userDoc.id;
      setU(gotUser);
      setValue("成功");
    }
    loadUser();
  }, [process, browser, user, query_.id]);
  const loadRsv = async () => {
    console.log(u.userName);
  };

  if (value == "成功") {
    console.log(u.userName);
    loadRsv();
  }

  const setEvent = freeLists.map((e) => {
    // console.log(e.date);
    return {
      id: e.id,
      title: e.teacher,
      start: new Date(e.date.toDate().setHours(e.time)), //これだとできる
      // start:new Date (e.date), //これだとエラーになる ※dateはタイムスタンプ型
      end: new Date(e.date.toDate().setHours(e.time + 1)),
    };
  });
  return (
    <>
      <React.Fragment>
        <>
          <Box mb={3} width="95%" mx="auto">
            <Calendar
              views={["week", "month"]}
              selectable
              localizer={localizer}
              defaultDate={new Date()}
              defaultView="month"
              events={setEvent}
              style={{ height: "180vh" }}
              onSelectEvent={(event) =>
                router.push(`/reserve/edit/${event.id}`)
              }
              formats={formats}
              onSelectSlot={() => router.reload()}
            />
          </Box>
          {/* <Box mb={3} ml={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
              <DatePicker
                label="日付を選択"
                value={value}
                onChange={async (newValue) => {
                  setValue(newValue);
                  setErr(false);
                  const day3 = new Date(newValue);
                  const y3 = day3.getFullYear();
                  const m3 = day3.getMonth();
                  const d3 = day3.getDate();
                  let xxx = new Date(y3, m3, d3, 12, 0, 0);
                  const db = getFirestore();
                  console.log(xxx);
                  console.log(query_);
                  const q = query(
                    collection(db, "FreeSpace"),
                    where("teacher", "==", u.userName),
                    where("reserved", "==", false),
                    where("date", "==", timestamp(xxx)),
                    orderBy("time", "asc")
                  );
                  const snapshot = await getDocs(q);
                  if (snapshot.empty) {
                    setErr(true);
                  }
                  const getReserves = snapshot.docs.map((doc) => {
                    const reserve = doc.data() as FreeList;
                    reserve.id = doc.id;
                    return reserve;
                  });
                  setFreeLists(getReserves);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Table size="small">
            <TableHead style={{ backgroundColor: "#FFFFDD" }}>
              <TableRow>
                <TableCell style={{ fontWeight: 600, width: "30%" }}>
                  <Box ml={3} fontSize={12}>
                    講師名
                  </Box>
                </TableCell>
                <TableCell style={{ fontWeight: 600, width: "30%" }}>
                  <Box margin="auto" display="flex">
                    <Box mx={3} my="auto" fontSize={12}>
                      日付
                    </Box>
                  </Box>
                </TableCell>
                <TableCell style={{ fontWeight: 600 }}>
                  <Box ml={5} fontSize={12}>
                    時間
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {freeLists.map((freeList) => (
                <TableRow key={freeList.id}>
                  <TableCell>
                    <Box ml={3} fontSize={10}>
                      {freeList.teacher}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box ml={3} fontSize={10}>
                      {dayjs(freeList.date.toDate()).format("YYYY/MM/DD ")}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={`予約する:${freeList.teacher}`} arrow>
                      <Button
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          ml: 3,
                          bgcolor: "#0072E5",
                          color: "white",
                          "&:hover": { bgcolor: "#0059B2" },
                          fontSize: 10,
                        }}
                      >
                        {`${freeList.time}:30`}
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
        </>
      </React.Fragment>
    </>
  );
}
