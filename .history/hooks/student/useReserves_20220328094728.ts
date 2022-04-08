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
// create error state
export const errorState = atom({
	key:"err",
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
	
	async function loadRsv_date() {
	
		const snapshot = await getDocs(
			query(
				baseQuery(),
				where("reserved", "==", false),
				where("date", "==", timestamp(newDateTime)),
				orderBy("time", "asc")
			)
		)
		
		baseLoading2(snapshot);
	}
	useEffect(() => {
		if(!process.browser) {
			return;
		}
		if(user === null) {
			return;
		}
		loadRsv_date()
	},[process.browser,user])
	return {rsv2,loadRsv_date}
}