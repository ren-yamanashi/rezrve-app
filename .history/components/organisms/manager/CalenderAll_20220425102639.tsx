import React, { useEffect } from "react";
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
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useSelectUser_query } from "../../../hooks/firebase/user/useUserList";}
moment.locale("ja");

const CalenderAll = () => {
  const { user } = useAuth();
  const { rsvData, selectReserve } = useSelectReserve();
  const { setEvent, formats } = useCalenderEvent();
  const { handleOpen4, handleClose4 } = useHandle();
  const { loadRsvAll } = useReservesAll();
  const { chancelRsv } = useChancelRsv();
  const {loadUser_query,user_query} = useSelectUser_query();
  const localizer = momentLocalizer(moment);
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    loadUser_query(user?.uid);
    loadRsvAll(user_query?.companyId);
  }, [process.browser, user]);
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
          teacher={user && user.displayName}
          student={rsvData.rsvStudent}
          email={rsvData.email}
          phoneNumber={rsvData.phoneNumber}
          reserver={rsvData.reserver}
          chancelRsv={(e) =>
            chancelRsv(e, rsvData.id, handleClose4()).then(() => loadRsvAll(user_query?.companyId))
          }
        />
        <ToastContainer />
      </React.Fragment>
    </>
  );
};

export default CalenderAll;
