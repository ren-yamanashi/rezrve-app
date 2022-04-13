import * as React from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { atom,useRecoilState } from 'recoil'
import {useAlert} from "../../../hooks/alert/useAlert"
//import in File
import { useHandle } from "../../handle/useHandle";

const initialError : boolean = false
export const errorState = atom({
	key:"err",
	default:initialError,
})

export const useDeleteShift = () => {
  const db = getFirestore();
  const {showErrorMessage,showSuccessMessage} = useAlert()
  const {handleClose4} = useHandle()
  const  chancelRsv = async(e: any, number, loads) =>{
    e.stopPropagation();
    try {
      await updateDoc(doc(db, "FreeSpace", number), {
        reserved: false,
        student: "",
        reserverUid: "",
      }).then(() => {
        showSuccessMessage("予約をキャンセルしました")
      });
    } catch (error) {
      console.log(error);
      showErrorMessage("読み取りに失敗しました")
    } finally {
		handleClose4()
        loads
    }
  }
  return { chancelRsv };
};