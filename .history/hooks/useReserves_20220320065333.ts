//import notIn File
import { getAuth, onAuthStateChanged,sendPasswordResetEmail, signInAnonymously } from 'firebase/auth'
import { atom,useRecoilState } from 'recoil'
import { useEffect } from 'react'
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
//import in File 
import { User } from '../models/User';
import { FreeList } from '../models/FreeList';
import { useAuth } from './useUserAuth';
import {CreateQuery} from './useQuery';
import { browser } from 'process';

//create state use atom
const initialRsv : FreeList[] = []
const initialError : boolean = false
export const rsvState = atom({
	key:"rsv",
	default:initialRsv,
})
export const errState = atom({
	key:"error",
	default:initialError,
})
// Create day setTime 12:00
const newDate = new Date();
const y = newDate.getFullYear();
const m = newDate.getMonth();
const d = newDate.getDate();
const today = new Date(y, m, d, 12, 0, 0);
const weekend = new Date(y, m, d+1, 12,0,0);
const timestamp = (datetimeStr: any) => {
	return Timestamp.fromDate(new Date(datetimeStr));
};
// getFireStore 
const db = getFirestore()
/**=============================
 * @returns 今日の予約表示
 *=============================*/
export function useReserves_Today() {
	const {user} = useAuth();
	const [rsv,setRsv] = useRecoilState(rsvState)
	const [error,setError] = useRecoilState(errState)
	useEffect(() => {
		if (!process.browser) {
			return;
		  }
		  if (user === null) {
			return;
		}
		async function loadReserves() {
			setError(false);
			const q = query(
			  collection(db, "FreeSpace"),
			  where("senderUid", "==", user.uid),
			  where("reserved", "==", true),
			  where("date", "==", timestamp(today)),
			  orderBy("time", "asc")
			);
			const snapshot = await getDocs(q);
			if (snapshot.empty) {
			  setError(true);
			}
			const gotReserves = snapshot.docs.map((doc) => {
			  const reserve = doc.data() as FreeList;
			  reserve.id = doc.id;
			  return reserve;
			});
			setRsv(gotReserves);
		  }
		  loadReserves();
	},[process, browser, user])
	return {rsv,error}
}
/**====================================
 * @returns 1週間の予約表示（管理者画面）
 *=====================================*/
export function useReserves_week () {
	const {user} = useAuth();
	const [rsv,setRsv] = useRecoilState(rsvState)
	const [error,setError] = useRecoilState(errState)
	useEffect(() => {
		if (!process.browser) {
			return;
		  }
		  if (user === null) {
			return;
		}
		async function loadReserves() {
			setError(false);
			const q = query(
			  collection(db, "FreeSpace"),
			  where("senderUid", "==", user.uid),
			  where("reserved", "==", true),
			  where("date", ">=", timestamp(today)),
			  where("date", "<=", timestamp(today)),
			  orderBy("date", "asc")
			);
			const snapshot = await getDocs(q);
			if (snapshot.empty) {
			  setError(true);
			}
			const gotReserves = snapshot.docs.map((doc) => {
			  const reserve = doc.data() as FreeList;
			  reserve.id = doc.id;
			  return reserve;
			});
			setRsv(gotReserves);
		  }
		  loadReserves();
	},[process, browser, user])
	return {rsv,error}
}