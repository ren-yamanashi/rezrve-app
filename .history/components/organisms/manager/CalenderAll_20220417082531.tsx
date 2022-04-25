import React from "react";
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
import { useSelectReserve } from "../../../hooks/useSelectReserve";
moment.locale("ja");

const CalenderAll = () => {
  console.log("予約カレンダー　管理者");
  const { selectReserve, rsvData } = useSelectReserve();
  const { setEvent, formats } = useCalenderEvent();
  const { handleOpen4, handleClose4 } = useHandle();
  const { loadRsvAll } = useReservesAll();
  const { chancelRsv } = useChancelRsv();
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
            onSelectEvent={(item) => {
              handleOpen4();
              selectReserve(item);
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
