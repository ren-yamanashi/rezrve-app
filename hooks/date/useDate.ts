import { atom, useRecoilState } from "recoil";
import * as React  from "react";
const initialDate: Date | null = new Date();
export const dateState = atom({
  key: "date",
  default: initialDate,
});

export function useDate() {
  const [dateValue,setDateValue] = useRecoilState(dateState);
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
  function changeDateValue (newDateValue) {
	  setDateValue(newDateValue)
  }
  return {changeDateValue,newDateTime,dateValue,toDate};
}
