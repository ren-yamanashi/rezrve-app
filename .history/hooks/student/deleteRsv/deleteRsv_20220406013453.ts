import * as React from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { atom,useRecoilState } from 'recoil'
//import in File
import { useHandle } from "../../handle/useHandle";

const initialError : boolean = false
export const errorState = atom({
	key:"err",
	default:initialError,
})
/**==========================
 * @returns Create hooks
 *==========================*/
export function useDeleteShift() {
  const db = getFirestore();
  const [deleteShiftError,setDeleteShiftError] = useRecoilState(errorState);
  const {handleClose4} = useHandle()
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
      });
    } catch (error) {
      console.log(error);
      setDeleteShiftError(true);
    } finally {
		handleClose4()
        loads
    }
  }
  return { chancelRsv,deleteShiftError };
}