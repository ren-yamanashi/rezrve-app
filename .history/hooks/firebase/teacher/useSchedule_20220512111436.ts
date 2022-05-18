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
import {useLoading} from "../../useLoading";
import {useDate} from "../../date/useDate"


/**========= Schedule =========*/
export const useSchedule = () => {
  const { user } = useAuth();
  const { user_query } = useSelectUser_query();
  const {startLoading,completeLoading} = useLoading();
  const {newDateTime} = useDate();
  // ここはオブジェクトにしない　※ array.push()が上書きされる為
  const [rsv1, setRsv1] = React.useState<FreeList[]>([]);
  const [rsv2, setRsv2] = React.useState<FreeList[]>([]);
  const [rsv3, setRsv3] = React.useState<FreeList[]>([]);
  const [rsv4, setRsv4] = React.useState<FreeList[]>([]);
  const [rsv5, setRsv5] = React.useState<FreeList[]>([]);
  const [rsv6, setRsv6] = React.useState<FreeList[]>([]);
  const [rsv7, setRsv7] = React.useState<FreeList[]>([]);
  const [rsv8, setRsv8] = React.useState<FreeList[]>([]);
  const [rsv9, setRsv9] = React.useState<FreeList[]>([]);
  const [rsv10, setRsv10] = React.useState<FreeList[]>([]);
  const [rsv11, setRsv11] = React.useState<FreeList[]>([]);
  const [rsv12, setRsv12] = React.useState<FreeList[]>([]);
  const [rsv13, setRsv13] = React.useState<FreeList[]>([]);
  const [rsv14, setRsv14] = React.useState<FreeList[]>([]);
  const [rsv15, setRsv15] = React.useState<FreeList[]>([]);
  const [rsv16, setRsv16] = React.useState<FreeList[]>([]);
  const [rsv17, setRsv17] = React.useState<FreeList[]>([]);
  const [rsv18, setRsv18] = React.useState<FreeList[]>([]);
  const [rsv19, setRsv19] = React.useState<FreeList[]>([]);
  const [rsv20, setRsv20] = React.useState<FreeList[]>([]);
  const [rsv21, setRsv21] = React.useState<FreeList[]>([]);
  const [rsv22, setRsv22] = React.useState<FreeList[]>([]);
  const [rsv23, setRsv23] = React.useState<FreeList[]>([]);
  const [rsv24, setRsv24] = React.useState<FreeList[]>([]);
  const [error1, setError1] = React.useState<boolean>(false);
  const [error2, setError2] = React.useState<boolean>(false);
  const [error3, setError3] = React.useState<boolean>(false);
  const [error4, setError4] = React.useState<boolean>(false);
  const [error5, setError5] = React.useState<boolean>(false);
  const [error6, setError6] = React.useState<boolean>(false);
  const [error7, setError7] = React.useState<boolean>(false);
  const [error8, setError8] = React.useState<boolean>(false);
  const [error9, setError9] = React.useState<boolean>(false);
  const [error10, setError10] = React.useState<boolean>(false);
  const [error11, setError11] = React.useState<boolean>(false);
  const [error12, setError12] = React.useState<boolean>(false);
  const [error13, setError13] = React.useState<boolean>(false);
  const [error14, setError14] = React.useState<boolean>(false);
  const [error15, setError15] = React.useState<boolean>(false);
  const [error16, setError16] = React.useState<boolean>(false);
  const [error17, setError17] = React.useState<boolean>(false);
  const [error18, setError18] = React.useState<boolean>(false);
  const [error19, setError19] = React.useState<boolean>(false);
  const [error20, setError20] = React.useState<boolean>(false);
  const [error21, setError21] = React.useState<boolean>(false);
  const [error22, setError22] = React.useState<boolean>(false);
  const [error23, setError23] = React.useState<boolean>(false);
  const [error24, setError24] = React.useState<boolean>(false);
  const rsvArr = [];
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
  React.useEffect(() => {
    if(user == null) {
      return;
    }
    startLoading();
    loadScheduleAll(newDateTime).then(() => {
      setTimeout(() => completeLoading(),500)
    })
  },[user]);
  return { loadScheduleAll, rsvArr };
};
