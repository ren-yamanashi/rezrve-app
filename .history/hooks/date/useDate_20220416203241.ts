import { atom, useRecoilState } from "recoil";
import { useSchedule } from "../firebase/manager/useReserves";
import * as React  from "react";
import { loadingState } from "../firebase/student/useTeachersRsv";
const initialDate: Date | null = new Date();
export const dateState = atom({
  key: "date",
  default: initialDate,
});

export const useDate = () => {
  const [dateValue,setDateValue] = useRecoilState(dateState);
  const {loadScheduleAll} = useSchedule()
  const day = new Date(dateValue);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let newDateTime = new Date(y, m, d, 12, 0, 0);
  const today = new Date();
  const td_y = today.getFullYear();
  const td_m = today.getMonth();
  const td_d = today.getDate();
  const toDate = new Date(td_y,td_m,td_d,12,0,0)
  const changeDateValue = (newDateValue) => {
	  setDateValue(newDateValue)
  }
  const changeDateAndSetDateValue = (newDateValue) => {
    changeDateValue(newDateValue);
    const day = new Date(newDateValue);
    const y = day.getFullYear();
    const m = day.getMonth();
    const d = day.getDate();
    let date = new Date(y,m,d,12,0,0);
    loadScheduleAll(date);
  }
  return {changeDateValue,changeDateAndSetDateValue,newDateTime,dateValue,toDate};
}
