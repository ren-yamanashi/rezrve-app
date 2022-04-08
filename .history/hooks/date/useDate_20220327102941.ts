import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
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
  function changeDateValue (newDateValue) {
	  setDateValue(newDateValue)
	  const day = new Date(dateValue);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let newDateTime = new Date(y, m, d, 12, 0, 0);
  }
  return {changeDateValue,newDateTime,dateValue};
}
