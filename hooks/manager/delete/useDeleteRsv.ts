import * as React from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import {useHandle} from "../../handle/useHandle"
import { atom,useRecoilState } from 'recoil'
import { useAlert } from "../../alert/useAlert";
const initialError : boolean = false
export const errState = atom({
	key:"error",
	default:initialError,
})

export function useDeleteShift() {
  const db = getFirestore();
  const {handleClose4} = useHandle()
  const {showErrorMessage} = useAlert()
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
      showErrorMessage()
    } finally {
      handleClose4();
      loads;
    }
  }
  return { chancelRsv };
}
