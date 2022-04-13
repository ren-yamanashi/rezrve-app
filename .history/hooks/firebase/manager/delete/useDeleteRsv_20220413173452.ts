import * as React from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import {useHandle} from "../../../handle/useHandle"
import { atom,useRecoilState } from 'recoil'
import { useAlert } from "../../../alert/useAlert";
const initialError : boolean = false
export const errState = atom({
	key:"error",
	default:initialError,
})

export const useDeleteShift = () => {
  const db = getFirestore();
  const {handleClose4} = useHandle()
  const {showErrorMessage,showSuccessMessage} = useAlert()
  const chancelRsv = async (e: any, number, loads) => {
    e.stopPropagation();
    try {
      await updateDoc(doc(db, "FreeSpace", number), {
        reserved: false,
        student: "",
        reserverUid: "",
      });
      showSuccessMessage("予約をキャンセルしました");
      loads;
    } catch (error) {
      console.log(error);
      showErrorMessage("読み取りに失敗しました");
    } finally {
      handleClose4();
      loads;
    }
  }
  return { chancelRsv };
};
