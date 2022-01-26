import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { browser } from "process";
import { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { ReserveList } from "../../models/ReserveList";

export default function Reservers() {
  const [reserve, setReserve] = useState<ReserveList[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**========
     * Firebaseからデータを取得
     *========*/
    async function loadReseves() {
      const db = getFirestore();
      const q = query(collection(db, "ReserveList"));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //ReserveList一覧の展開
      const gotReserves = snapshot.docs.map((doc) => {
        const reserve = doc.data() as ReserveList;
        return reserve;
      });
      setReserve(gotReserves);
    }
    loadReseves();
  }, [process, browser, user]);
}
