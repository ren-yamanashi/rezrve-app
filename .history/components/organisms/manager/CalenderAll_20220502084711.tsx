import * as React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
//import my File
import Loading from "../../atoms/loading/loadingComponent";
import { useHandle } from "../../../hooks/useHandle";
import RsvModal from "../../templates/Modal/RsvModal";
import { useCalenderEvent } from "../../../hooks/date/useCalenderEvent";
import { useChancelRsv } from "../../../hooks/firebase/manager/useReserves";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useLoading } from "../../../hooks/useLoading";
moment.locale("ja");

const CalenderAll: React.FC = () => {
  const { user } = useAuth();
  const { rsvData, selectRsv } = useSelectReserve();
  const { setEvent, formats } = useCalenderEvent();
  const { handleOpen4 } = useHandle();
  const { chancelRsv } = useChancelRsv();
  const localizer = momentLocalizer(moment);
  const { loading } = useLoading();
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <React.Fragment>
        {loading == true ? (
          <Loading />
        ) : (
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
                selectRsv(item);
              }}
              formats={formats}
            />
          </Box>
        )}
        <RsvModal
          open={open}
          handleClose={handleClose}
          date={rsvData.date}
          teacher={user && user.displayName}
          student={rsvData.rsvStudent}
          email={rsvData.email}
          phoneNumber={rsvData.phoneNumber}
          reserver={rsvData.reserver}
          chancelRsv={(e) => chancelRsv(e, rsvData.id)}
        />
        <ToastContainer />
      </React.Fragment>
    </>
  );
};

export default CalenderAll;
