//import notIn File
import {
  atom,
  atomFamily,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
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
import { useAuth } from "../useUserAuth";
import { useAlert } from "../../useAlert";
import { db, timestamp } from "../useFirebase";

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
  const baseQuery = (dateTime) => {
    return query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
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
  const rsvArr = [];
  const reserveArr = [
    { rsv: rsv1, error: error1, number: 1 },
    { rsv: rsv2, error: error2, number: 2 },
    { rsv: rsv3, error: error3, number: 3 },
    { rsv: rsv4, error: error4, number: 4 },
    { rsv: rsv5, error: error5, number: 5 },
    { rsv: rsv6, error: error6, number: 6 },
    { rsv: rsv7, error: error7, number: 7 },
    { rsv: rsv8, error: error8, number: 8 },
    { rsv: rsv9, error: error9, number: 9 },
    { rsv: rsv10, error: error10, number: 10 },
    { rsv: rsv11, error: error11, number: 11 },
    { rsv: rsv12, error: error12, number: 12 },
    { rsv: rsv13, error: error13, number: 13 },
    { rsv: rsv14, error: error14, number: 14 },
    { rsv: rsv15, error: error15, number: 15 },
    { rsv: rsv16, error: error16, number: 16 },
    { rsv: rsv17, error: error17, number: 17 },
    { rsv: rsv18, error: error18, number: 18 },
    { rsv: rsv19, error: error19, number: 19 },
    { rsv: rsv20, error: error20, number: 20 },
    { rsv: rsv21, error: error21, number: 21 },
    { rsv: rsv22, error: error22, number: 22 },
    { rsv: rsv23, error: error23, number: 23 },
    { rsv: rsv24, error: error24, number: 24 },
  ];
  const loadScheduleAll = async (newDate, times) => {
    times.map(async (time) => {
      time == 1 && setError1(false);
      time == 2 && setError2(false);
      time == 3 && setError3(false);
      time == 4 && setError4(false);
      time == 5 && setError5(false);
      time == 6 && setError6(false);
      time == 7 && setError7(false);
      time == 8 && setError8(false);
      time == 9 && setError9(false);
      time == 10 && setError10(false);
      time == 11 && setError11(false);
      time == 12 && setError12(false);
      time == 13 && setError13(false);
      time == 14 && setError14(false);
      time == 15 && setError15(false);
      time == 16 && setError16(false);
      time == 17 && setError17(false);
      time == 18 && setError18(false);
      time == 19 && setError19(false);
      time == 20 && setError20(false);
      time == 21 && setError21(false);
      time == 22 && setError22(false);
      time == 23 && setError23(false);
      time == 24 && setError24(false);
      const snapshot = await getDocs(
        query(baseQuery(newDate), where("time", "==", time))
      );
      if (snapshot.empty) {
        time == 1 && setError1(true);
        time == 2 && setError2(true);
        time == 3 && setError3(true);
        time == 4 && setError4(true);
        time == 5 && setError5(true);
        time == 6 && setError6(true);
        time == 7 && setError7(true);
        time == 8 && setError8(true);
        time == 9 && setError9(true);
        time == 10 && setError10(true);
        time == 11 && setError11(true);
        time == 12 && setError12(true);
        time == 13 && setError13(true);
        time == 14 && setError14(true);
        time == 15 && setError15(true);
        time == 16 && setError16(true);
        time == 17 && setError17(true);
        time == 18 && setError18(true);
        time == 19 && setError19(true);
        time == 20 && setError20(true);
        time == 21 && setError21(true);
        time == 22 && setError22(true);
        time == 23 && setError23(true);
        time == 24 && setError24(true);
      }
      baseLoading(snapshot, time);
      rsvArr.push(
        time == 1
          ? { rsv: rsv1, error: error1, number: 1 }
          : time == 2
          ? { rsv: rsv2, error: error2, number: 2 }
          : time == 3
          ? { rsv: rsv3, error: error3, number: 3 }
          : time == 3
          ? { rsv: rsv4, error: error4, number: 4 }
          : time == 3
          ? { rsv: rsv5, error: error5, number: 5 }
          : time == 3
          ? { rsv: rsv6, error: error6, number: 6 }
          : time == 3
          ? { rsv: rsv7, error: error7, number: 7 }
          : time == 3
          ? { rsv: rsv8, error: error8, number: 8 }
          : time == 3
          ? { rsv: rsv9, error: error9, number: 9 }
          : time == 3
          ? { rsv: rsv10, error: error10, number: 10 }
          : time == 3
          ? { rsv: rsv11, error: error11, number: 11 }
          : time == 3
          ? { rsv: rsv12, error: error12, number: 12 }
          : time == 3
          ? { rsv: rsv13, error: error13, number: 13 }
          : time == 3
          ? { rsv: rsv14, error: error14, number: 14 }
          : time == 3
          ? { rsv: rsv15, error: error15, number: 15 }
          : time == 3
          ? { rsv: rsv16, error: error16, number: 16 }
          : time == 3
          ? { rsv: rsv17, error: error17, number: 17 }
          : time == 3
          ? { rsv: rsv18, error: error18, number: 18 }
          : time == 3
          ? { rsv: rsv19, error: error19, number: 19 }
          : time == 3
          ? { rsv: rsv20, error: error20, number: 20 }
          : time == 3
          ? { rsv: rsv21, error: error21, number: 21 }
          : time == 3
          ? { rsv: rsv22, error: error22, number: 22 }
          : time == 3
          ? { rsv: rsv23, error: error23, number: 23 }
          : time == 3 && { rsv: rsv24, error: error24, number: 24 }
      );
    });
  };
  return { loadScheduleAll, reserveArr };
};
