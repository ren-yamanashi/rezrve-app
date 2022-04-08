import * as React from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { atom,useRecoilState } from 'recoil'
import {useAlert} from "../../../hooks/alert/useAlert"
//import in File
import { useHandle } from "../../handle/useHandle";

const initialError : boolean = false
export const errorState = atom({
	key:"err",
	default:initialError,
})

export function useDeleteShift() {
  const db = getFirestore();
  const {showErrorMessage} = useAlert()
  const {handleClose4} = useHandle()
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
      showErrorMessage()
    } finally {
		handleClose4()
        loads
    }
  }
  return { chancelRsv };
}