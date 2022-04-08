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
	deleteDoc,
  } from "firebase/firestore";
//import in File 
import { User } from '../../../models/User';
import { FreeList } from '../../../models/FreeList';
import { useAuth } from '../../useUserAuth';
//create state use atom
const initialFreeSpace : FreeList[] = []
const initialError : boolean = false
export const SpaceState = atom({
	key:"rsv",
	default:initialFreeSpace,
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
//日付をTimeStamp型にして返す
const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
};
/**===================================
 * @returns Create Base hooks
 *===================================*/
export function useFreeSpace() {
	const {user} = useAuth();
	const [freeSpaces,setFreeSpaces] = useRecoilState(SpaceState)
	/**=========================
	 * @returns Create Base Query
	 *========================*/
	function baseQuery() {
		return query (
			collection(db, "FreeSpace"),
		)
	}
	function baseLoading(snapshot:QuerySnapshot<DocumentData>) {
		const gotFreeSpace = snapshot.docs.map((doc) => {
			const freeSpace = doc.data() as FreeList
			freeSpace.id = doc.id
			return freeSpace
		})
		setFreeSpaces(gotFreeSpace)
	}
	return {baseQuery,baseLoading,freeSpaces}
}
/**========================================
 * @returns today
 *========================================*/
export function useFreeSpace_Today() {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const [err,setErr] = useRecoilState(errState)
	const {user} = useAuth();
	async function loadFreeSpace() {
		setErr(false);
		const snapshot = await getDocs(query(
			baseQuery(),
			where("date","==",timestamp(today)),
			orderBy("time", "asc")))
		if (snapshot.empty) {
			setErr(true);
		}
		baseLoading(snapshot)
	}
	useEffect(() => {
		if (!process.browser) {
		  return;
		}
		if (user === null) {
		  return;
		}
		loadFreeSpace();
	  }, [process.browser, user]);
	return {freeSpaces,err,setErr,loadFreeSpace}
}
/**===============================
 * @returns newValue
 *===============================*/
export function useFreeSpace_newValue() {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const {err,setErr} = useFreeSpace_Today()
	async function loadFreeSpace_newValue(date) {
		setErr(false);
		const snapshot = await getDocs(query(
			baseQuery(),
			where("date", "==", timestamp(date)),
            orderBy("time", "asc")
		))
		if (snapshot.empty) {
			setErr(true);
		}
		baseLoading(snapshot)
	}
	// deleteShift
	async function deleteShift(e:any,id:string,date) {
		setErr(false);
		e.stopPropagation();
		await deleteDoc(doc(db, "FreeSpace", id)).then(async () => {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date", "==", timestamp(date)),
				orderBy("time", "asc")
			))
			if (snapshot.empty) {
				setErr(true);
			}
			baseLoading(snapshot)
		})
		
	}
	return {freeSpaces,err,loadFreeSpace_newValue,deleteShift}
}
/**=================================
 * @returns select Teacher
 *==================================*/
export function useSelectTeacher() {
	const {baseLoading,baseQuery,freeSpaces} = useFreeSpace();
	const {err,setErr} = useFreeSpace_Today()
	async function loadSelectTeacher(teacher,date) {
		setErr(false);
		const snapshot = await getDocs(query(
			baseQuery(),
			where("date","==",timestamp(date)),
			where("teacher","==",teacher),
			orderBy("time","asc")
		));
		if(snapshot.empty) {
			setErr(true);
		};
		baseLoading(snapshot);
	}
	return {freeSpaces,err,loadSelectTeacher}
}

/**================================
 * @returns ShiftList today
*===============================*/
export function useShiftList_today() {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const [error,setError] = useRecoilState(errState);
	const {user} = useAuth();
	async function loadFreeSpace() {
		setError(false);
		const snapshot = await getDocs(query(
			baseQuery(),
			where("reserved", "==", false),
			where("date", "==", timestamp(today)),
            orderBy("time", "asc")
		))
		if (snapshot.empty) {
			setError(true);
		}
		baseLoading(snapshot)
	}
	useEffect(() => {
		if (!process.browser) {
		  return;
		}
		if (user === null) {
		  return;
		}
		loadFreeSpace();
	  }, [process.browser, user]);
	return {freeSpaces,error,setError}
}
/**================================
 * @returns ShiftList newValue 
 *================================*/
export function useShiftList_newDate() {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const {error,setError} = useShiftList_today()
	async function loadFreeSpace_newValue(date) {
		setError(false);
		const snapshot = await getDocs(query(
			baseQuery(),
			where("reserved", "==", false),
			where("date", "==", timestamp(date)),
            orderBy("time", "asc")
		))
		if (snapshot.empty) {
			setError(true);
		}
		baseLoading(snapshot)
	}
	
	return {freeSpaces,error,loadFreeSpace_newValue}
}