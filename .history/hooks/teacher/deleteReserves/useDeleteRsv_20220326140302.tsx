import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  query,
  where,
  orderBy,
  getDocs,
  QuerySnapshot,
  DocumentData,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
//import in File
import { User } from "../../../models/User";
import { FreeList } from "../../../models/FreeList";
import { useAuth } from "../../useUserAuth";
/**==========================
 * @returns Create hooks
 *==========================*/
export function useDeleteShift() {
  const db = getFirestore();
  async function chancelRsv(e: any, number, loads) {
    e.stopPropagation();
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
  }
  return { chancelRsv };
}
