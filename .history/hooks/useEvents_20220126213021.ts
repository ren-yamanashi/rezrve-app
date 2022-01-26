import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  startAt,
  endAt,
  Timestamp,
  Firestore,
} from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";
import React, { useEffect, useState } from "react";
//内部インポート
import { useAuth } from "./useUserAuth";
import { FreeList } from "../models/FreeList";
async function LoadRsv({event}) {
  let returnArray = []
  let [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const db = getDatabase();
  const dbRef = ref(db,"FreeSpace")
  onValue(dbRef,(snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const event = childSnapshot.val();
      event.key = childSnapshot.key;
      console.log(event.key)
    });
  })
    }

const now = new Date();

export default [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1)
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2022, 1, 26),
    end: new Date(2022, 1, 26)
  }
];
