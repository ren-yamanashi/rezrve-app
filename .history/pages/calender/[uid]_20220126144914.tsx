import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function AddPage() {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        locale="ja"
        initialEvents={[{ title: "initial event", start: new Date() }]}
      />
    </>
  );
}
