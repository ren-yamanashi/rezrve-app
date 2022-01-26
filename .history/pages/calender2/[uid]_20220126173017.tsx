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
  serverTimestamp,
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
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [eventsData, setEventsData] = useState(events);
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
    async function loadFree() {
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("reserved", "==", true)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
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
  const handleSelect = () => {
    console.log("a");
    const teacher = window.prompt("New Event name");
    if (teacher)
      setFreeLists([
        ...freeLists,
        {
          teacher,
          student: "",
          course: "Vo",
          date: "",
          time: 10,
          reserved: true,
          completed: false,
          senderUid: user.uid,
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
        events={eventsData}
        style={{ height: "90vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
        formats={formats}
      />
    </>
  );
}
