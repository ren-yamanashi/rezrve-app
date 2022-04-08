import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
//import in File
import { useDate } from "../../date/useDate";
import { useReserves_AfterToday } from "../useReserves";
import { useHandle } from "../../handle/useHandle";
/**==========================
 * @returns Create hooks
 *==========================*/
export function useDeleteShift() {
  const db = getFirestore();
  const {handleClose4} = useHandle()
  const {loadReserves_AfterToday} = useReserves_AfterToday();
  const { dateValue } = useDate();
  async function chancelRsv(e: any, number, loads) {
    e.stopPropagation();
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
      });
    } catch (error) {
      console.log(error);
    } finally {
		handleClose4()
      loads
    }
  }
  return { chancelRsv };
}