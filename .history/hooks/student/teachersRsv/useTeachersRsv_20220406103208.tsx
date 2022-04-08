//import notIn File
import { atom, useRecoilState } from "recoil";
import React, { useEffect } from "react";
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
const initialLoading: boolean = false;
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
export const loadingState = atom({
  key: "loading",
  default: initialLoading,
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
  function loadRsvScheduleAll_X(
    teacher,
    date1,
    date2,
    date3,
    date4,
    date5,
    date6,
    date7
  ) {
    async function loadRsv_Schedule1_X() {
      const snapshot = await getDocs(baseQuery(teacher, date1));
      baseLoading(snapshot, 1);
    }
    async function loadRsv_Schedule2_X() {
      const snapshot = await getDocs(baseQuery(teacher, date2));
      baseLoading(snapshot, 2);
    }
    async function loadRsv_Schedule3_X() {
      const snapshot = await getDocs(baseQuery(teacher, date3));
      baseLoading(snapshot, 3);
    }
    async function loadRsv_Schedule4_X() {
      const snapshot = await getDocs(baseQuery(teacher, date4));
      baseLoading(snapshot, 4);
    }
    async function loadRsv_Schedule5_X() {
      const snapshot = await getDocs(baseQuery(teacher, date5));
      baseLoading(snapshot, 5);
    }
    async function loadRsv_Schedule6_X() {
      const snapshot = await getDocs(baseQuery(teacher, date6));
      baseLoading(snapshot, 6);
    }
    async function loadRsv_Schedule7_X() {
      const snapshot = await getDocs(baseQuery(teacher, date7));
      baseLoading(snapshot, 7);
    }

    try {
      loadRsv_Schedule1_X();
      loadRsv_Schedule2_X();
      loadRsv_Schedule3_X();
      loadRsv_Schedule4_X();
      loadRsv_Schedule5_X();
      loadRsv_Schedule6_X();
      loadRsv_Schedule7_X();
    } catch (error) {
      console.error(error);
      window.alert("読み込みに失敗しました");
    }
  }
  function loadRsvScheduleAll_Y(
    teacher,
    date1,
    date2,
    date3,
    date4,
    date5,
    date6,
    date7
  ) {
    async function loadRsv_Schedule1_Y() {
      const snapshot = await getDocs(baseQuery(teacher, date1));
      baseLoading(snapshot, 1);
    }
    async function loadRsv_Schedule2_Y() {
      const snapshot = await getDocs(baseQuery(teacher, date2));
      baseLoading(snapshot, 2);
    }
    async function loadRsv_Schedule3_Y() {
      const snapshot = await getDocs(baseQuery(teacher, date3));
      baseLoading(snapshot, 3);
    }
    async function loadRsv_Schedule4_Y() {
      const snapshot = await getDocs(baseQuery(teacher, date4));
      baseLoading(snapshot, 4);
    }
    async function loadRsv_Schedule5_Y() {
      const snapshot = await getDocs(baseQuery(teacher, date5));
      baseLoading(snapshot, 5);
    }
    async function loadRsv_Schedule6_Y() {
      const snapshot = await getDocs(baseQuery(teacher, date6));
      baseLoading(snapshot, 6);
    }
    async function loadRsv_Schedule7_Y() {
      const snapshot = await getDocs(baseQuery(teacher, date7));
      baseLoading(snapshot, 7);
    }

    try {
      loadRsv_Schedule1_Y();
      loadRsv_Schedule2_Y();
      loadRsv_Schedule3_Y();
      loadRsv_Schedule4_Y();
      loadRsv_Schedule5_Y();
      loadRsv_Schedule6_Y();
      loadRsv_Schedule7_Y();
    } catch (error) {
      console.error(error);
      window.alert("読み込みに失敗しました");
    }
  }
  function loadRsvScheduleAll_Z(
    teacher,
    date1,
    date2,
    date3,
    date4,
    date5,
    date6,
    date7
  ) {
    async function loadRsv_Schedule1_Z() {
      const snapshot = await getDocs(baseQuery(teacher, date1));
      baseLoading(snapshot, 1);
    }
    async function loadRsv_Schedule2_Z() {
      const snapshot = await getDocs(baseQuery(teacher, date2));
      baseLoading(snapshot, 2);
    }
    async function loadRsv_Schedule3_Z() {
      const snapshot = await getDocs(baseQuery(teacher, date3));
      baseLoading(snapshot, 3);
    }
    async function loadRsv_Schedule4_Z() {
      const snapshot = await getDocs(baseQuery(teacher, date4));
      baseLoading(snapshot, 4);
    }
    async function loadRsv_Schedule5_Z() {
      const snapshot = await getDocs(baseQuery(teacher, date5));
      baseLoading(snapshot, 5);
    }
    async function loadRsv_Schedule6_Z() {
      const snapshot = await getDocs(baseQuery(teacher, date6));
      baseLoading(snapshot, 6);
    }
    async function loadRsv_Schedule7_Z() {
      const snapshot = await getDocs(baseQuery(teacher, date7));
      baseLoading(snapshot, 7);
    }
    try {
      loadRsv_Schedule1_Z();
      loadRsv_Schedule2_Z();
      loadRsv_Schedule3_Z();
      loadRsv_Schedule4_Z();
      loadRsv_Schedule5_Z();
      loadRsv_Schedule6_Z();
      loadRsv_Schedule7_Z();
    } catch (error) {
      console.error(error);
      window.alert("読み込みに失敗しました");
    }
  }
  return {
    loadRsvScheduleAll_X,
    loadRsvScheduleAll_Y,
    loadRsvScheduleAll_Z,
    rsv,
    rsv2,
    rsv3,
    rsv4,
    rsv5,
    rsv6,
    rsv7,
  };
}
