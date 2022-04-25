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
const initialError: boolean = false;
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
// create error state

export const errState1 = atom({
  key: "err1",
  default: initialError,
});
export const errState2 = atom({
  key: "err2",
  default: initialError,
});
export const errState3 = atom({
  key: "err3",
  default: initialError,
});
export const errState4 = atom({
  key: "err4",
  default: initialError,
});
export const errState5 = atom({
  key: "err5",
  default: initialError,
});
export const errState6 = atom({
  key: "err6",
  default: initialError,
});
export const errState7 = atom({
  key: "err7",
  default: initialError,
});
export const errState8 = atom({
  key: "err8",
  default: initialError,
});
export const errState9 = atom({
  key: "err9",
  default: initialError,
});
export const errState10 = atom({
  key: "err10",
  default: initialError,
});
export const errState11 = atom({
  key: "err11",
  default: initialError,
});
export const errState12 = atom({
  key: "err12",
  default: initialError,
});
export const errState13 = atom({
  key: "err13",
  default: initialError,
});
export const errState14 = atom({
  key: "err14",
  default: initialError,
});
export const errState15 = atom({
  key: "err15",
  default: initialError,
});
export const errState16 = atom({
  key: "err16",
  default: initialError,
});
export const errState17 = atom({
  key: "err17",
  default: initialError,
});
export const errState18 = atom({
  key: "err18",
  default: initialError,
});
export const errState19 = atom({
  key: "err19",
  default: initialError,
});
export const errState20 = atom({
  key: "err20",
  default: initialError,
});
export const errState21 = atom({
  key: "err21",
  default: initialError,
});
export const errState22 = atom({
  key: "err22",
  default: initialError,
});
export const errState23 = atom({
  key: "err23",
  default: initialError,
});
export const errState24 = atom({
  key: "err24",
  default: initialError,
});

