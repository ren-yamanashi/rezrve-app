import * as React from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { atom, useRecoilState } from "recoil";
//import in File
import { useDate } from "../../date/useDate";
import { useSchedule } from "../reserves/useReserves";
import { useAlert } from "../../alert/useAlert";
const initialError: boolean = false;
export const errState = atom({
  key: "error",
  default: initialError,
});

export function useDeleteShift() {
  const db = getFirestore();
  const { showErrorMessage, showSuccessMessage } = useAlert();
  const { dateValue } = useDate();
  const { loadScheduleAll } = useSchedule();
  const day = new Date(dateValue);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let newDate = new Date(y, m, d, 12, 0, 0);
  async function chancelRsv(e: any, number, loads) {
    e.stopPropagation();
    try {
      await updateDoc(doc(db, "FreeSpace", number), {
        reserved: false,
        student: "",
        reserverUid: "",
      }).then(() => {
        showSuccessMessage("予約キャンセルに成功しました");
        loads;
      });
    } catch (error) {
      console.log(error);
      showErrorMessage("予約キャンセルに失敗しました");
    } finally {
      loadScheduleAll(newDate);
    }
  }
  return { chancelRsv };
}
