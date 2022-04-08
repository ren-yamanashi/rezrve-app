//import notIn File
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
import { FreeList } from '../../models/FreeList';
import { useAuth } from '../useUserAuth';
import { useDate } from '../date/useDate';
//create state use atom
const initialRsv : FreeList[] = []
const initialReserves : FreeList = null
const initialError : boolean = false
// create reserve state
export const rsvState = atom({
	key:"rsv",
	default:initialRsv,
})
export const rsvState2 = atom({
	key:"rsv2",
	default:initialRsv,
})
export const reservesState = atom({
	key:"reserves",
	default:initialReserves,
})
// create error state
export const errorState = atom({
	key:"err",
	default:initialError,
})
export const errorState2 = atom({
	key:"err2",
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
const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
};
/**===================================
 * @returns Create Base hooks
 *===================================*/
 export function useReserves() {
	const {user} = useAuth();
	const [rsv,setRsv] = useRecoilState(rsvState)
	const [rsv2,setRsv2] = useRecoilState(rsvState2)
	/**=========================
	 * @returns Create Base Query
	 *========================*/
	// reserved == true
	function baseQuery() {
		return query (
			collection(db, "FreeSpace"),
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
	function baseLoading2(snapshot:QuerySnapshot<DocumentData>) {
		const gotRsv = snapshot.docs.map((doc) => {
			const reserve = doc.data() as FreeList
			reserve.id = doc.id
			return reserve
		})
		setRsv2(gotRsv)
	}
	return {baseQuery,baseLoading,baseLoading2,rsv,rsv2}
}
/**=============
 * after today
 *============*/
export function useReserves_AfterToday() {
	const {user} = useAuth();
	const {rsv,baseLoading,baseQuery} =useReserves();
	const [error,setError] = useRecoilState(errorState);
	async function loadReserves_AfterToday() {
		setError(false);
		const snapshot = await getDocs(query(
		baseQuery(),
		where("student", "==", user.displayName),
		where("date", ">=", timestamp(today)),
        where("reserved", "==", true),
        orderBy("date", "desc"),
        orderBy("time", "asc"))
		);
		if(snapshot.empty) {
			setError(true);
		}
		baseLoading(snapshot);
	}
	useEffect(() => {
		if(!process.browser) {
			return;
		}
		if(user === null) {
			return;
		}
		loadReserves_AfterToday();
	},[process.browser,user]);
	return {rsv,error,loadReserves_AfterToday}
}
/**============
 * select date 
 *============*/
export function useReserves_Date() {
	const {user} = useAuth()
	const {dateValue,newDateTime} =useDate()
	const {rsv2,baseLoading2,baseQuery} = useReserves()
	const [error2,setError2] = useRecoilState(errorState2)
	async function loadRsv_date(dateTime) {
		setError2(false)
		const snapshot = await getDocs(
			query(
				baseQuery(),
				where("reserved", "==", false),
				where("date", "==", timestamp(dateTime)),
				orderBy("time", "asc")
			)
		)
		if(snapshot.empty) {
			setError2(true)
		}
		baseLoading2(snapshot);
	}
	useEffect(() => {
		if(!process.browser) {
			return;
		}
		if(user === null) {
			return;
		}
		loadRsv_date(today)
	},[process.browser,user])
	return {rsv2,loadRsv_date,error2}
}
/**================
 * select date and time
 *================*/
export function useReserves_dateTime() {
	const { user } = useAuth();
	const {dateValue,newDateTime} = useDate();
	const {rsv2,baseLoading2,baseQuery} = useReserves();
	const [error2,setError2] = useRecoilState(errorState2);
	async function loadRsv_dateTime (time) {
		setError2(false);
		const snapshot = await getDocs(
			query(
				baseQuery(),
				where("reserved", "==", false),
				where("date", "==", timestamp(newDateTime)),
				where("time", "==", time)
			)
		)
		if( snapshot.empty ) {
			setError2(true)
		}
		baseLoading2(snapshot)
	}
	return { rsv2,error2,loadRsv_dateTime }
}
/**=====================
 * queryId == reserveId
 *====================*/
export function useEditReserves_queryId() {
	const {user} = useAuth();
	const [editRsv,setEditRsv] = useRecoilState(reservesState);
	const reserveCollection = collection(db,"FreeSpace")
	async function loadReserves_queryId(queryId) {
		const reserveDoc = await getDoc(doc(reserveCollection, queryId)); 
		if (!reserveDoc.exists()) {
			return;
		}
		const gotReserve = reserveDoc.data() as FreeList;
        gotReserve.id = reserveDoc.id;
		setEditRsv(gotReserve);
	}
	return {loadReserves_queryId,editRsv}
}