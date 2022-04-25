import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Box from "@mui/material/Box";
import { createMedia } from "@artsy/fresnel";
import { ToastContainer } from "react-toastify";
// import my File
import { useReservesAll } from "../../../hooks/firebase/teacher/useReserves";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useHandle } from "../../../hooks/useHandle";
import { useDeleteShift } from "../../../hooks/firebase/teacher/useDeleteRsv";
import RsvModal from "../../templates/Modal/RsvModal";
import { useCalenderEvent_Teacher } from "../../../hooks/date/useCalenderEvent_Teacher";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
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

const Calender1 = () => {
  const { selectReserve, rsvData } = useSelectReserve();
  const { chancelRsv } = useDeleteShift();
  const { handleClose4, handleOpen4 } = useHandle();
  const { formats, setEvent, setEventAtSm } = useCalenderEvent_Teacher();
  const { loadRsvAll } = useReservesAll();
  const { user } = useAuth();
  const localizer = momentLocalizer(moment);
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
                  selectReserve(event);
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
                    selectReserve(event);
                  }}
                  formats={formats}
                />
              </Box>
            </Box>
          </Media>
          <RsvModal
            date={rsvData.date}
            teacher={user && user.displayName}
            student={rsvData.student}
            chancelRsv={(e) =>
              chancelRsv(
                e,
                rsvData.id,
                loadRsvAll().then(() => handleClose4())
              )
            }
          />
          <ToastContainer />
        </React.Fragment>
      </MediaContextProvider>
    </>
  );
};

export default Calender1;
