//import notIn File
import { atom, useRecoilState } from "recoil";
import * as React from "react";
import {
  getFirestore,
  collection,
  Timestamp,
  query,
  where,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { FreeList } from "../../../models/FreeList";
//create state use atom
const initialRsv: FreeList[] = [];
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

const db = getFirestore();
const timestamp = (datetimeStr: any) => {
  return Timestamp.fromDate(new Date(datetimeStr));
};
/**===================================
 * @returns Create Base hooks
 *===================================*/
export function useTeachersRsv_schedule() {
  const [rsv, setRsv] = useRecoilState(rsvState);
  const [rsv2, setRsv2] = useRecoilState(rsvState2);
  const [rsv3, setRsv3] = useRecoilState(rsvState3);
  const [rsv4, setRsv4] = useRecoilState(rsvState4);
  const [rsv5, setRsv5] = useRecoilState(rsvState5);
  const [rsv6, setRsv6] = useRecoilState(rsvState6);
  const [rsv7, setRsv7] = useRecoilState(rsvState7);
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
  async function loadRsv_Schedule1_X(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 1);
  }
  async function loadRsv_Schedule1_Y(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 1);
  }
  async function loadRsv_Schedule1_Z(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 1);
  }
  async function loadRsv_Schedule2_X(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 2);
  }
  async function loadRsv_Schedule2_Y(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 2);
  }
  async function loadRsv_Schedule2_Z(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 2);
  }
  async function loadRsv_Schedule3_X(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 3);
  }
  async function loadRsv_Schedule3_Y(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 3);
  }
  async function loadRsv_Schedule3_Z(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 3);
  }
  async function loadRsv_Schedule4_X(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 4);
  }
  async function loadRsv_Schedule4_Y(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 4);
  }
  async function loadRsv_Schedule4_Z(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 4);
  }
  async function loadRsv_Schedule5_X(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 5);
  }
  async function loadRsv_Schedule5_Y(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 5);
  }
  async function loadRsv_Schedule5_Z(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 5);
  }
  async function loadRsv_Schedule6_X(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 6);
  }
  async function loadRsv_Schedule6_Y(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 6);
  }
  async function loadRsv_Schedule6_Z(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 6);
  }
  async function loadRsv_Schedule7_X(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 7);
  }
  async function loadRsv_Schedule7_Y(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 7);
  }
  async function loadRsv_Schedule7_Z(teacher, date) {
    const snapshot = await getDocs(baseQuery(teacher, date));
    baseLoading(snapshot, 7);
  }
  return {
    rsv,
    loadRsv_Schedule1_X,
    loadRsv_Schedule1_Y,
    loadRsv_Schedule1_Z,
    rsv2,
    loadRsv_Schedule2_X,
    loadRsv_Schedule2_Y,
    loadRsv_Schedule2_Z,
    rsv3,
    loadRsv_Schedule3_X,
    loadRsv_Schedule3_Y,
    loadRsv_Schedule3_Z,
    rsv4,
    loadRsv_Schedule4_X,
    loadRsv_Schedule4_Y,
    loadRsv_Schedule4_Z,
    rsv5,
    loadRsv_Schedule5_X,
    loadRsv_Schedule5_Y,
    loadRsv_Schedule5_Z,
    rsv6,
    loadRsv_Schedule6_X,
    loadRsv_Schedule6_Y,
    loadRsv_Schedule6_Z,
    rsv7,
    loadRsv_Schedule7_X,
    loadRsv_Schedule7_Y,
    loadRsv_Schedule7_Z,
  };
}
