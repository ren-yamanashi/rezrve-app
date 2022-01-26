
import FullCalendar from "@fullcalendar/react"; import dayGridPlugin from "@fullcalendar/daygrid"; import '@fullcalendar/common/main.css' import '@fullcalendar/daygrid/main.css' const Calendar = () => ( <FullCalendar plugins={[dayGridPlugin]} initialEvents={[{ title: "initial event", start: new Date() }]} />
);

const Calendar = () => ( 
<FullCalendar plugins={[dayGridPlugin]} initialEvents={[{ title: "initial event", start: new Date() }]} />
 ); 

export default Calendar;

