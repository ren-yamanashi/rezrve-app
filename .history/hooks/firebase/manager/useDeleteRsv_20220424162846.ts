import * as React from "react";
import { doc, updateDoc } from "firebase/firestore";
import {useHandle} from "../../useHandle"
import { useAlert } from "../../useAlert";
import { db } from "../useFirebase";

export const useDeleteShift = () => {
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
