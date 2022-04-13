import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
//import my File
import { useReservesAll } from "../../../hooks/manager/useReserves";
import { useHandle } from "../../../hooks/handle/useHandle";
import RsvModal from "../../templates/Modal/RsvModal";
import { useChancelRsv } from "../../../hooks/manager/useReserves";
moment.locale("ja");

const CalenderAll = () => {
  console.log("予約カレンダー　管理者");
  const { handleOpen4, handleClose4 } = useHandle();
  const { rsv, loadRsvAll } = useReservesAll();
  const { chancelRsv } = useChancelRsv();
  const [rsvDate, setRsvDate] = useState("");
  const [teacher, setTeacher] = useState("");
  const [student, setStudent] = useState("");
  const [rsvId, setRsvId] = useState("");
  const localizer = momentLocalizer(moment);
  const formats = {
    dateFormat: "D",
    dayFormat: "D(ddd)",
    monthHeaderFormat: "YYYY/MM",
    dayHeaderFormat: "MM/DD(ddd)",
    dayRangeHeaderFormat: "YYYY/MM",
  };
  /** Create Event */
  const setEvent =
    rsv &&
    rsv.map((e) => {
      return {
        id: e.id,
        title: `${e.time}:00~ ${e.teacher} ${e.student}`,
        start: new Date(e.date.toDate().setHours(e.time)), //これだとできる
        // start:new Date (e.date), //これだとエラーになる ※dateはタイムスタンプ型
        end: new Date(e.date.toDate().setHours(e.time + 1)),
        teacher: e.teacher,
        student: e.student,
        date: `${dayjs(e.date.toDate()).format("YYYY/MM/DD ")} ${e.time}:00~`,
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
            onSelectEvent={(event) => {
              handleOpen4();
              setTeacher(event.teacher);
              setStudent(event.student);
              setRsvDate(event.date);
              setRsvId(event.id);
            }}
            formats={formats}
          />
        </Box>
        <RsvModal
          date={rsvDate}
          teacher={teacher}
          student={student}
          chancelRsv={(e) => chancelRsv(e, rsvId, loadRsvAll(), handleClose4())}
        />
        <ToastContainer />
      </React.Fragment>
    </>
  );
};

export default CalenderAll;
