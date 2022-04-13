import { useReservesAll } from "../firebase/teacher/reserves/useReserves";
import dayjs from "dayjs";
import * as React from "react";

// sederUid == user.uid
export const useCalenderEvent_Teacher = () => {
	const {rsv} = useReservesAll()
	const formats = {
		dateFormat: "D",
		dayFormat: "D(ddd)",
		monthHeaderFormat: "YYYY/MM",
		dayHeaderFormat: "MM/DD(ddd)",
		dayRangeHeaderFormat: "YYYY/MM",
	  };
	const setEvent =
    rsv &&
    rsv.map((e) => {
      return {
        id: e.id,
        title: `${e.time}:00 ${e.student}`,
        start: new Date(e.date.toDate().setHours(e.time)),
        // start:new Date (e.date), //これだとエラーになる ※dateはタイムスタンプ型
        end: new Date(e.date.toDate().setHours(e.time + 1)),
        student: e.student,
        date: `${dayjs(e.date.toDate()).format("YYYY/MM/DD ")} ${e.time}:00~`,
      };
    });
	const setEventAtSm =
    rsv &&
    rsv.map((e) => {
      return {
        id: e.id,
        title: `${e.time}:00`,
        start: new Date(e.date.toDate().setHours(e.time)),
        end: new Date(e.date.toDate().setHours(e.time + 1)),
        student: e.student,
        date: `${dayjs(e.date.toDate()).format("YYYY/MM/DD ")} ${e.time}:00~`,
      };
    });

	return { formats,setEvent,setEventAtSm}
}