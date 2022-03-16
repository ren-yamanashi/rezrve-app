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
import "react-big-calendar/lib/css/react-big-calendar.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Toolbar from "react-big-calendar";
import Button from "@mui/material/Button";
import { createMedia } from "@artsy/fresnel";
//内部インポート
import Header from "../../templates/Header";
import { FreeList } from "../../../models/FreeList";
import { useAuth } from "../../../hooks/useUserAuth";
import { toDate } from "date-fns/esm";
import Title from "../../atoms/Title";
import { useRouter } from "next/router";

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
      title: `${e.time}:00 ${e.student}`,
      start: new Date(e.date.toDate().setHours(e.time)), //これだとできる
      // start:new Date (e.date), //これだとエラーになる ※dateはタイムスタンプ型
      end: new Date(e.date.toDate().setHours(e.time + 1)),
    };
  });
  const setEventAtSm = freeLists.map((e) => {
    // console.log(e.date);
    return {
      id: e.id,
      title: `${e.time}:00`,
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
                onSelectEvent={(event) =>
                  router.push(`/reserve/edit/${event.id}`)
                }
                formats={formats}
                onSelectSlot={() => router.reload()}
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
                  style={{ height: "180vh", innerWidth: 150, outerWidth: 150 }}
                  onSelectEvent={(event) =>
                    router.push(`/reserve/edit/${event.id}`)
                  }
                  formats={formats}
                  onSelectSlot={() => router.reload()}
                />
              </Box>
            </Box>
          </Media>
        </React.Fragment>
      </MediaContextProvider>
    </>
  );
}

// class CustomToolbar extends Component {
// 	render() {
// 	  return (
// 		<div className='rbc-toolbar'>
// 		  <span className="rbc-btn-group">
// 			<button type="button" onClick={() => this.navigate('TODAY')} >today</button>
// 			<button type="button" onClick={() => this.navigate('PREV')}>back</button>
// 			<button type="button" onClick={() => this.navigate('NEXT')}>next</button>
// 		  </span>
// 		</div>
// 	  );
// 	}

// 	navigate = action => {
// 	  console.log(action);

// 	  this.onNavigate(action)
// 	}
//   }
