import * as React from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import {useHandle} from "../../handle/useHandle"
import { atom,useRecoilState } from 'recoil'
const initialError : boolean = false
export const errState = atom({
	key:"error",
	default:initialError,
})
/**==========================
 * @returns Create hooks
 *==========================*/
export function useDeleteShift() {
  const db = getFirestore();
  const {handleClose4} = useHandle()
  const [deleteError,setDeleteError] = useRecoilState(errState)
  async function chancelRsv(e: any, number, loads) {
    e.stopPropagation();
    setDeleteError(false)
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
      setDeleteError(true);
    } finally {
      handleClose4();
      loads;
    }
  }
  return { chancelRsv,deleteError };
}
