import { atom,useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import {
	collection,
	doc,
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
import { useAuth } from '../useUserAuth';
import { useDate } from '../../date/useDate';
import {useAlert} from "../../useAlert";
import { timestamp,db } from "../useFirebase"; 
//create state use atom
const initialFreeSpace : FreeList[] = []
const initialError : boolean = false;
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

export const useFreeSpace = () => {
	const [freeSpaces,setFreeSpaces] = useRecoilState(SpaceState)
	const baseQuery = () => {
		return query (
			collection(db, "FreeSpace"),
		)
	}
	const baseLoading = (snapshot:QuerySnapshot<DocumentData>) => {
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
export const  useFreeSpace_Today = ()  => {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const {showErrorMessage} = useAlert()
	const [err,setErr] = useRecoilState(errState)
	const {newDateTime} = useDate()
	const loadFreeSpace = async() =>{
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
			showErrorMessage("読み取りに失敗しました")
		}
	}
	return {freeSpaces,err,setErr,loadFreeSpace}
}
/**==== newValue ======*/
export const useFreeSpace_newValue = () => {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const {showErrorMessage} = useAlert()
	const [err,setErr] = useRecoilState(errState)
	const loadFreeSpace_newValue = async(date,staff?) => {
		setErr(false);
		try {
			
			const snapshot = staff == undefined ? 
			await getDocs(query(
				baseQuery(),
				where("date", "==", timestamp(date)),
				orderBy("time", "asc")
			)) 
			: 
			await getDocs(query(
				baseQuery(),
				where("date", "==", timestamp(date)),
				where("staff","==",staff),
				orderBy("time", "asc")
			))
			if (snapshot.empty) {
				setErr(true);
			}
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
		console.log(staff);
	}
	// deleteShift
	const deleteShift = async (e:any,id:string,date) => {
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
			showErrorMessage("読み取りに失敗しました")
		}
	}
	return {freeSpaces,err,loadFreeSpace_newValue,deleteShift}
}
/**===== select Teacher =======*/
export const useSelectTeacher = ()  => {
	const {baseLoading,baseQuery,freeSpaces} = useFreeSpace();
	const {showErrorMessage} = useAlert()
	const {err,setErr} = useFreeSpace_Today()
	const loadSelectTeacher = async(date,staffName) => {
		setErr(false);
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date","==",timestamp(date)),
				orderBy("time","asc")
			));
			if(snapshot.empty) {
				setErr(true);
			};
			baseLoading(snapshot);
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	return {freeSpaces,err,loadSelectTeacher}
}

/**===== ShiftList newValue ======*/
export const useShiftList_newDate = () => {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const {showErrorMessage} = useAlert()
	const [error,setError] = useRecoilState(errState);
	const loadShift = async (date,staff?,companyId?)  => {
		setError(false);
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("companyId","==",companyId),
				where("reserved", "==", false),
				where("date", "==", timestamp(date)),
				orderBy("time", "asc")
			));
			console.log(snapshot)
			if (snapshot.empty) {
				setError(true);
			}
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました");
		}
	}
	
	return {freeSpaces,error,loadShift}
}