//import notIn File
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
import { useAlert } from '../../useAlert';
import { db,timestamp } from '../useFirebase';

//create state use atom
const initialRsv : FreeList[] = []
const initialError : boolean = false
// create reserve state
export const rsvState = atom({
	key:"rsv",
	default:initialRsv,
})
export const rsvState_today = atom({
	key:"rsv_today",
	default:initialRsv,
})
// create error state
export const loadErrorState = atom({
	key:"loadError",
	default:initialError,
})
export const errorState = atom({
	key:"err",
	default:initialError,
})
export const errorState2 = atom({
	key:"err2",
	default:initialError,
})
export const errorState3 = atom({
	key:"err3",
	default:initialError,
})

const day = new Date();
const y = day.getFullYear();
const m = day.getMonth();
const d = day.getDate();
let today = new Date(y, m, d, 12, 0, 0);
let today7 = new Date(y, m, d + 7, 12, 0, 0);
/**======== Create Base hooks ===========*/
export const useReserves = () =>  {
	const {user} = useAuth();
	const [rsv,setRsv] = useRecoilState(rsvState)
	const [rsv_today,setRsv_today] = useRecoilState(rsvState_today)
	const [loadError,setLoadError] = useRecoilState(loadErrorState)
	// reserved == true
	const baseQuery = () => {
		return query (
			collection(db, "FreeSpace"),
			where("senderUid", "==", user.uid),
			where("reserved", "==", true),
		)
	}
	const baseLoading = (snapshot:QuerySnapshot<DocumentData>) => {
		const gotRsv = snapshot.docs.map((doc) => {
			const reserve = doc.data() as FreeList
			reserve.id = doc.id
			return reserve
		})
		setRsv(gotRsv)
		setRsv_today(gotRsv)
	}
	return {baseQuery,baseLoading,rsv,rsv_today,loadError,setLoadError}
}
/**========= all ==========*/
export const useReservesAll = () => {
	const {baseQuery,baseLoading,rsv} = useReserves()
	const {user} = useAuth();
	const {showErrorMessage} = useAlert()
	const loadRsvAll = async () => {
		try {
			const snapshot = await getDocs(query(baseQuery(),orderBy("time","asc")))
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	useEffect(() => {
		if(!process.browser) {
			return
		}
		if(user === null) {
			return
		}
		loadRsvAll()
	},[process.browser,user])
	return {rsv,loadRsvAll}
}
/**========= today =========*/
export const useReserves_Today = () => {
	const {baseQuery,baseLoading,rsv_today} = useReserves();
	const {showErrorMessage} = useAlert()
	const [error,setError] = useRecoilState(errorState)
	const {user} = useAuth();
	const loadRsv = async() => {
		setError(false);
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date","==",timestamp(today)),
				orderBy("time", "asc")))
			if (snapshot.empty) {
				setError(true);
			}
			baseLoading(snapshot)
		} catch (error) {
			showErrorMessage("読み取りに失敗しました")
			console.error(error);
		}
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
	return {rsv_today,error,loadRsv}
}
/**======== weekend ============*/
export const useReserves_Week = () => {
	const {baseQuery,baseLoading,rsv} = useReserves();
	const {setError3} = useReserves_student();
	const [error2,setError2] = useRecoilState(errorState2)
	const {user} = useAuth()
	const {showErrorMessage} = useAlert()
	const loadRsv = async() => {
		setError2(false);
		setError3(false);
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date",">=",timestamp(today)),
				where("date","<=",timestamp(today7)),
				orderBy("date", "asc"),
				orderBy("time", "asc")))
			if (snapshot.empty) {
				setError2(true);
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
		loadRsv();
	  }, [process.browser, user]);
	return {rsv,error2,loadRsv}
}
/**======== search student ============*/
export const useReserves_student = () => {
	const {baseQuery,baseLoading,rsv} = useReserves();
	const {showErrorMessage} = useAlert()
	const [error3,setError3] = useRecoilState(errorState3);
    const loadRsvStudent = async(student:string) => {
		setError3(false);
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("student", "==", student),
				where("date",">=",timestamp(today)),
				where("date","<=",timestamp(today7)),
				orderBy("date", "asc"),
				orderBy("time", "asc")
			))
			if (snapshot.empty) {
				setError3(true);
			}
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	return {rsv,error3,setError3,loadRsvStudent}
}