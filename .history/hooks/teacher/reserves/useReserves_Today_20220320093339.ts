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
import { User } from '../../../models/User';
import { FreeList } from '../../../models/FreeList';
import { useAuth } from '../../useUserAuth';
import { useToday } from '../../date/useToday';
import {CreateQuery} from '../../useQuery';
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
// getFireStore 
const db = getFirestore()
//
const day = new Date();
const y = day.getFullYear();
const m = day.getMonth();
const d = day.getDate();
let xxx = new Date(y, m, d, 12, 0, 0);
let xxx7 = new Date(y, m, d + 7, 12, 0, 0);
//日付をTimeStamp型にして返す
const timestamp = (datetimeStr: any) => {
  return Timestamp.fromDate(new Date(datetimeStr));
};
/**=============================
 * @returns 今日の予約表示
 *=============================*/
export function useReserves_Today() {
	const {user} = useAuth();
	const {today} = useToday();
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
			const q = query(
			  collection(db, "FreeSpace"),
			  where("senderUid", "==", user.uid),
			  where("date",">=",timestamp(xxx)),
			  where("date","<=",timestamp(xxx7)),
			  orderBy("date", "asc"),
			  where("reserved", "==", true),
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
			setError(false);
		  }
		  loadReserves();
	},[process, browser, user])
	return {rsv,error}
}