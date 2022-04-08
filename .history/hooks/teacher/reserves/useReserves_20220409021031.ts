//import notIn File
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
import { useAlert } from '../../alert/useAlert';
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
export const rsvState0 = atom({
	key:"0",
	default:initialRsv,
})
export const rsvState10 = atom({
	key:"10",
	default:initialRsv,
})
export const rsvState11 = atom({
	key:"11",
	default:initialRsv,
})
export const rsvState12 = atom({
	key:"12",
	default:initialRsv,
})
export const rsvState13 = atom({
	key:"13",
	default:initialRsv,
})
export const rsvState14 = atom({
	key:"14",
	default:initialRsv,
})
export const rsvState15 = atom({
	key:"15",
	default:initialRsv,
})
export const rsvState16 = atom({
	key:"16",
	default:initialRsv,
})
export const rsvState17 = atom({
	key:"17",
	default:initialRsv,
})
export const rsvState18 = atom({
	key:"18",
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
export const errorState4 = atom({
	key:"err4",
	default:initialError,
})
export const errState = atom({
	key:"error",
	default:initialError,
})
export const errState10 = atom({
	key:"error10",
	default:initialError,
})
export const errState11 = atom({
	key:"error11",
	default:initialError,
})
export const errState12 = atom({
	key:"error12",
	default:initialError,
})
export const errState13 = atom({
	key:"error13",
	default:initialError,
})
export const errState14 = atom({
	key:"error14",
	default:initialError,
})
export const errState15 = atom({
	key:"error15",
	default:initialError,
})
export const errState16 = atom({
	key:"error16",
	default:initialError,
})
export const errState17 = atom({
	key:"error17",
	default:initialError,
})
export const errState18 = atom({
	key:"error18",
	default:initialError,
})
// getFireStore 
const db = getFirestore()
const day = new Date();
const y = day.getFullYear();
const m = day.getMonth();
const d = day.getDate();
let today = new Date(y, m, d, 12, 0, 0);
let today7 = new Date(y, m, d + 7, 12, 0, 0);
const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
};
/**======== Create Base hooks ===========*/
export function useReserves() {
	const {user} = useAuth();
	const [rsv,setRsv] = useRecoilState(rsvState)
	const [rsv_today,setRsv_today] = useRecoilState(rsvState_today)
	const [loadError,setLoadError] = useRecoilState(loadErrorState)
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
		setRsv_today(gotRsv)
	}
	return {baseQuery,baseLoading,rsv,rsv_today,loadError,setLoadError}
}
/**========= all ==========*/
export function useReservesAll() {
	const {baseQuery,baseLoading,rsv} = useReserves()
	const {user} = useAuth();
	const {showErrorMessage} = useAlert()
	async function loadRsvAll() {
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
export function useReserves_Today() {
	const {baseQuery,baseLoading,rsv_today} = useReserves();
	const {showErrorMessage} = useAlert()
	const [error,setError] = useRecoilState(errorState)
	const {user} = useAuth();
	async function loadRsv() {
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
export function useReserves_Week() {
	const {baseQuery,baseLoading,rsv} = useReserves();
	const {setError3} = useReserves_student();
	const [error2,setError2] = useRecoilState(errorState2)
	const {user} = useAuth()
	const {showErrorMessage} = useAlert()
	async function loadRsv() {
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
export function useReserves_student() {
	const {baseQuery,baseLoading,rsv} = useReserves();
	const {showErrorMessage} = useAlert()
	const [error3,setError3] = useRecoilState(errorState3);
	async function loadRsvStudent(student:string) {
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
/**========= Schedule =========*/
export function useSchedule() {
	const {user} = useAuth()
	const [rsv,setRsv] = useRecoilState(rsvState0)
	const [rsv10,setRsv10] = useRecoilState(rsvState10);
	const [rsv11,setRsv11] = useRecoilState(rsvState11);
	const [rsv12,setRsv12] = useRecoilState(rsvState12)
	const [rsv13,setRsv13] = useRecoilState(rsvState13)
	const [rsv14,setRsv14] = useRecoilState(rsvState14)
	const [rsv15,setRsv15] = useRecoilState(rsvState15)
	const [rsv16,setRsv16] = useRecoilState(rsvState16)
	const [rsv17,setRsv17] = useRecoilState(rsvState17)
	const [rsv18,setRsv18] = useRecoilState(rsvState18)
	const [error10,setError10] = useRecoilState(errState10);
	const [error11,setError11] = useRecoilState(errState11);
	const [error12,setError12] = useRecoilState(errState12)
	const [error13,setError13] = useRecoilState(errState13)
	const [error14,setError14] = useRecoilState(errState14)
	const [error15,setError15] = useRecoilState(errState15)
	const [error16,setError16] = useRecoilState(errState16)
	const [error17,setError17] = useRecoilState(errState17)
	const [error18,setError18] = useRecoilState(errState18)
	function baseQuery (dateTime) {
		return query(
			collection(db,"FreeSpace"),
			where("senderUid","==",user.uid),
			where("date","==",timestamp(dateTime))
		)
	}
	function baseLoading(snapshot:QuerySnapshot<DocumentData>,number:number) {
		const gotFreeList = snapshot.docs.map((doc) => {
			const free = doc.data() as FreeList;
			free.id = doc.id;
			return free
		})
		number == 0 && setRsv(gotFreeList) 
		number == 10 && setRsv10(gotFreeList)
		number == 11 && setRsv11(gotFreeList)
		number == 12 && setRsv12(gotFreeList)
		number == 13 && setRsv13(gotFreeList)
		number == 14 && setRsv14(gotFreeList)
		number == 15 && setRsv15(gotFreeList)
		number == 16 && setRsv16(gotFreeList)
		number == 17 && setRsv17(gotFreeList)
		number == 18 && setRsv18(gotFreeList)
	}
	async function loadScheduleAll(newDate) {
		async function loadSchedule() {
			const snapshot = await getDocs((baseQuery(newDate)));
			baseLoading(snapshot,0)
		}
		async function loadSchedule10() {
			setError10(false);
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",10)))
			if(snapshot.empty) {
				setError10(true);
			}
			baseLoading(snapshot,10)
		}
		async function loadSchedule11() {
			setError11(false);
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",11)));
			if(snapshot.empty) {
				setError11(true);
			}
			baseLoading(snapshot,11)
		}
		async function loadSchedule12() {
			setError12(false);
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",12)));
			if(snapshot.empty) {
				setError12(true);
			}
			baseLoading(snapshot,12)
		}
		async function loadSchedule13() {
			setError13(false);
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",13)));
			if(snapshot.empty) {
				setError13(true);
			}
			baseLoading(snapshot,13)
		}
		async function loadSchedule14() {
			setError14(false);
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",14)));
			if(snapshot.empty) {
				setError14(true);
			}
			baseLoading(snapshot,14)
		}
		async function loadSchedule15() {
			setError15(false);
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",15)));
			if(snapshot.empty) {
				setError15(true);
			}
			baseLoading(snapshot,15)
		}
		async function loadSchedule16() {
			setError16(false);
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",16)));
			if(snapshot.empty) {
				setError16(true);
			}
			baseLoading(snapshot,16)
		}
		async function loadSchedule17() {
			setError17(false);
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",17)));
			if(snapshot.empty) {
				setError17(true);
			}
			baseLoading(snapshot,17)
		}
		async function loadSchedule18() {
			setError18(false);
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",18)));
			if(snapshot.empty) {
				setError18(true);
			}
			baseLoading(snapshot,18)
		}
		loadSchedule();
		loadSchedule10();
		loadSchedule11();
		loadSchedule12();
		loadSchedule13();
		loadSchedule14();
		loadSchedule15();
		loadSchedule16();
		loadSchedule17();
		loadSchedule18();
	}
	return {
		loadScheduleAll,
		rsv,
		error10,rsv10,
		error11,rsv11,
		error12,rsv12,
		error13,rsv13,
		error14,rsv14,
		error15,rsv15,
		error16,rsv16,
		error17,rsv17,
		error18,rsv18,
	}
}