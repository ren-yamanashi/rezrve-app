import { atom, useRecoilState } from "recoil";
import * as React  from "react";
import { useReservesAll } from "../firebase/manager/useReserves";
import dayjs from "dayjs";


// AllEvent
export const useCalenderEvent = () => {
	const { rsv } = useReservesAll();
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
        title: `${e.time}:00~ ${e.student}`,
        start: new Date(e.date.toDate().setHours(e.time)), //これだとできる
        // start:new Date (e.date), //これだとエラーになる ※dateはタイムスタンプ型
        end: new Date(e.date.toDate().setHours(e.time + 1)),
        teacher: e.teacher,
        student: e.student,
        date: `${dayjs(e.date.toDate()).format("YYYY/MM/DD ")} ${e.time}:00~`,
      };
    });
	return { setEvent,formats };
};