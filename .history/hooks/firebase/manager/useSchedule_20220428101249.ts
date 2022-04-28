//import notIn File
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
import { useRouter } from "next/router";
import { Query } from "../../../models/router_query";
import { useDate } from "../../date/useDate";

interface RsvList {
  rsv1:FreeList[];
  rsv2:FreeList[];
  rsv3:FreeList[];
  rsv4:FreeList[];
  rsv5:FreeList[];
  rsv6:FreeList[];
  rsv7:FreeList[];
  rsv8:FreeList[];
  rsv9:FreeList[];
  rsv10:FreeList[];
  rsv11:FreeList[];
  rsv12:FreeList[];
  rsv13:FreeList[];
  rsv14:FreeList[];
  rsv15:FreeList[];
  rsv16:FreeList[];
  rsv17:FreeList[];
  rsv18:FreeList[];
  rsv19:FreeList[];
  rsv20:FreeList[];
  rsv21:FreeList[];
  rsv22:FreeList[];
  rsv23:FreeList[];
  rsv24:FreeList[];
}
/**========= Schedule =========*/
export const useSchedule = () => {
  const router = useRouter();
  const pageQuery = router.query as Query
  const { user } = useAuth();
  const { user_query } = useSelectUser_query();
  const [reserveList,setReserveList] = React.useState({
    rsv1:[],
    rsv2:[],
  rsv3:[],
  rsv4:[],
  rsv5:[],
  rsv6:[],
  rsv7:[],
  rsv8:[],
  rsv9:[],
  rsv10:[],
  rsv11:[],
  rsv12:[],
  rsv13:[],
  rsv14:[],
  rsv15:[],
  rsv16:[],
  rsv17:[],
  rsv18:[],
  rsv19:[],
  rsv20:[],
  rsv21:[],
  rsv22:[],
  rsv23:[],
  rsv24:[]})
  
  const {newDateTime} = useDate();
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
    number == 1 && setReserveList({...reserveList,rsv1:gotFreeList})
    number == 2 && setReserveList({...reserveList,rsv2:gotFreeList})
    number == 3 && setReserveList({...reserveList,rsv3:gotFreeList})
    number == 4 && setReserveList({...reserveList,rsv4:gotFreeList})
    number == 5 && setReserveList({...reserveList,rsv5:gotFreeList})
    number == 6 && setReserveList({...reserveList,rsv6:gotFreeList})
    number == 7 && setReserveList({...reserveList,rsv7:gotFreeList})
    number == 8 && setReserveList({...reserveList,rsv8:gotFreeList})
    number == 9 && setReserveList({...reserveList,rsv9:gotFreeList})
    number == 10 && setReserveList({...reserveList,rsv10:gotFreeList})
    number == 11 && setReserveList({...reserveList,rsv11:gotFreeList})
    number == 12 && setReserveList({...reserveList,rsv12:gotFreeList})
    number == 13 && setReserveList({...reserveList,rsv13:gotFreeList})
    number == 14 && setReserveList({...reserveList,rsv14:gotFreeList})
    number == 15 && setReserveList({...reserveList,rsv15:gotFreeList})
    number == 16 && setReserveList({...reserveList,rsv16:gotFreeList})
    number == 17 && setReserveList({...reserveList,rsv17:gotFreeList})
    number == 18 && setReserveList({...reserveList,rsv18:gotFreeList})
    number == 19 && setReserveList({...reserveList,rsv19:gotFreeList})
    number == 20 && setReserveList({...reserveList,rsv20:gotFreeList})
    number == 21 && setReserveList({...reserveList,rsv21:gotFreeList})
    number == 22 && setReserveList({...reserveList,rsv22:gotFreeList})
    number == 23 && setReserveList({...reserveList,rsv23:gotFreeList})
    number == 24 && setReserveList({...reserveList,rsv24:gotFreeList})
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
          ? reserveList.rsv1
          : time == 2
          ? reserveList.rsv2
          : time == 3
          ? reserveList.rsv3
          : time == 4
          ? reserveList.rsv4
          : time == 5
          ? reserveList.rsv5
          : time == 6
          ? reserveList.rsv6
          : time == 7
          ? reserveList.rsv7
          : time == 8
          ? reserveList.rsv8
          : time == 9
          ? reserveList.rsv9
          : time == 10
          ? reserveList.rsv10
          : time == 11
          ? reserveList.rsv11
          : time == 12
          ? reserveList.rsv12
          : time == 13
          ? reserveList.rsv13
          : time == 14
          ? reserveList.rsv14
          : time == 15
          ? reserveList.rsv15
          : time == 16
          ? reserveList.rsv16
          : time == 17
          ? reserveList.rsv17
          : time == 18
          ? reserveList.rsv18
          : time == 19
          ? reserveList.rsv19
          : time == 20
          ? reserveList.rsv20
          : time == 21
          ? reserveList.rsv21
          : time == 22
          ? reserveList.rsv22
          : time == 23
          ? reserveList.rsv23
          : time == 24 && reserveList.rsv24
      );
    });
  }
  React.useEffect(() => {
    if(pageQuery == null ){
      return;
    }
    console.log(rsvArr)
    loadScheduleAll(newDateTime, pageQuery?.id);
  }, [pageQuery?.id]);
  return { loadScheduleAll, rsvArr };
};
