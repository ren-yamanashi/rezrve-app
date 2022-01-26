import SampleCalendar from "../../components/organisms/calender/calender";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function AddPage() {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialEvents={[{ title: "initial event", start: new Date() }]}
      />
    </>
  );
}
