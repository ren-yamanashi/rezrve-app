import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
const initialId: string = "";
const initialDateTime: string = "";
export const idState = atom({
  key: "id",
  default: initialId,
});
export const dateTimeState = atom({
	key: "dateTime",
	default: initialId,
  });
export function useSetData_teachersRsv() {
  const [id,setId] = useRecoilState(idState);
  const [rsvDate,setRsvDate] = useRecoilState(dateTimeState)
  function setData (id,dateTime) {
	setId(id)
	setRsvDate(dateTime)
	
  }
  return {id,rsvDate,setData};
}