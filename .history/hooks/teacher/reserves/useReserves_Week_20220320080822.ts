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
import { useWeekend } from '../../date/useWeekend';
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
/**=============================
 * @returns 今日の予約表示
 *=============================*/
export function useReserves_Week() {
	const {user} = useAuth();
	const {today} = useToday();
	const {weekend} = useWeekend()
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
			  where("reserved", "==", true),
			  where("date", "==", today && today),
			  orderBy("time", "asc")
			);
			const snapshot = await getDocs(q);
			if (snapshot.empty) {
			  setError(true);
			  return
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