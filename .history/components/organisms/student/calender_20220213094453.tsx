import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { browser } from "process";
import React, { useState, Component, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment, { now } from "moment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Toolbar from "react-big-calendar";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
//内部インポート
import Header from "../../templates/Header";
import { FreeList } from "../../../models/FreeList";
import { useAuth } from "../../../hooks/useUserAuth";
import { toDate } from "date-fns/esm";
import Title from "../../atoms/Title";
import { useRouter } from "next/router";
import events from "../../../hooks/useEvents";

moment.locale("ja");

export default function CalendarStudent() {
  const db = getFirestore();
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [test, setTest] = useState<string>("");
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
      const u = user;
      setTest(u.displayName);
      const q = query(
        collection(db, "FreeSpace"),
        where("reserverUid", "==", user.uid),
        where("reserved", "==", true)
        // orderBy("time")
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
      <React.Fragment>
        <Box ml={5}>
          <>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 140, color: "#0288d1", mb: 3 }}
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ color: "#0288d1" }}
              >
                予約確認
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
              >
                <MenuItem>
                  <Button
                    onClick={() =>
                      router.push(`/reserve/students/list/${user?.uid}`)
                    }
                  >
                    予約済み一覧
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    onClick={() =>
                      router.push(`/reserve/students/calender/${user?.uid}`)
                    }
                  >
                    予約カレンダー
                  </Button>
                </MenuItem>
              </Select>
            </FormControl>
          </>
        </Box>
        <Box mb={3} width="95%" mx="auto">
          <Calendar
            views={["day", "week", "month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={setEvent}
            style={{ height: "90vh" }}
            onSelectEvent={(event) => router.push(`/reserve/edit/${event.id}`)}
            formats={formats}
          />
        </Box>
      </React.Fragment>
    </>
  );
}
