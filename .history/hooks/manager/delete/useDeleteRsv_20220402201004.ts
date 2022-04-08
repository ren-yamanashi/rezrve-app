import * as React from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
/**==========================
 * @returns Create hooks
 *==========================*/
export function useDeleteShift() {
  const db = getFirestore();
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
        loads;
      });
    } catch (error) {
      console.log(error);
    } finally {
      loads;
    }
  }
  return { chancelRsv };
}
