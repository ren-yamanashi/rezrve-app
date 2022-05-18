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
import { useLoading } from "../../useLoading";
import { reserveProps } from "../../../models/reserveProps";

export const useSchedule = () => {
  const router = useRouter();
  const pageQuery = router.query as Query
  const { user } = useAuth();
  const { user_query } = useSelectUser_query();
  const {newDateTime} = useDate();
  const {startLoading,completeLoading} = useLoading();
  // ここはオブジェクトにしない　※array.push()で上書きされるため
  const [rsv1, setRsv1] = React.useState<reserveProps[]>([]);
  const [rsv2, setRsv2] = React.useState<reserveProps[]>([]);
  const [rsv3, setRsv3] = React.useState<reserveProps[]>([]);
  const [rsv4, setRsv4] = React.useState<reserveProps[]>([]);
  const [rsv5, setRsv5] = React.useState<reserveProps[]>([]);
  const [rsv6, setRsv6] = React.useState<reserveProps[]>([]);
  const [rsv7, setRsv7] = React.useState<reserveProps[]>([]);
  const [rsv8, setRsv8] = React.useState<reserveProps[]>([]);
  const [rsv9, setRsv9] = React.useState<reserveProps[]>([]);
  const [rsv10, setRsv10] = React.useState<reserveProps[]>([]);
  const [rsv11, setRsv11] = React.useState<reserveProps[]>([]);
  const [rsv12, setRsv12] = React.useState<reserveProps[]>([]);
  const [rsv13, setRsv13] = React.useState<reserveProps[]>([]);
  const [rsv14, setRsv14] = React.useState<reserveProps[]>([]);
  const [rsv15, setRsv15] = React.useState<reserveProps[]>([]);
  const [rsv16, setRsv16] = React.useState<reserveProps[]>([]);
  const [rsv17, setRsv17] = React.useState<reserveProps[]>([]);
  const [rsv18, setRsv18] = React.useState<reserveProps[]>([]);
  const [rsv19, setRsv19] = React.useState<reserveProps[]>([]);
  const [rsv20, setRsv20] = React.useState<reserveProps[]>([]);
  const [rsv21, setRsv21] = React.useState<reserveProps[]>([]);
  const [rsv22, setRsv22] = React.useState<reserveProps[]>([]);
  const [rsv23, setRsv23] = React.useState<reserveProps[]>([]);
  const [rsv24, setRsv24] = React.useState<reserveProps[]>([]);
  const rsvArr = [];
  
  const loadScheduleAll = async (reserves,times) => {
  {
    times.map((time) => {
      reserves.map((reserve) => {
        reserve.time == time && rsvArr.push(reserve)
      })
    });
  }
  // React.useEffect(() => {
  //   if(user == null) {
  //     return;
  //   } 
  //   if(pageQuery == null ){
  //     return;
  //   }
  //   startLoading();
  //   loadScheduleAll(newDateTime, pageQuery?.id).then(() => {
  //     setTimeout(() => completeLoading(),500);
  //   });
  // }, [user,pageQuery?.id]);
  return { loadScheduleAll, rsvArr };
};
