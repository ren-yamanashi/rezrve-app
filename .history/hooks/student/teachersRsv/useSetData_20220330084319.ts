import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
const initialId: string = "";
const initialDateTime: string = "";
const initialTime: number = null;
export const idState = atom({
  key: "id",
  default: initialId,
});
export const dateTimeState = atom({
	key: "dateTime",
	default: initialId,
  });
  export const timeState = atom({
    key: "time",
    default: initialId,
    });
export function useSetData_teachersRsv() {
  const [id,setId] = useRecoilState(idState);
  const [rsvTime,setRsvTime] = useRecoilState(timeState)
  const [rsvDate,setRsvDate] = useRecoilState(dateTimeState)
  function setData (idString,value,time) {
	setId(idString)
	setRsvDate(value)
  setRsvTime(time)
	
  }
  return {id,rsvDate,rsvTime,setData};
}