import * as React from "react";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
//import in File
import { useAlert } from "../../useAlert";
import { db } from "../useFirebase";

export const useDeleteShift = () => {
  const { showErrorMessage, showSuccessMessage } = useAlert();
  const chancelRsv = async (e: any, number, loads) => {
    e.stopPropagation();
    try {
      await updateDoc(doc(db, "FreeSpace", number), {
        reserved: false,
        person: "",
        reserverUid: "",
        chancelAt:serverTimestamp(),
      }).then(() => {
        showSuccessMessage("予約キャンセルに成功しました");
        loads;
      });
    } catch (error) {
      console.log(error);
      showErrorMessage("予約キャンセルに失敗しました");
    } 
  };
  return { chancelRsv };
};
