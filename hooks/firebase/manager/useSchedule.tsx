//import notIn File
import { atom, useRecoilState } from "recoil";
import * as React from "react";
import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
//import in File
import { FreeList } from "../../../models/FreeList";
import { useAuth } from "../useUserAuth";
import { db, timestamp } from "../useFirebase";
import { useSelectUser_query } from "../user/useUserList";
//create state use atom
const initialRsv: FreeList[] = [];
// create reserve state
export const rsvState1 = atom({
  key: "1",
  default: initialRsv,
});
export const rsvState2 = atom({
  key: "2",
  default: initialRsv,
});
export const rsvState3 = atom({
  key: "3",
  default: initialRsv,
});
export const rsvState4 = atom({
  key: "4",
  default: initialRsv,
});
export const rsvState5 = atom({
  key: "5",
  default: initialRsv,
});
export const rsvState6 = atom({
  key: "6",
  default: initialRsv,
});
export const rsvState7 = atom({
  key: "7",
  default: initialRsv,
});
export const rsvState8 = atom({
  key: "8",
  default: initialRsv,
});
export const rsvState9 = atom({
  key: "9",
  default: initialRsv,
});
export const rsvState10 = atom({
  key: "10",
  default: initialRsv,
});
export const rsvState11 = atom({
  key: "11",
  default: initialRsv,
});
export const rsvState12 = atom({
  key: "12",
  default: initialRsv,
});
export const rsvState13 = atom({
  key: "13",
  default: initialRsv,
});
export const rsvState14 = atom({
  key: "14",
  default: initialRsv,
});
export const rsvState15 = atom({
  key: "15",
  default: initialRsv,
});
export const rsvState16 = atom({
  key: "16",
  default: initialRsv,
});
export const rsvState17 = atom({
  key: "17",
  default: initialRsv,
});
export const rsvState18 = atom({
  key: "18",
  default: initialRsv,
});
export const rsvState19 = atom({
  key: "19",
  default: initialRsv,
});
export const rsvState20 = atom({
  key: "20",
  default: initialRsv,
});
export const rsvState21 = atom({
  key: "21",
  default: initialRsv,
});
export const rsvState22 = atom({
  key: "22",
  default: initialRsv,
});
export const rsvState23 = atom({
  key: "23",
  default: initialRsv,
});
export const rsvState24 = atom({
  key: "24",
  default: initialRsv,
});
/**========= Schedule =========*/
export const useSchedule = () => {
  const { user } = useAuth();
  const { user_query } = useSelectUser_query();
  const [rsv1, setRsv1] = useRecoilState(rsvState1);
  const [rsv2, setRsv2] = useRecoilState(rsvState2);
  const [rsv3, setRsv3] = useRecoilState(rsvState3);
  const [rsv4, setRsv4] = useRecoilState(rsvState4);
  const [rsv5, setRsv5] = useRecoilState(rsvState5);
  const [rsv6, setRsv6] = useRecoilState(rsvState6);
  const [rsv7, setRsv7] = useRecoilState(rsvState7);
  const [rsv8, setRsv8] = useRecoilState(rsvState8);
  const [rsv9, setRsv9] = useRecoilState(rsvState9);
  const [rsv10, setRsv10] = useRecoilState(rsvState10);
  const [rsv11, setRsv11] = useRecoilState(rsvState11);
  const [rsv12, setRsv12] = useRecoilState(rsvState12);
  const [rsv13, setRsv13] = useRecoilState(rsvState13);
  const [rsv14, setRsv14] = useRecoilState(rsvState14);
  const [rsv15, setRsv15] = useRecoilState(rsvState15);
  const [rsv16, setRsv16] = useRecoilState(rsvState16);
  const [rsv17, setRsv17] = useRecoilState(rsvState17);
  const [rsv18, setRsv18] = useRecoilState(rsvState18);
  const [rsv19, setRsv19] = useRecoilState(rsvState19);
  const [rsv20, setRsv20] = useRecoilState(rsvState20);
  const [rsv21, setRsv21] = useRecoilState(rsvState21);
  const [rsv22, setRsv22] = useRecoilState(rsvState22);
  const [rsv23, setRsv23] = useRecoilState(rsvState23);
  const [rsv24, setRsv24] = useRecoilState(rsvState24);

  const rsvArr = [];
  const baseQuery = (dateTime, companyId) => {
    return query(
      collection(db, "FreeSpace"),
      where("companyId", "==", companyId),
      where("date", "==", timestamp(dateTime))
    );
  };
  const baseLoading = (
    snapshot: QuerySnapshot<DocumentData>,
    number: number
  ) => {
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    number == 1 && setRsv1(gotFreeList);
    number == 2 && setRsv2(gotFreeList);
    number == 3 && setRsv3(gotFreeList);
    number == 4 && setRsv4(gotFreeList);
    number == 5 && setRsv5(gotFreeList);
    number == 6 && setRsv6(gotFreeList);
    number == 7 && setRsv7(gotFreeList);
    number == 8 && setRsv8(gotFreeList);
    number == 9 && setRsv9(gotFreeList);
    number == 10 && setRsv10(gotFreeList);
    number == 11 && setRsv11(gotFreeList);
    number == 12 && setRsv12(gotFreeList);
    number == 13 && setRsv13(gotFreeList);
    number == 14 && setRsv14(gotFreeList);
    number == 15 && setRsv15(gotFreeList);
    number == 16 && setRsv16(gotFreeList);
    number == 17 && setRsv17(gotFreeList);
    number == 18 && setRsv18(gotFreeList);
    number == 19 && setRsv19(gotFreeList);
    number == 20 && setRsv20(gotFreeList);
    number == 21 && setRsv21(gotFreeList);
    number == 22 && setRsv22(gotFreeList);
    number == 23 && setRsv23(gotFreeList);
    number == 24 && setRsv24(gotFreeList);
  };
  const loadScheduleAll = async (newDate, companyId) => {
    const loadSchedule1 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 1))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 1);
    };
    const loadSchedule2 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 2))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 2);
    };
    const loadSchedule3 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 3))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 3);
    };
    const loadSchedule4 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 4))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 4);
    };
    const loadSchedule5 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 5))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 5);
    };
    const loadSchedule6 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 6))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 6);
    };
    const loadSchedule7 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 7))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 7);
    };
    const loadSchedule8 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 8))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 8);
    };
    const loadSchedule9 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 9))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 9);
    };
    const loadSchedule10 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 10))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 10);
    };
    const loadSchedule11 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 11))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 11);
    };
    const loadSchedule12 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 12))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 12);
    };
    const loadSchedule13 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 13))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 13);
    };
    const loadSchedule14 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 14))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 14);
    };
    const loadSchedule15 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 15))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 15);
    };
    const loadSchedule16 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 16))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 16);
    };
    const loadSchedule17 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 17))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 17);
    };
    const loadSchedule18 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 18))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 18);
    };
    const loadSchedule19 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 19))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 19);
    };
    const loadSchedule20 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 20))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 20);
    };
    const loadSchedule21 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 21))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 21);
    };
    const loadSchedule22 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 22))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 22);
    };
    const loadSchedule23 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 23))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 23);
    };
    const loadSchedule24 = async () => {
      const snapshot = await getDocs(
        query(baseQuery(newDate, companyId), where("time", "==", 24))
      );
      if (snapshot.empty) {
      }
      baseLoading(snapshot, 24);
    };
    loadSchedule1();
    loadSchedule2();
    loadSchedule3();
    loadSchedule4();
    loadSchedule5();
    loadSchedule6();
    loadSchedule7();
    loadSchedule8();
    loadSchedule9();
    loadSchedule10();
    loadSchedule11();
    loadSchedule12();
    loadSchedule13();
    loadSchedule14();
    loadSchedule15();
    loadSchedule16();
    loadSchedule17();
    loadSchedule18();
    loadSchedule19();
    loadSchedule20();
    loadSchedule21();
    loadSchedule22();
    loadSchedule23();
    loadSchedule24();
  };
  {
    user_query?.times.map((time) => {
      rsvArr.push(
        time == 1
          ? rsv1
          : time == 2
          ? rsv2
          : time == 3
          ? rsv3
          : time == 4
          ? rsv4
          : time == 5
          ? rsv5
          : time == 6
          ? rsv6
          : time == 7
          ? rsv7
          : time == 8
          ? rsv8
          : time == 9
          ? rsv9
          : time == 10
          ? rsv10
          : time == 11
          ? rsv11
          : time == 12
          ? rsv12
          : time == 13
          ? rsv13
          : time == 14
          ? rsv14
          : time == 15
          ? rsv15
          : time == 16
          ? rsv16
          : time == 17
          ? rsv17
          : time == 18
          ? rsv18
          : time == 19
          ? rsv19
          : time == 20
          ? rsv20
          : time == 21
          ? rsv21
          : time == 22
          ? rsv22
          : time == 23
          ? rsv23
          : time == 24 && rsv24
      );
    });
  }
  return { loadScheduleAll, rsvArr };
};
