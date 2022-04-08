//外部インポート
import { getAuth, onAuthStateChanged,sendPasswordResetEmail, signInAnonymously } from 'firebase/auth'
import { atom,useRecoilState } from 'recoil'
import { useEffect,useState } from 'react'
import {
	getFirestore,
	collection,
	doc,
	getDoc,
	setDoc,
	Timestamp,
	query,
	where,
	orderBy,
	getDocs,
  } from "firebase/firestore";
//内部インポート
import { User } from '../models/User';
import { FreeList } from '../models/FreeList';
import { useAuth } from './useUserAuth';

export const rsvState = atom<FreeList[]>({
	key:"reserve",
	default:null,
})

export function useReserves() {
	const db = getFirestore()
	const {user} = useAuth();
	const [rsv,setRsv] = useState<FreeList[]>([])
	// Create Today setTime 12:00
	const today = new Date();
	const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();
    const firebaseToDay = new Date(y, m, d, 12, 0, 0);
	const timestamp = (datetimeStr: any) => {
		return Timestamp.fromDate(new Date(datetimeStr));
	};
	useEffect(() => {
		if (!process.browser) {
			return;
		  }
		  if (user === null) {
			return;
		}
		async function loadReserves() {
			const q = query(
			  collection(db, "FreeSpace"),
			  where("senderUid", "==", user.uid),
			  where("reserved", "==", true),
			  where("date", "==", timestamp(firebaseToDay)),
			  orderBy("time", "asc")
			);
			const snapshot = await getDocs(q);
			if (snapshot.empty) {
			  return
			}
			//ReserveList一覧の展開
			const gotReserves = snapshot.docs.map((doc) => {
			  const reserve = doc.data() as FreeList;
			  reserve.id = doc.id;
			  return reserve;
			});
			setRsv(gotReserves);
		  }
		  loadReserves();
	},[])
	return {rsv}
}
