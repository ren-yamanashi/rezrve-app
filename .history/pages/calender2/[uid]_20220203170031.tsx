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
  startAt,
  endAt,
  Timestamp,
  Firestore,
} from "firebase/firestore";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { browser } from "process";
import React, { useState, Component, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment, { now } from "moment";
import events from "../../hooks/useEvents";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Box from "@mui/material/Box";
import Toolbar from "react-big-calendar";
//内部インポート
import Header from "../../components/templates/Header";
import { FreeList } from "../../models/FreeList";
import { useAuth } from "../../hooks/useUserAuth";
import { toDate } from "date-fns/esm";
import Title from "../../components/atoms/Title";
import { Router, useRouter } from "next/router";

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

moment.locale("ja");

export default function ReactBigCalendar() {
  const db = getFirestore();
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [eventsData, setEventsData] = useState(events);
  const { user } = useAuth();
  const localizer = momentLocalizer(moment);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const router = useRouter();
  const handleClose = () => setOpen(false);
  const formats = {
    dateFormat: "D日",
    dayFormat: "D(ddd)日",
    monthHeaderFormat: "YYYY年M月",
    dayHeaderFormat: "M月D日(ddd)",
    dayRangeHeaderFormat: "YYYY年M月",
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
  // const handleSelect = ({ start, end }) => {
  //   const title = window.prompt("New Event name");
  //   if (title)
  //     setEventsData([
  //       ...eventsData,
  //       {
  //         start,
  //         end,
  //         title,
  //         id: null,
  //       },
  //     ]);
  // };
  const setEvent = freeLists.map((e) => {
    // console.log(e.date);
    return {
      id: e.id,
      title: e.student,
      start: new Date(e.date.toDate().setHours(e.time)), //これだとできる
      // start:new Date (e.date), //これだとエラーになる ※dateはタイムスタンプ型
      end: new Date(e.date.toDate().setHours(e.time + 1)),
    };
  });
  // const setEvent2 = [
  //   {
  //     id: 1,
  //     title: "今日",
  //     start: new Date(new Date().setHours(new Date().getHours() - 3)),
  //     end: new Date(new Date().setHours(new Date().getHours() + 3)),
  //   },
  //   {
  //     id: 2,
  //     title: "テストイベント",
  //     start: new Date(),
  //     end: new Date(),
  //   },
  // ];

  return (
    <>
      <Header />
      <React.Fragment>
        <Box ml={5} mb={3}>
          <Title>予約カレンダー</Title>
        </Box>
        <Box m={5}>
          <Calendar
            views={["day", "week", "month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={setEvent}
            style={{ height: "90vh", innerWidth: "90vh" }}
            onSelectEvent={() =>
              router.push(`/reserve/add/${freeLists.map((item) => item.id)}`)
            }
            formats={formats}
            // onSelectSlot={handleSelect}
          />
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box textAlign="center">
              <Button
                type="submit"
                onClick={() => {
                  handleClose();
                }}
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 3 }}
              >
                決定
              </Button>
            </Box>
          </Box>
        </Modal>
      </React.Fragment>
    </>
  );
}
