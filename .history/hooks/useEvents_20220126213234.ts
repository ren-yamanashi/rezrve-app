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
    id: 14,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3))
  },
  {
    id: 15,
    title: "Point in Time Event",
    start: now,
    end: now
  },
  
];
