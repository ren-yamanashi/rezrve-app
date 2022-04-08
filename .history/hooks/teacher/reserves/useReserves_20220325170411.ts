//import notIn File
import { getAuth, onAuthStateChanged,sendPasswordResetEmail, signInAnonymously } from 'firebase/auth'
import { atom,useRecoilState, useResetRecoilState } from 'recoil'
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
	function baseLoading(snapshot:QuerySnapshot<DocumentData>) {
		const gotRsv = snapshot.docs.map((doc) => {
			const reserve = doc.data() as FreeList
			reserve.id = doc.id
			return reserve
		})
		setRsv(gotRsv)
	}
	return {baseQuery,baseLoading,rsv}
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
	const {user} = useAuth()
	const [rsv,setRsv] = useRecoilState(rsvState)
	const [rsv10,setRsv10] = useRecoilState(rsvState);
	const [rsv11,setRsv11] = useRecoilState(rsvState);
	const [rsv12,setRsv12] = useRecoilState(rsvState)

	function baseQuery (dateTime) {
		return query(
			collection(db,"FreeSpace"),
			where("senderUid","==",user.uid),
			where("date","==",timestamp(dateTime))
		)
	}
	function baseLoading(snapshot:QuerySnapshot<DocumentData>,number) {
		const gotFreeList = snapshot.docs.map((doc) => {
			const free = doc.data() as FreeList;
			free.id = doc.id;
			return free
		})
		number== 0 && setRsv(gotFreeList)
		number== 10 && setRsv10(gotFreeList)
		number== 11 && setRsv11(gotFreeList)
		number== 12 && setRsv12(gotFreeList)
	}
	async function loadSchedule(newDate) {
		const snapshot = await getDocs((baseQuery(newDate)));
		baseLoading(snapshot,0);
	}
	async function loadSchedule10(newDate) {
		const snapshot = await getDocs((query(baseQuery(newDate),where("time","==",10))));
		baseLoading(snapshot,10)
	}
	return {loadSchedule,rsv,loadSchedule10,rsv10}
}