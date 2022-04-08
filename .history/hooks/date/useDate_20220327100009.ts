import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
const initialDate: Date | null = new Date();
export const dateState = atom({
  key: "date",
  default: initialDate,
});

export function useHandle() {
  const [dateValue,setDateValue] = useRecoilState(dateState);
  function changeDateValue (newDateValue) {
	  setDateValue(newDateValue)
  }
  return {changeDateValue,dateValue};
}
