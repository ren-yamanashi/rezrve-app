import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Box from "@mui/material/Box";
import { createMedia } from "@artsy/fresnel";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
// import my File
import { useReservesAll } from "../../../hooks/teacher/reserves/useReserves";
import { useAuth } from "../../../hooks/useUserAuth";
import { useHandle } from "../../../hooks/handle/useHandle";
import { useDeleteShift } from "../../../hooks/teacher/deleteReserves/useDeleteRsv";
import RsvModal from "../../templates/Modal/RsvModal";
moment.locale("ja");
//create Media
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

export default function Calendar1() {
  const { chancelRsv } = useDeleteShift();
  const { handleClose4, handleOpen4 } = useHandle();
  const { rsv } = useReservesAll();
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
  /**==========
   * Create Event (PC)
   *==========*/
  const setEvent =
    rsv &&
    rsv.map((e) => {
      return {
        id: e.id,
        title: `${e.time}:00 ${e.student}`,
        start: new Date(e.date.toDate().setHours(e.time)),
        // start:new Date (e.date), //これだとエラーになる ※dateはタイムスタンプ型
        end: new Date(e.date.toDate().setHours(e.time + 1)),
        student: e.student,
        date: `${dayjs(e.date.toDate()).format("YYYY/MM/DD ")} ${e.time}:00~`,
      };
    });
  /**==========
   * Create Event (Mobile)
   *==========*/
  const setEventAtSm =
    rsv &&
    rsv.map((e) => {
      return {
        id: e.id,
        title: `${e.time}:00`,
        start: new Date(e.date.toDate().setHours(e.time)),
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
          {/* mobile */}
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
          {/* 予約内容詳細 */}
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
