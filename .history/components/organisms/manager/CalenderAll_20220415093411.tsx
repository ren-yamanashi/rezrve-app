import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
//import my File
import { useReservesAll } from "../../../hooks/firebase/manager/useReserves";
import { useHandle } from "../../../hooks/useHandle";
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
  const [rsvData, setRsvData] = useState({
    date: "",
    teacher: "",
    student: "",
    id: "",
  });
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
            onSelectEvent={(e) => {
              handleOpen4();
              setRsvData({
                ...rsvData,
                date: e.date,
                teacher: e.teacher,
                student: e.student,
                id: e.id,
              });
              setTeacher(e.teacher);
              setStudent(e.student);
              setRsvDate(e.date);
              setRsvId(e.id);
            }}
            formats={formats}
          />
        </Box>
        <RsvModal
          date={rsvData.date}
          teacher={rsvData.teacher}
          student={rsvData.student}
          chancelRsv={(e) =>
            chancelRsv(e, rsvData.id, loadRsvAll(), handleClose4())
          }
        />
        <ToastContainer />
      </React.Fragment>
    </>
  );
};

export default CalenderAll;
