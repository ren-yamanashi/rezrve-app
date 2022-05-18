import * as React from "react";
import moment from "moment";
import Box from "@mui/material/Box";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { ToastContainer } from "react-toastify";
//import my File
import Loading from "../../atoms/loading/loadingComponent";
import RsvModal from "../../templates/Modal/RsvModal";
import { useCalenderEvent } from "../../../hooks/date/useCalenderEvent";
import { useChancelRsv } from "../../../hooks/firebase/manager/useReserves";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useLoading } from "../../../hooks/useLoading";
import { useHandle } from "../../../hooks/useHandle";
import { reserveProps } from "../../../models/reserveProps";
moment.locale("ja");

const CalenderAll: React.FC<{ reserves_all: reserveProps[] }> = ({
  reserves_all,
}) => {
  const { user } = useAuth();
  const { rsvData, selectRsv } = useSelectReserve();
  const { chancelRsv } = useChancelRsv();
  const localizer = momentLocalizer(moment);
  const { loading } = useLoading();
  const { handleOpen1, handleClose1, open } = useHandle();
  const formats = {
    dateFormat: "D",
    dayFormat: "D(ddd)",
    monthHeaderFormat: "YYYY/MM",
    dayHeaderFormat: "MM/DD(ddd)",
    dayRangeHeaderFormat: "YYYY/MM",
  };
  const setEvent = reserves_all?.map((e) => {
    return {
      id: e.id,
      title: `${e.time}:00~ ${e.reserver}`,
      start: new Date(e.date),
      end: new Date(e.date.setHours(e.time + 1)),
      staff: e.staff,
      person: e.reserver,
      date: e.date,
      time: e.time,
      email: e.email,
      phoneNumber: e.phoneNumber,
      reserver: e.reserver,
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
            onSelectEvent={(item) => {
              handleOpen1();
              selectRsv(item);
            }}
            formats={formats}
          />
        </Box>
        <RsvModal
          open={open.open1}
          handleClose={handleClose1}
          date={rsvData.date}
          teacher={user && user.displayName}
          student={rsvData.rsvStudent}
          email={rsvData.email}
          phoneNumber={rsvData.phoneNumber}
          reserver={rsvData.reserver}
          chancelRsv={(e) => {
            chancelRsv(e, rsvData.id);
            handleClose1();
          }}
        />
        <ToastContainer />
      </React.Fragment>
    </>
  );
};

export default CalenderAll;
