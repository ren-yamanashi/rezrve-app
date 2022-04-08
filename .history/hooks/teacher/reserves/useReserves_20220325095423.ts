//import notIn File
import { getAuth, onAuthStateChanged,sendPasswordResetEmail, signInAnonymously } from 'firebase/auth'
import { atom,useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
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
	QuerySnapshot,
	DocumentData,
  } from "firebase/firestore";
//import in File 
import { User } from '../../../models/User';
import { FreeList } from '../../../models/FreeList';
import { useAuth } from '../../useUserAuth';
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
// create date at timestamp set 12:00
const day = new Date();
const y = day.getFullYear();
const m = day.getMonth();
const d = day.getDate();
let today = new Date(y, m, d, 12, 0, 0);
let today7 = new Date(y, m, d + 7, 12, 0, 0);
const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
};
/**===================================
 * @returns Create Base hooks
 *===================================*/
export function useReserves() {
	const {user} = useAuth();
	const [rsv,setRsv] = useRecoilState(rsvState)
	/**=========================
	 * @returns Create Base Query
	 *========================*/
	// reserved == true
	function baseQuery() {
		return query (
			collection(db, "FreeSpace"),
			where("senderUid", "==", user.uid),
			where("reserved", "==", true),
		)
	}
	function baseQuery2(datetime) {
		return query(
			collection(db,"FreeSpace"),
			where("senderUid", "==", user.uid),
			where("date","==",timestamp(datetime))
		)
	}
	function baseQuery3(datetime,number:number) {
		return query(
			collection(db,"FreeSpace"),
			where("senderUid", "==", user.uid),
			where("date","==",timestamp(datetime)),
			where("time","==",number),
		)
	}
	function baseLoading(snapshot:QuerySnapshot<DocumentData>) {
		const gotRsv = snapshot.docs.map((doc) => {
			const reserve = doc.data() as FreeList
			reserve.id = doc.id
			return reserve
		})
		setRsv(gotRsv)
	}
	return {baseQuery,baseQuery2,baseQuery3,baseLoading,rsv}
}
/**========================================
 * @returns today
 *========================================*/
export function useReserves_Today() {
	const {baseQuery,baseLoading,rsv} = useReserves();
	const [error,setError] = useRecoilState(errState)
	const {user} = useAuth();
	async function loadRsv() {
		const snapshot = await getDocs(query(
			baseQuery(),
			where("date","==",timestamp(today)),
			orderBy("time", "asc")))
		if (snapshot.empty) {
			setError(true);
		}
		baseLoading(snapshot)
		setError(false);
	}
	useEffect(() => {
		if (!process.browser) {
		  return;
		}
		if (user === null) {
		  return;
		}
		loadRsv();
	  }, [process.browser, user]);
	return {rsv,error,loadRsv}
}
/**=============================
 * @returns weekend
 *=============================*/
export function useReserves_Week() {
	const {baseQuery,baseLoading,rsv} = useReserves();
	const [error,setError] = useRecoilState(errState)
	const {user} = useAuth()
	async function loadRsv() {
		const snapshot = await getDocs(query(
			baseQuery(),
			where("date",">=",timestamp(today)),
			where("date","<=",timestamp(today7)),
			orderBy("date", "asc"),
			orderBy("time", "asc")))
		if (snapshot.empty) {
			setError(true);
		}
		baseLoading(snapshot)
		setError(false);
	}
	useEffect(() => {
		if (!process.browser) {
		  return;
		}
		if (user === null) {
		  return;
		}
		loadRsv();
	  }, [process.browser, user]);
	return {rsv,error,loadRsv}
}
/**===============================
 * @returns search student
 *===============================*/
export function useReserves_student() {
	const {baseQuery,baseLoading,rsv} = useReserves();
	const [error,setError] = useRecoilState(errState);
	async function loadRsvStudent(student:string) {
		const snapshot = await getDocs(query(
			baseQuery(),
			where("student", "==", student),
			where("date",">=",timestamp(today)),
			where("date","<=",timestamp(today7)),
			orderBy("date", "asc"),
			orderBy("time", "asc")
		))
		if (snapshot.empty) {
			setError(true);
		}
		baseLoading(snapshot)
		setError(false);
	}
	return {rsv,error,loadRsvStudent}
}
/**================================
 * @returns Schedule
 *===============================*/
