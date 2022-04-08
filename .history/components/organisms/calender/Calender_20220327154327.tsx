import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { browser } from "process";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Box from "@mui/material/Box";
import { createMedia } from "@artsy/fresnel";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import { blue, grey, teal } from "@mui/material/colors";
//内部インポート
import { FreeList } from "../../../models/FreeList";
import { useAuth } from "../../../hooks/useUserAuth";
import { useHandle } from "../../../hooks/handle/useHandle";
import { useDeleteShift } from "../../../hooks/teacher/deleteReserves/useDeleteRsv";
import { useRouter } from "next/router";
import RsvModal from "../../templates/Modal/RsvModal";
//Itemのスタイル
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "#FFFFDD",
}));
const Item2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
//Modalのスタイル（予約確認画面）
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
moment.locale("ja");

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

export default function Calendar1() {
  const db = getFirestore();
  const { chancelRsv } = useDeleteShift();
  const { handleClose4, handleOpen4 } = useHandle();
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [rsvDate, setRsvDate] = useState("");
  const [student, setStudent] = useState("");
  const [rsvId, setRsvId] = useState("");
  const { user } = useAuth();
  const localizer = momentLocalizer(moment);
  const formats = {
    dateFormat: "D",
    dayFormat: "D(ddd)",
    monthHeaderFormat: "YYYY/MM",
    dayHeaderFormat: "MM/DD(ddd)",
    dayRangeHeaderFormat: "YYYY/MM",
  };
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    async function loadFree() {
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("reserved", "==", true),
        orderBy("time")
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
  /**==========
   * イベント作成
   *==========*/
  const setEvent = freeLists.map((e) => {
    return {
      id: e.id,
      title: `${e.time}:00 ${e.student}`,
      start: new Date(e.date.toDate().setHours(e.time)), //これだとできる
      // start:new Date (e.date), //これだとエラーになる ※dateはタイムスタンプ型
      end: new Date(e.date.toDate().setHours(e.time + 1)),
      student: e.student,
      date: `${dayjs(e.date.toDate()).format("YYYY/MM/DD ")} ${e.time}:00~`,
    };
  });
  /**==========
   * イベント作成（スマホ用）
   *==========*/
  const setEventAtSm = freeLists.map((e) => {
    return {
      id: e.id,
      title: `${e.time}:00`,
      start: new Date(e.date.toDate().setHours(e.time)), //これだとできる
      // start:new Date (e.date), //これだとエラーになる ※dateはタイムスタンプ型
      end: new Date(e.date.toDate().setHours(e.time + 1)),
      student: e.student,
      date: `${dayjs(e.date.toDate()).format("YYYY/MM/DD ")} ${e.time}:00~`,
    };
  });
  return (
    <>
      <MediaContextProvider>
        <React.Fragment>
          <Media greaterThan="sm">
            <Box mb={3} width="95%" mx="auto">
              <Calendar
                views={["month"]}
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={setEvent}
                style={{ height: "180vh" }}
                onSelectEvent={(event) => {
                  handleOpen4();
                  setStudent(event.student);
                  setRsvDate(event.date);
                  setRsvId(event.id);
                }}
                formats={formats}
              />
            </Box>
          </Media>
          <Media at="sm">
            <Box overflow="scroll">
              <Box mb={3} width="120%" mx="auto">
                <Calendar
                  views={["month"]}
                  selectable
                  localizer={localizer}
                  defaultDate={new Date()}
                  defaultView="month"
                  events={setEventAtSm}
                  style={{
                    height: "200vh",
                  }}
                  onSelectEvent={(event) => {
                    handleOpen4();
                    setStudent(event.student);
                    setRsvDate(event.date);
                    setRsvId(event.id);
                  }}
                  formats={formats}
                />
              </Box>
            </Box>
          </Media>
          {/* モーダル　予約内容詳細 */}
          <RsvModal
            date={rsvDate}
            teacher={user && user.displayName}
            student={student}
            chancelRsv={(e) => chancelRsv(e, rsvId, handleClose4())}
          />

          <ToastContainer />
        </React.Fragment>
      </MediaContextProvider>
    </>
  );
}
