//import notIn File
import { atom, useRecoilState } from "recoil";
import * as React from "react";
import { db, timestamp } from "../useFirebase";
import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { FreeList } from "../../../models/FreeList";
import { useAlert } from "../../useAlert";
import { useDate } from "../../date/useDate";
import { useLoading } from "../../useLoading";

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

export const useTeachersRsv_schedule = () => {
  const { showErrorMessage } = useAlert();
  const [rsv, setRsv] = useRecoilState(rsvState);
  const [rsv2, setRsv2] = useRecoilState(rsvState2);
  const [rsv3, setRsv3] = useRecoilState(rsvState3);
  const [rsv4, setRsv4] = useRecoilState(rsvState4);
  const [rsv5, setRsv5] = useRecoilState(rsvState5);
  const [rsv6, setRsv6] = useRecoilState(rsvState6);
  const [rsv7, setRsv7] = useRecoilState(rsvState7);
  const rsvArr = [rsv, rsv2, rsv3, rsv4, rsv5, rsv6, rsv7];
  const {xArr,yArr,zArr} = useDate();
  const {loading,startLoading,completeLoading} = useLoading();
  const baseQuery = (staffId, dateTime) => {
    return query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", staffId),
      where("date", "==", timestamp(dateTime))
    );
  };
  const baseLoading = (snapshot: QuerySnapshot<DocumentData>, number) => {
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
  };
  const loadRsvScheduleAll_X = async (
    staff,
    date1,
    date2,
    date3,
    date4,
    date5,
    date6,
    date7
  ) => {
    const loadRsv_Schedule1_X = async () => {
      const snapshot = await getDocs(baseQuery(staff, date1));
      baseLoading(snapshot, 1);
    };
    const loadRsv_Schedule2_X = async () => {
      const snapshot = await getDocs(baseQuery(staff, date2));
      baseLoading(snapshot, 2);
    };
    const loadRsv_Schedule3_X = async () => {
      const snapshot = await getDocs(baseQuery(staff, date3));
      baseLoading(snapshot, 3);
    };
    const loadRsv_Schedule4_X = async () => {
      const snapshot = await getDocs(baseQuery(staff, date4));
      baseLoading(snapshot, 4);
    };
    const loadRsv_Schedule5_X = async () => {
      const snapshot = await getDocs(baseQuery(staff, date5));
      baseLoading(snapshot, 5);
    };
    const loadRsv_Schedule6_X = async () => {
      const snapshot = await getDocs(baseQuery(staff, date6));
      baseLoading(snapshot, 6);
    };
    const loadRsv_Schedule7_X = async () => {
      const snapshot = await getDocs(baseQuery(staff, date7));
      baseLoading(snapshot, 7);
    };
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
      showErrorMessage("読み取りに失敗しました");
    }
  };
  const loadRsvScheduleAll_Y = async (
    staff,
    date1,
    date2,
    date3,
    date4,
    date5,
    date6,
    date7
  ) => {
    const loadRsv_Schedule1_Y = async () => {
      const snapshot = await getDocs(baseQuery(staff, date1));
      baseLoading(snapshot, 1);
    };
    const loadRsv_Schedule2_Y = async () => {
      const snapshot = await getDocs(baseQuery(staff, date2));
      baseLoading(snapshot, 2);
    };
    const loadRsv_Schedule3_Y = async () => {
      const snapshot = await getDocs(baseQuery(staff, date3));
      baseLoading(snapshot, 3);
    };
    const loadRsv_Schedule4_Y = async () => {
      const snapshot = await getDocs(baseQuery(staff, date4));
      baseLoading(snapshot, 4);
    };
    const loadRsv_Schedule5_Y = async () => {
      const snapshot = await getDocs(baseQuery(staff, date5));
      baseLoading(snapshot, 5);
    };
    const loadRsv_Schedule6_Y = async () => {
      const snapshot = await getDocs(baseQuery(staff, date6));
      baseLoading(snapshot, 6);
    };
    const loadRsv_Schedule7_Y = async () => {
      const snapshot = await getDocs(baseQuery(staff, date7));
      baseLoading(snapshot, 7);
    };

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
      showErrorMessage("読み取りに失敗しました");
    }
  };
  const loadRsvScheduleAll_Z = async (
    staff,
    date1,
    date2,
    date3,
    date4,
    date5,
    date6,
    date7
  ) => {
    const loadRsv_Schedule1_Z = async () => {
      const snapshot = await getDocs(baseQuery(staff, date1));
      baseLoading(snapshot, 1);
    };
    const loadRsv_Schedule2_Z = async () => {
      const snapshot = await getDocs(baseQuery(staff, date2));
      baseLoading(snapshot, 2);
    };
    const loadRsv_Schedule3_Z = async () => {
      const snapshot = await getDocs(baseQuery(staff, date3));
      baseLoading(snapshot, 3);
    };
    const loadRsv_Schedule4_Z = async () => {
      const snapshot = await getDocs(baseQuery(staff, date4));
      baseLoading(snapshot, 4);
    };
    const loadRsv_Schedule5_Z = async () => {
      const snapshot = await getDocs(baseQuery(staff, date5));
      baseLoading(snapshot, 5);
    };
    const loadRsv_Schedule6_Z = async () => {
      const snapshot = await getDocs(baseQuery(staff, date6));
      baseLoading(snapshot, 6);
    };
    const loadRsv_Schedule7_Z = async () => {
      const snapshot = await getDocs(baseQuery(staff, date7));
      baseLoading(snapshot, 7);
    };
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
      showErrorMessage("読み取りに失敗しました");
    }
  };
  // ローディング関数
  const loadSchedulesX = async (senderUid) => {
    startLoading();
    loadRsvScheduleAll_X(
      senderUid,
      xArr[0],
      xArr[1],
      xArr[2],
      xArr[3],
      xArr[4],
      xArr[5],
      xArr[6]
    ).then(() => setTimeout(() => completeLoading(), 500));
  };
  const loadSchedulesY = (senderUid) => {
    startLoading();
    loadRsvScheduleAll_Y(
      senderUid,
      zArr[0],
      zArr[1],
      zArr[2],
      zArr[3],
      zArr[4],
      zArr[5],
      zArr[6]
    ).then(() => setTimeout(() => completeLoading(), 500));
  };
  const loadSchedulesZ = (senderUid) => {
    startLoading();
    loadRsvScheduleAll_Z(
      senderUid,
      yArr[0],
      yArr[1],
      yArr[2],
      yArr[3],
      yArr[4],
      yArr[5],
      yArr[6]
    ).then(() => setTimeout(() => completeLoading(), 500));
  };

  return {
    loadRsvScheduleAll_X,
    loadRsvScheduleAll_Y,
    loadRsvScheduleAll_Z,
    loadSchedulesX,
    loadSchedulesY,
    loadSchedulesZ,
    rsv,
    rsv2,
    rsv3,
    rsv4,
    rsv5,
    rsv6,
    rsv7,
    rsvArr,
  };
};
