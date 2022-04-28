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
import { useRouter } from "next/router";
import { Query } from "../../../models/router_query";

export const useTeachersRsv_schedule = () => {
  const router = useRouter();
  const pageQuery = router.query as Query
  const { showErrorMessage } = useAlert();
  const [rsv, setRsv] = React.useState<FreeList[]>([]);
  const [rsv2, setRsv2] = React.useState<FreeList[]>([]);
  const [rsv3, setRsv3] = React.useState<FreeList[]>([]);
  const [rsv4, setRsv4] = React.useState<FreeList[]>([]);
  const [rsv5, setRsv5] = React.useState<FreeList[]>([]);
  const [rsv6, setRsv6] = React.useState<FreeList[]>([]);
  const [rsv7, setRsv7] = React.useState<FreeList[]>([]);
  const rsvArr = [rsv, rsv2, rsv3, rsv4, rsv5, rsv6, rsv7];
  const {xArr,yArr,zArr} = useDate();
  const {startLoading,completeLoading} = useLoading();
  const baseQuery = (staffId, dateTime) => {
    if(staffId == null ) {
      return;
    }
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
    if (staff == null) {
      return
    }
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
  React.useEffect(() => {
    if(pageQuery?.uid == null) {
      return;
    }
    startLoading();
    loadSchedulesX(pageQuery?.uid).then(() => {
      setTimeout(() => completeLoading(),500)
    })
  },[pageQuery?.uid])
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
