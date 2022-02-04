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
import { browser } from "process";
import React, { useState, Component, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment, { now } from "moment";
import events from "../../hooks/useEvents";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Box from "@mui/material/Box";
//内部インポート
import Header from "../../components/templates/Header";
import { FreeList } from "../../models/FreeList";
import { useAuth } from "../../hooks/useUserAuth";
import { toDate } from "date-fns/esm";
import Title from "../../components/atoms/Title";

moment.locale("ja");

export default function ReactBigCalendar() {
  const db = getFirestore();
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [eventsData, setEventsData] = useState(events);
  const { user } = useAuth();
  const localizer = momentLocalizer(moment);
  const a = freeLists.map((item) => item.date);
  console.log(a);
  const b = a.map((i) => i.toDate());
  console.log(b);

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
  const setEvent2 = [
    {
      id: 1,
      title: "今日",
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
      id: 2,
      title: "テストイベント",
      start: new Date(),
      end: new Date(),
    },
  ];
  return (
    <>
      <Header />
      <React.Fragment>
        <Box ml={5} mb={3}>
          <Title>予約カレンダー</Title>
        </Box>
        <Box m={3}>
          <Calendar
            views={["day", "week", "month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={setEvent}
            style={{ height: "90vh", innerWidth: "90vh" }}
            onSelectEvent={(event) => alert(event.title)}
            // onSelectSlot={handleSelect}
          />
        </Box>
      </React.Fragment>
    </>
  );
}
