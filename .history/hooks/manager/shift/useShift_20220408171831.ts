import { atom,useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import {
	getFirestore,
	collection,
	doc,
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
import { FreeList } from '../../../models/FreeList';
import { useAuth } from '../../useUserAuth';
import { useDate } from '../../date/useDate';
import {useAlert} from "../../alert/useAlert";
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
export const loadFsErrorState = atom({
	key:"loadFsError",
	default:initialError,
})
const db = getFirestore()
const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
};

export function useFreeSpace() {
	const [freeSpaces,setFreeSpaces] = useRecoilState(SpaceState)
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
/**====== today ==========*/
export function useFreeSpace_Today() {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const {showErrorMessage} = useAlert()
	const [err,setErr] = useRecoilState(errState)
	const {newDateTime} = useDate()
	const {user} = useAuth();
	async function loadFreeSpace() {
		setErr(false);
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date","==",timestamp(newDateTime)),
				orderBy("time", "asc")))
			if (snapshot.empty) {
				setErr(true);
			}
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage()
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
	return {freeSpaces,err,setErr,loadFreeSpace}
}
/**==== newValue ======*/
export function useFreeSpace_newValue() {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const {showErrorMessage} = useAlert()
	const {err,setErr} = useFreeSpace_Today()
	async function loadFreeSpace_newValue(date) {
		setErr(false);
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date", "==", timestamp(date)),
				orderBy("time", "asc")
			))
			if (snapshot.empty) {
				setErr(true);
			}
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage()
		}
	}
	// deleteShift
	async function deleteShift(e:any,id:string,date) {
		setErr(false);
		e.stopPropagation();
		try {
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
		} catch (error) {
			console.error(error);
			showErrorMessage()
		}
	}
	return {freeSpaces,err,loadFreeSpace_newValue,deleteShift}
}
/**===== select Teacher =======*/
export function useSelectTeacher() {
	const {baseLoading,baseQuery,freeSpaces} = useFreeSpace();
	const {showErrorMessage} = useAlert()
	const {err,setErr} = useFreeSpace_Today()
	async function loadSelectTeacher(teacher,date) {
		setErr(false);
		try {
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
		} catch (error) {
			console.error(error);
			showErrorMessage()
		}
	}
	return {freeSpaces,err,loadSelectTeacher}
}
/**===== ShiftList today =======*/
export function useShiftList_today() {
	const {newDateTime} = useDate()
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const {showErrorMessage} = useAlert()
	const [error,setError] = useRecoilState(errState);
	const {user} = useAuth();
	async function loadFreeSpace() {
		setError(false);
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("reserved", "==", false),
				where("date", "==", timestamp(newDateTime)),
				orderBy("time", "asc")
			))
			if (snapshot.empty) {
				setError(true);
			}
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage()
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
	return {freeSpaces,error,setError}
}
/**===== ShiftList newValue ======*/
export function useShiftList_newDate() {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const {showErrorMessage} = useAlert()
	const {error,setError} = useShiftList_today()
	async function loadFreeSpace_newValue(date) {
		setError(false);
		try {
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
			
		}
	}
	
	return {freeSpaces,error,loadFreeSpace_newValue}
}