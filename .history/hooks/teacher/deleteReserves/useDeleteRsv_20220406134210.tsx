import * as React from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { atom, useRecoilState } from "recoil";
//import in File
import { useDate } from "../../date/useDate";
import { useSchedule } from "../reserves/useReserves";

const initialError: boolean = false;
export const errState = atom({
  key: "error",
  default: initialError,
});
/**==========================
 * @returns Create hooks
 *==========================*/
export function useDeleteShift() {
  const db = getFirestore();
  const [deleteShiftError, setDeleteShiftError] = useRecoilState(errState);
  const { dateValue } = useDate();
  const { loadScheduleAll } = useSchedule();
  const day = new Date(dateValue);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let newDate = new Date(y, m, d, 12, 0, 0);
  async function chancelRsv(e: any, number, loads) {
    e.stopPropagation();
    setDeleteShiftError(false);
    try {
      await updateDoc(doc(db, "FreeSpace", number), {
        reserved: false,
        student: "",
        reserverUid: "",
      }).then(() => {
        toast.success("キャンセルしました", {
          position: "bottom-left",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        loads;
      });
    } catch (error) {
      console.log(error);
      setDeleteShiftError(true);
    } finally {
      loadScheduleAll(newDate);
    }
  }
  return { chancelRsv, deleteShiftError };
}
