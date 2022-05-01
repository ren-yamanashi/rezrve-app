import { useReservesAll } from "../firebase/teacher/useReserves";
import * as React from "react";

// sederUid == user.uid
export const useCalenderEvent_Teacher = () => {
	const {reserve} = useReservesAll()
	const formats = {
		dateFormat: "D",
		dayFormat: "D(ddd)",
		monthHeaderFormat: "YYYY/MM",
		dayHeaderFormat: "MM/DD(ddd)",
		dayRangeHeaderFormat: "YYYY/MM",
	  };
    
	const setEvent =
    reserve?.map((e) => {
      return {
        id: e.id,
        title: `${e.time}:00 ${e.person}`,
        start: new Date(e.date.toDate().setHours(e.time)),
        // start:new Date (e.date), //これだとエラーになる ※dateはタイムスタンプ型
        end: new Date(e.date.toDate().setHours(e.time + 1)),
        person: e.person,
        date: e.date,
        time:e.time,
        email:e.email,
        phoneNumber:e.phoneNumber,
        reserver:e.reserver
      };
    });
	const setEventAtSm =
    reserve?.map((e) => {
      return {
        id: e.id,
        title: `${e.time}:00`,
        start: new Date(e.date.toDate().setHours(e.time)),
        end: new Date(e.date.toDate().setHours(e.time + 1)),
        person: e.person,
        date: e.date,
        time:e.time,
        email:e.email,
        phoneNumber:e.phoneNumber,
        reserver:e.reserver
      };
    });

	return { formats,setEvent,setEventAtSm}
}