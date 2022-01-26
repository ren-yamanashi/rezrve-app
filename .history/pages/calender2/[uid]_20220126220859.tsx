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
import moment from "moment";
import "moment/locale/ja";
import events from "../../hooks/useEvents";
import "react-big-calendar/lib/css/react-big-calendar.css";
//内部インポート
import Header from "../../components/templates/Header";
import { FreeList } from "../../models/FreeList";
import { useAuth } from "../../hooks/useUserAuth";

moment.locale("ja");
const localizer = momentLocalizer(moment);
const formats = {
  dateFormat: "D",
  dayFormat: "D(ddd)",
  monthHeaderFormat: "YYYY年M月",
  dayHeaderFormat: "M月D日(ddd)",
  dayRangeHeaderFormat: "YYYY年M月",
};

export default function ReactBigCalendar() {
  const db = getFirestore();
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [eventsData, setEventsData] = useState(events);
  const getEvents = (fetchInfo: any, callback: any) => {
    retrieveData(fetchInfo.start, fetchInfo.end, callback);
  };
  const retrieveData = async (from: Date, to: Date, callback: any) => {
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", true),
      orderBy("date"),
      startAt(from)
    );
    const snapshot = await getDocs(q);
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists(gotFreeList);
    callback(
      freeLists.map((item) => {
        return {
          start: item.time,
          title: item.student,
          allDay: true,
        };
      })
    );
  };
  const handleSelect = ({ start, end }) => {
    console.log("a");
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
          id: null,
        },
      ]);
  };
  return (
    <>
      <Header />
      <Calendar
        views={["day", "week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={getEvents}
        style={{ height: "90vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
        formats={formats}
      />
    </>
  );
}