/**========= Schedule =========*/
export const useSchedule = () => {
  const { user } = useAuth();
  const { loadUser_query, user_query } = useSelectUser_query();
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
  const [error1, setError1] = useRecoilState(errState1);
  const [error2, setError2] = useRecoilState(errState2);
  const [error3, setError3] = useRecoilState(errState3);
  const [error4, setError4] = useRecoilState(errState4);
  const [error5, setError5] = useRecoilState(errState5);
  const [error6, setError6] = useRecoilState(errState6);
  const [error7, setError7] = useRecoilState(errState7);
  const [error8, setError8] = useRecoilState(errState8);
  const [error9, setError9] = useRecoilState(errState9);
  const [error10, setError10] = useRecoilState(errState10);
  const [error11, setError11] = useRecoilState(errState11);
  const [error12, setError12] = useRecoilState(errState12);
  const [error13, setError13] = useRecoilState(errState13);
  const [error14, setError14] = useRecoilState(errState14);
  const [error15, setError15] = useRecoilState(errState15);
  const [error16, setError16] = useRecoilState(errState16);
  const [error17, setError17] = useRecoilState(errState17);
  const [error18, setError18] = useRecoilState(errState18);
  const [error19, setError19] = useRecoilState(errState19);
  const [error20, setError20] = useRecoilState(errState20);
  const [error21, setError21] = useRecoilState(errState21);
  const [error22, setError22] = useRecoilState(errState22);
  const [error23, setError23] = useRecoilState(errState23);
  const [error24, setError24] = useRecoilState(errState24);
  const rsvArr = [];
  const baseQuery = (dateTime) => {
    return query(
      collection(db, "FreeSpace"),
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
  const loadScheduleAll = async (newDate) => {
    const loadSchedule1 = async () => {
      setError1(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 1))
      );
      if (snapshot.empty) {
        setError1(true);
      }
      baseLoading(snapshot, 1);
    };
    const loadSchedule2 = async () => {
      setError2(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 2))
      );
      if (snapshot.empty) {
        setError2(true);
      }
      baseLoading(snapshot, 2);
    };
    const loadSchedule3 = async () => {
      setError3(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 3))
      );
      if (snapshot.empty) {
        setError3(true);
      }
      baseLoading(snapshot, 3);
    };
    const loadSchedule4 = async () => {
      setError4(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 4))
      );
      if (snapshot.empty) {
        setError4(true);
      }
      baseLoading(snapshot, 4);
    };
    const loadSchedule5 = async () => {
      setError5(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 5))
      );
      if (snapshot.empty) {
        setError5(true);
      }
      baseLoading(snapshot, 5);
    };
    const loadSchedule6 = async () => {
      setError6(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 6))
      );
      if (snapshot.empty) {
        setError6(true);
      }
      baseLoading(snapshot, 6);
    };
    const loadSchedule7 = async () => {
      setError7(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 7))
      );
      if (snapshot.empty) {
        setError7(true);
      }
      baseLoading(snapshot, 7);
    };
    const loadSchedule8 = async () => {
      setError8(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 8))
      );
      if (snapshot.empty) {
        setError8(true);
      }
      baseLoading(snapshot, 8);
    };
    const loadSchedule9 = async () => {
      setError9(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 9))
      );
      if (snapshot.empty) {
        setError9(true);
      }
      baseLoading(snapshot, 9);
    };
    const loadSchedule10 = async () => {
      setError10(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 10))
      );
      if (snapshot.empty) {
        setError10(true);
      }
      baseLoading(snapshot, 10);
    };
    const loadSchedule11 = async () => {
      setError11(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 11))
      );
      if (snapshot.empty) {
        setError11(true);
      }
      baseLoading(snapshot, 11);
    };
    const loadSchedule12 = async () => {
      setError12(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 12))
      );
      if (snapshot.empty) {
        setError12(true);
      }
      baseLoading(snapshot, 12);
    };
    const loadSchedule13 = async () => {
      setError13(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 13))
      );
      if (snapshot.empty) {
        setError13(true);
      }
      baseLoading(snapshot, 13);
    };
    const loadSchedule14 = async () => {
      setError14(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 14))
      );
      if (snapshot.empty) {
        setError14(true);
      }
      baseLoading(snapshot, 14);
    };
    const loadSchedule15 = async () => {
      setError15(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 15))
      );
      if (snapshot.empty) {
        setError15(true);
      }
      baseLoading(snapshot, 15);
    };
    const loadSchedule16 = async () => {
      setError16(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 16))
      );
      if (snapshot.empty) {
        setError16(true);
      }
      baseLoading(snapshot, 16);
    };
    const loadSchedule17 = async () => {
      setError17(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 17))
      );
      if (snapshot.empty) {
        setError17(true);
      }
      baseLoading(snapshot, 17);
    };
    const loadSchedule18 = async () => {
      setError18(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 18))
      );
      if (snapshot.empty) {
        setError18(true);
      }
      baseLoading(snapshot, 18);
    };
    const loadSchedule19 = async () => {
      setError19(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 19))
      );
      if (snapshot.empty) {
        setError19(true);
      }
      baseLoading(snapshot, 19);
    };
    const loadSchedule20 = async () => {
      setError20(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 20))
      );
      if (snapshot.empty) {
        setError20(true);
      }
      baseLoading(snapshot, 20);
    };
    const loadSchedule21 = async () => {
      setError21(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 21))
      );
      if (snapshot.empty) {
        setError21(true);
      }
      baseLoading(snapshot, 21);
    };
    const loadSchedule22 = async () => {
      setError22(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 22))
      );
      if (snapshot.empty) {
        setError22(true);
      }
      baseLoading(snapshot, 22);
    };
    const loadSchedule23 = async () => {
      setError23(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 23))
      );
      if (snapshot.empty) {
        setError23(true);
      }
      baseLoading(snapshot, 23);
    };
    const loadSchedule24 = async () => {
      setError24(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", 24))
      );
      if (snapshot.empty) {
        setError24(true);
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
          ? { rsv: rsv1, error: error1, number: 1 }
          : time == 2
          ? { rsv: rsv2, error: error2, number: 2 }
          : time == 3
          ? { rsv: rsv3, error: error3, number: 3 }
          : time == 4
          ? { rsv: rsv4, error: error4, number: 4 }
          : time == 5
          ? { rsv: rsv5, error: error5, number: 5 }
          : time == 6
          ? { rsv: rsv6, error: error6, number: 6 }
          : time == 7
          ? { rsv: rsv7, error: error7, number: 7 }
          : time == 8
          ? { rsv: rsv8, error: error8, number: 8 }
          : time == 9
          ? { rsv: rsv9, error: error9, number: 9 }
          : time == 10
          ? { rsv: rsv10, error: error10, number: 10 }
          : time == 11
          ? { rsv: rsv11, error: error11, number: 11 }
          : time == 12
          ? { rsv: rsv12, error: error12, number: 12 }
          : time == 13
          ? { rsv: rsv13, error: error13, number: 13 }
          : time == 14
          ? { rsv: rsv14, error: error14, number: 14 }
          : time == 15
          ? { rsv: rsv15, error: error15, number: 15 }
          : time == 16
          ? { rsv: rsv16, error: error16, number: 16 }
          : time == 17
          ? { rsv: rsv17, error: error17, number: 17 }
          : time == 18
          ? { rsv: rsv18, error: error18, number: 18 }
          : time == 19
          ? { rsv: rsv19, error: error19, number: 19 }
          : time == 20
          ? { rsv: rsv20, error: error20, number: 20 }
          : time == 21
          ? { rsv: rsv21, error: error21, number: 21 }
          : time == 22
          ? { rsv: rsv22, error: error22, number: 22 }
          : time == 23
          ? { rsv: rsv23, error: error23, number: 23 }
          : time == 24 && { rsv: rsv24, error: error24, number: 24 }
      );
    });
  }
  return { loadScheduleAll, rsvArr };
};
