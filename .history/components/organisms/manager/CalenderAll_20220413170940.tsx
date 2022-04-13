import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
//import my File
import { useReservesAll } from "../../../hooks/firebase/manager/useReserves";
import { useHandle } from "../../../hooks/handle/useHandle";
import RsvModal from "../../templates/Modal/RsvModal";
import { useCalenderEvent } from "../../../hooks/date/useCalenderEvent";
import { useChancelRsv } from "../../../hooks/firebase/manager/useReserves";
moment.locale("ja");

const CalenderAll = () => {
  console.log("予約カレンダー　管理者");
  const { setEvent, formats } = useCalenderEvent();
  const { handleOpen4, handleClose4 } = useHandle();
  const { loadRsvAll } = useReservesAll();
  const { chancelRsv } = useChancelRsv();
  const [rsvDate, setRsvDate] = useState("");
  const [teacher, setTeacher] = useState("");
  const [student, setStudent] = useState("");
  const [rsvId, setRsvId] = useState("");
  const localizer = momentLocalizer(moment);

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
