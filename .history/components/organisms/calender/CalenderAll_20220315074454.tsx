import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { browser } from "process";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Box from "@mui/material/Box";
//内部インポート
import { FreeList } from "../../../models/FreeList";
import { useAuth } from "../../../hooks/useUserAuth";
import { useRouter } from "next/router";

moment.locale("ja");

export default function CalendarAll() {
  const db = getFirestore();
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const { user } = useAuth();
  const localizer = momentLocalizer(moment);
  const router = useRouter();
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
  const setEvent = freeLists.map((e) => {
    // console.log(e.date);
    return {
      id: e.id,
      title: `${e.time}:00~ ${e.teacher} ${e.student}`,
      start: new Date(e.date.toDate().setHours(e.time)), //これだとできる
      // start:new Date (e.date), //これだとエラーになる ※dateはタイムスタンプ型
      end: new Date(e.date.toDate().setHours(e.time + 1)),
    };
  });
  return (
    <>
      <React.Fragment>
        <Box mb={3} mx="auto" mt={5}>
          <Calendar
            views={["month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={setEvent}
            style={{ height: "120vh" }}
            onSelectEvent={(event) => router.push(`/reserve/edit/${event.id}`)}
            formats={formats}
          />
        </Box>
      </React.Fragment>
    </>
  );
}
