//外部インポート
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
import { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { browser } from "process";
import { ReserveList } from "../../models/ReserveList";
import { IconButton } from "@mui/material";

export default function soatWeekNumber() {
  const db = getFirestore();
  const { user } = useAuth();
  const [Reserves, setReserves] = useState<ReserveList[]>([]);
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**================
     * @returns Firebase　からデータを取得
     * ================== */
	 const UpdateReserve = async (id: string) => {
		const db = getFirestore();
		const ReserveRef = doc(db, "ReserveList", id);
		const q = query(collection(db, "ReserveList"),orderBy("WeekNumber","desc"));
		const snapshot = await getDocs(q);
		if (snapshot.empty) {
		  return;
		}
		const gotReservers = snapshot.docs.map((doc) => {
		  const reserve = doc.data() as ReserveList;
		  reserve.id = doc.id;
		  return reserve;
		});
		setReserves(gotReservers);
	  };
  return (
    <>
	<IconButton onClick={}>
      <FilterListIcon />
	  </IconButton>
    </>
  );
}
