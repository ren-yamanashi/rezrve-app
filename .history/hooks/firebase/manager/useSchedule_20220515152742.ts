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
  const {newDateTime} = useDate();
  const {startLoading,completeLoading} = useLoading();
  // ここはオブジェクトにしない　※array.push()で上書きされるため
  const rsv1  = [];
  const rsv2 = []
  const rsv3 = []
  const rsv4 = []
  const rsv5 = []
  const rsv6 = []
  const rsv7 = []
  const rsv8 = []
  const rsv9 = []
  const rsv10 = []
  const rsv11 = []
  const rsv12 = []
  const rsv13 = []
  const rsv14 = []
  const rsv15 = []
  const rsv16 = []
  const rsv17 = []
  const rsv18 = []
  const rsv19 = []
  const rsv20 = []
  const rsv21 = []
  const rsv22 = []
  const rsv23 = []
  const rsv24 = []
  const rsvArr = [];
  
  const loadScheduleAll = async (reserves,times) => {
    reserves.map((item) => {
      item.time == 1 ? rsv1.push(item) :
      item.time == 2 ? rsv2.push(item) :
      item.time == 3 ? rsv3.push(item) :
      item.time == 4 ? rsv4.push(item) :
      item.time == 5 ? rsv5.push(item) :
      item.time == 6 ? rsv6.push(item) :
      item.time == 7 ? rsv7.push(item) :
      item.time == 8 ? rsv8.push(item) :
      item.time == 9 ? rsv9.push(item) :
      item.time == 10 ? rsv10.push(item) :
      item.time == 11 ? rsv11.push(item) :
      item.time == 12 ? rsv12.push(item) :
      item.time == 13 ? rsv13.push(item) :
      item.time == 14 ? rsv14.push(item) :
      item.time == 15 ? rsv15.push(item) :
      item.time == 16 ? rsv16.push(item) :
      item.time == 17 ? rsv17.push(item) :
      item.time == 18 ? rsv18.push(item) :
      item.time == 19 ? rsv19.push(item) :
      item.time == 20 ? rsv20.push(item) :
      item.time == 21 ? rsv21.push(item) :
      item.time == 22 ? rsv22.push(item) :
      item.time == 23 ? rsv23.push(item) :
      item.time == 24 && rsv24.push(item) 
    });
    {
      times[0].number.map((time) => {
        rsvArr.push(
          time == 1
            ? rsv1
            : time == 2
            ?rsv2
            : time == 3
            ?rsv3
            : time == 4
            ?rsv4
            : time == 5
            ?rsv5
            : time == 6
            ?rsv6
            : time == 7
            ?rsv7
            : time == 8
            ?rsv8
            : time == 9
            ?rsv9
            : time == 10
            ?rsv10
            : time == 11
            ?rsv11
            : time == 12
            ?rsv12
            : time == 13
            ?rsv13
            : time == 14
            ?rsv14
            : time == 15
            ?rsv15
            : time == 16
            ?rsv16
            : time == 17
            ?rsv17
            : time == 18
            ?rsv18
            : time == 19
            ?rsv19
            : time == 20
            ?rsv20
            : time == 21
            ?rsv21
            : time == 22
            ?rsv22
            : time == 23
            ?rsv23
            : time == 24 && rsv24
        );
      });
    }
  };
  return { loadScheduleAll, rsvArr };
};
