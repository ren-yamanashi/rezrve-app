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
  const rsvArr = [];
  const loadScheduleAll = async (reserves,times) => {
  {
    times.map((time) => {
      reserves.map((reserve) => {
        reserve.time == time && rsvArr.push(reserve)
      })
    });
  }
  
};
return { loadScheduleAll, rsvArr };
}
