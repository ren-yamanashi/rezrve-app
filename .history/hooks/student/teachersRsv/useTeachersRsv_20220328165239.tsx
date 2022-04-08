//import notIn File
import { atom, useRecoilState, useResetRecoilState } from "recoil";
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
} from "firebase/firestore";
//import in File
import { FreeList } from "../../../models/FreeList";
import { useAuth } from "../../useUserAuth";
import { useDate } from "../../date/useDate";
//create state use atom
const initialRsv: FreeList[] = [];
const initialError: boolean = false;
// create reserve state
export const rsvState = atom({
  key: "rsv",
  default: initialRsv,
});
export const rsvState2 = atom({
  key: "rsv2",
  default: initialRsv,
});
export const rsvState3 = atom({
  key: "rsv3",
  default: initialRsv,
});
export const rsvState4 = atom({
  key: "rsv4",
  default: initialRsv,
});
export const rsvState5 = atom({
  key: "rsv5",
  default: initialRsv,
});
export const rsvState6 = atom({
  key: "rsv6",
  default: initialRsv,
});
export const rsvState7 = atom({
  key: "rsv7",
  default: initialRsv,
});
// create error state
export const errorState = atom({
  key: "err",
  default: initialError,
});
export const errorState2 = atom({
  key: "err2",
  default: initialError,
});
// getFireStore
const db = getFirestore();
// create date at timestamp set 12:00
const day = new Date();
const y = day.getFullYear();
const m = day.getMonth();
const d = day.getDate();
let today = new Date(y, m, d, 12, 0, 0);
const timestamp = (datetimeStr: any) => {
  return Timestamp.fromDate(new Date(datetimeStr));
};
/**===================================
 * @returns Create Base hooks
 *===================================*/
export function useReserves() {
  const { user } = useAuth();
  const [rsv, setRsv] = useRecoilState(rsvState);
  const [rsv2, setRsv2] = useRecoilState(rsvState2);
  const [rsv3, setRsv3] = useRecoilState(rsvState3);
  const [rsv4, setRsv4] = useRecoilState(rsvState4);
  const [rsv5, setRsv5] = useRecoilState(rsvState5);
  const [rsv6, setRsv6] = useRecoilState(rsvState6);
  const [rsv7, setRsv7] = useRecoilState(rsvState7);
  /**=========================
   * @returns Create Base Query
   *========================*/
  // reserved == true
  function baseQuery(teacherName, dateTime) {
    return query(
      collection(db, "FreeSpace"),
      where("teacher", "==", teacherName),
      where("reserved", "==", false),
      where("date", "==", timestamp(dateTime))
    );
  }
  function baseLoading(snapshot: QuerySnapshot<DocumentData>, number) {
    const gotRsv = snapshot.docs.map((doc) => {
      const reserve = doc.data() as FreeList;
      reserve.id = doc.id;
      return reserve;
    });
    number == 1 && setRsv(gotRsv);
    number == 2 && setRsv2(gotRsv);
    number == 3 && setRsv3(gotRsv);
    number == 4 && setRsv4(gotRsv);
    number == 5 && setRsv5(gotRsv);
    number == 6 && setRsv6(gotRsv);
    number == 7 && setRsv7(gotRsv);
  }
  return { baseQuery, baseLoading, rsv, rsv2, rsv3, rsv4, rsv5, rsv6, rsv7 };
}