export function useSchedule() {
	const {baseQuery2,baseQuery3,baseLoading,rsv} = useReserves();
	const [rsv10,setRsv10] = useRecoilState(rsvState)
	const [rsv11,setRsv11] = useRecoilState(rsvState)
	const [rsv12,setRsv12] = useRecoilState(rsvState)
	const [rsv13,setRsv13] = useRecoilState(rsvState)
	const [rsv14,setRsv14] = useRecoilState(rsvState)
	const [rsv15,setRsv15] = useRecoilState(rsvState)
	const [rsv16,setRsv16] = useRecoilState(rsvState)
	const [rsv17,setRsv17] = useRecoilState(rsvState)
	const [rsv18,setRsv18] = useRecoilState(rsvState)
	const [errorNo10,setErrorNo10] = useRecoilState(errState);
	const [errorNo11,setErrorNo11] = useRecoilState(errState);
	const [errorNo12,setErrorNo12] = useRecoilState(errState);
	const [errorNo13,setErrorNo13] = useRecoilState(errState);
	const [errorNo14,setErrorNo14] = useRecoilState(errState);
	const [errorNo15,setErrorNo15] = useRecoilState(errState);
	const [errorNo16,setErrorNo16] = useRecoilState(errState);
	const [errorNo17,setErrorNo17] = useRecoilState(errState);
	const [errorNo18,setErrorNo18] = useRecoilState(errState);
	const {user} = useAuth()
	async function loadSchedule_today(date) {
		const snapshot = await getDocs(baseQuery2(date));
		baseLoading(snapshot);
	}
	async function loadSchedule_today10(date) {
		setErrorNo10(false)
		const snapshot = await getDocs(baseQuery3(date,10))
		if(snapshot.empty) {
			setErrorNo10(true)
		}
		baseLoading(snapshot);
		setRsv10(rsv)
	}
	async function loadSchedule_today11(date) {
		setErrorNo11(false)
		const snapshot = await getDocs(baseQuery3(date,11))
		if(snapshot.empty) {
			setErrorNo11(true)
		}
		baseLoading(snapshot);
		setRsv11(rsv)
	}
	async function loadSchedule_today12(date) {
		setErrorNo12(false)
		const snapshot = await getDocs(baseQuery3(date,12))
		if(snapshot.empty) {
			setErrorNo12(true)
		}
		baseLoading(snapshot);
		setRsv12(rsv)
	}
	async function loadSchedule_today13(date) {
		setErrorNo13(false)
		const snapshot = await getDocs(baseQuery3(date,13))
		if(snapshot.empty) {
			setErrorNo13(true)
		}
		baseLoading(snapshot);
		setRsv13(rsv)
	}
	async function loadSchedule_today14(date) {
		setErrorNo14(false)
		const snapshot = await getDocs(baseQuery3(date,14))
		if(snapshot.empty) {
			setErrorNo14(true)
		}
		baseLoading(snapshot);
		setRsv14(rsv)
	}
	async function loadSchedule_today15(date) {
		setErrorNo15(false)
		const snapshot = await getDocs(baseQuery3(date,15))
		if(snapshot.empty) {
			setErrorNo15(true)
		}
		baseLoading(snapshot);
		setRsv15(rsv)
	}
	async function loadSchedule_today16(date) {
		setErrorNo16(false)
		const snapshot = await getDocs(baseQuery3(date,16))
		if(snapshot.empty) {
			setErrorNo16(true)
		}
		baseLoading(snapshot);
		setRsv16(rsv)
	}
	async function loadSchedule_today17(date) {
		setErrorNo17(false)
		const snapshot = await getDocs(baseQuery3(date,17))
		if(snapshot.empty) {
			setErrorNo17(true)
		}
		baseLoading(snapshot);
		setRsv17(rsv)
	}
	async function loadSchedule_today18(date) {
		setErrorNo18(false)
		const snapshot = await getDocs(baseQuery3(date,18))
		if(snapshot.empty) {
			setErrorNo18(true)
		}
		baseLoading(snapshot);
		setRsv18(rsv)
	}
	useEffect(() => {
		if (!process.browser) {
			return;
		}
		if (user === null) {
			return;
		}
		loadSchedule_today(today);
		loadSchedule_today10(today);
		loadSchedule_today11(today);
		loadSchedule_today12(today);
		loadSchedule_today13(today);
		loadSchedule_today14(today);
		loadSchedule_today15(today);
		loadSchedule_today16(today);
		loadSchedule_today17(today);
		loadSchedule_today18(today);
	},[process.browser,user])
	return {
		rsv,rsv10,rsv11,rsv12,rsv13,rsv14,rsv15,rsv16,rsv17,rsv18,
		errorNo10,errorNo11,errorNo12,errorNo13,errorNo14,errorNo15,errorNo16,errorNo17,errorNo18,
		loadSchedule_today10,loadSchedule_today11,loadSchedule_today12,
		loadSchedule_today13,loadSchedule_today14,loadSchedule_today15,
		loadSchedule_today16,loadSchedule_today17,loadSchedule_today18
	}
}