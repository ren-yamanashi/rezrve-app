import { atom,useRecoilState } from 'recoil'
import { useEffect } from 'react'
import {
	collection,
	query,
	where,
	orderBy,
	getDocs,
	QuerySnapshot,
	DocumentData,
  } from "firebase/firestore";
//import in File 
import { FreeList } from '../../../models/FreeList';
import { useAuth } from '../useUserAuth';
import { useDate } from '../../date/useDate'; 
import { useAlert } from '../../useAlert';
import { db,timestamp } from '../useFirebase';
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

/**======== Create Base hooks =========*/
export const useFreeSpace = () => {
	const {user} = useAuth();
	const [freeSpaces,setFreeSpaces] = useRecoilState(SpaceState)
	const [loadFreeListError,setLoadFreeListError] = useRecoilState(loadErrorState)

	const baseQuery = () => {
		return query (
			collection(db, "FreeSpace"),
			where("senderUid", "==", user.uid),
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
	return {baseQuery,baseLoading,freeSpaces,loadFreeListError,setLoadFreeListError}
}
/**========= today ========*/
export const useFreeSpace_Today = () => {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const {showErrorMessage} = useAlert()
	const {newDateTime} = useDate()
	const [err,setErr] = useRecoilState(errState)
	const {user} = useAuth();
	const loadFreeSpace = async() => {
		setErr(false);
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
			showErrorMessage("読み取りに失敗しました")
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
	return {freeSpaces,err,loadFreeSpace}
}
/**========= newValue ===========*/
export const useFreeSpace_newValue = () => {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const [error,setError] = useRecoilState(errState);
	const {showErrorMessage} = useAlert()
    const loadFreeSpace_newValue = async(date) =>  {
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
			showErrorMessage("読み取りに失敗しました")
		}
		
	}
	return {freeSpaces,error,loadFreeSpace_newValue}
}
/**======== ShiftList today ==========*/
export const useShiftList_today = ()=> {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const [error,setError] = useRecoilState(errState);
	const {showErrorMessage} = useAlert()
	const {newDateTime} = useDate()
	const {user} = useAuth();
	 const loadFreeSpace = async() => {
		setError(false);
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date", "==", timestamp(newDateTime)),
				orderBy("time", "asc")
			))
			if (snapshot.empty) {
				setError(true);
			}
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	return {freeSpaces,error,loadFreeSpace}
}
/**========= ShiftList newValue ========*/
export const useShiftList_newDate = () => {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const [err,setErr] = useRecoilState(errState);
	const { showErrorMessage } = useAlert()
	const loadFreeSpace_newValue = async(date) =>  {
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
			showErrorMessage("読み取りに失敗しました")
		}
	}
	return {freeSpaces,err,loadFreeSpace_newValue}
}