import { atom,useRecoilState } from 'recoil'
import { useEffect } from 'react'
import {
	getFirestore,
	collection,
	Timestamp,
	query,
	where,
	orderBy,
	getDocs,
	QuerySnapshot,
	DocumentData,
  } from "firebase/firestore";
//import in File 
import { FreeList } from '../../../models/FreeList';
import { useAuth } from '../../useUserAuth';
import { useDate } from '../../date/useDate'; 
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
export const loadErrorState = atom({
	key:"loadError",
	default:initialError,
})
// getFireStore 
const db = getFirestore()
const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
};
/**===================================
 * @returns Create Base hooks
 *===================================*/
export function useFreeSpace() {
	const {user} = useAuth();
	const [freeSpaces,setFreeSpaces] = useRecoilState(SpaceState)
	const [loadFreeListError,setLoadFreeListError] = useRecoilState(loadErrorState)
	/**=========================
	 * @returns Create Base Query
	 *========================*/
	function baseQuery() {
		return query (
			collection(db, "FreeSpace"),
			where("senderUid", "==", user.uid),
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
	return {baseQuery,baseLoading,freeSpaces,loadFreeListError,setLoadFreeListError}
}
/**========================================
 * @returns today
 *========================================*/
export function useFreeSpace_Today() {
	const {baseQuery,baseLoading,freeSpaces,loadFreeListError,setLoadFreeListError} = useFreeSpace();
	const {newDateTime} = useDate()
	const [err,setErr] = useRecoilState(errState)
	const {user} = useAuth();
	async function loadFreeSpace() {
		setErr(false);
		setLoadFreeListError(false)
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("reserved", "==", false),
				where("date","==",timestamp(newDateTime)),
				orderBy("time", "asc")))
			if (snapshot.empty) {
				setErr(true);
			}
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			setLoadFreeListError(true)
		}
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
	return {freeSpaces,err,loadFreeSpace,loadFreeListError}
}
/**===============================
 * @returns newValue
 *===============================*/
export function useFreeSpace_newValue() {
	const {baseQuery,baseLoading,freeSpaces,loadFreeListError,setLoadFreeListError} = useFreeSpace();
	const [error,setError] = useRecoilState(errState);
	async function loadFreeSpace_newValue(date) {
		setLoadFreeListError(false);
		try {
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
		} catch (error) {
			console.error(error);
			setLoadFreeListError(true);
		}
		
	}
	return {freeSpaces,error,loadFreeSpace_newValue,loadErrorState}
}
/**================================
 * @returns ShiftList today
*===============================*/
export function useShiftList_today() {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const [error,setError] = useRecoilState(errState);
	const {newDateTime} = useDate()
	const {user} = useAuth();
	async function loadFreeSpace() {
		setError(false);
		const snapshot = await getDocs(query(
			baseQuery(),
			where("date", "==", timestamp(newDateTime)),
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
	return {freeSpaces,error}
}
/**================================
 * @returns ShiftList newValue 
 *================================*/
export function useShiftList_newDate() {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const [err,setErr] = useRecoilState(errState);
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
	return {freeSpaces,err,loadFreeSpace_newValue}
}