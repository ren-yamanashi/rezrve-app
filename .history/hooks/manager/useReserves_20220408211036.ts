import { atom,useRecoilState } from 'recoil'
import { useEffect } from 'react'
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
	updateDoc,
	serverTimestamp,
  } from "firebase/firestore";
//import in File 
import { FreeList } from '../../models/FreeList';
import { useAuth } from '../useUserAuth';
import { toast } from 'react-toastify';
import { useHandle } from '../handle/useHandle';
import { useShiftList_newDate } from './shift/useShift';
import { useDate } from '../date/useDate';
import { useAlert } from '../alert/useAlert';
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
export const rsvState_week = atom({
	key:"rsv_week",
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
export const errorState = atom({
	key:"err",
	default:initialError,
})
export const errorState2 = atom({
	key:"err2",
	default:initialError,
})
export const loadRsvErrorState = atom({
	key:"loadRsvError",
	default:initialError
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

export function useReserves() {
	const [rsv,setRsv] = useRecoilState(rsvState)
	const [rsv_today,setRsv_today] = useRecoilState(rsvState_today);
	const [rsv_week,setRsv_week] = useRecoilState(rsvState_week)
	function baseQuery() {
		return query (
			collection(db, "FreeSpace"),
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
		setRsv_week(gotRsv)
	}
	return {baseQuery,baseLoading,rsv,rsv_today,rsv_week}
}
/**======== all =======*/
export function useReservesAll() {
	const {baseQuery,baseLoading,rsv} = useReserves()
	const {showErrorMessage} = useAlert()
	const {user} = useAuth();
	async function loadRsvAll() {
		try {
			const snapshot = await getDocs(query(baseQuery(),orderBy("time","asc")))
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage()
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
/**===== today ======*/
export function useReserves_Today() {
	const {baseQuery,baseLoading,rsv_today} = useReserves();
	const [error,setError] = useRecoilState(errorState)
	const {showErrorMessage} = useAlert()
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
			console.error(error);
			showErrorMessage()
			console.log("tesuto
			")
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
/**====== onesWeek ========*/
export function useReserves_Week() {
	const {baseQuery,baseLoading,rsv_week} = useReserves();
	const {showErrorMessage} = useAlert()
	const [error2,setError2] = useRecoilState(errorState2)
	const {user} = useAuth()
	async function loadRsv() {
		setError2(false);
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
		loadRsv();
	  }, [process.browser, user]);
	return {rsv_week,error2,setError2,loadRsv}
}
/**===== chancelRsv ======*/
export function useChancelRsv() {
	const {showErrorMessage} = useAlert()
    async function chancelRsv(e: any,id:string,loads,loads2?) {
		e.stopPropagation();
		try {
			await updateDoc(doc(db, "FreeSpace", id), {
				reserved: false,
				student: "",
				reserverUid: "",
			}).then(() => {
				toast.success("キャンセルしました", {
					position: "bottom-left",
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				  });
				loads;
				loads2;
			})
		} catch (error) {
			showErrorMessage()
			console.error(error);
		}
}
return {chancelRsv}
}

/**======== search student ========*/
export function useReserves_student() {
	const {baseQuery,baseLoading,rsv} = useReserves();
	const {showErrorMessage} = useAlert()
	const {error2,setError2} = useReserves_Week();
	async function loadRsvStudent(student:string) {
		setError2(false)
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
				setError2(true);
			}
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage()
		}
	}
	return {rsv,error2,setError2,loadRsvStudent}
}
/**====== search teacher ========*/
 export function useReserves_teacher() {
	const {baseQuery,baseLoading,rsv} = useReserves();
	const {showErrorMessage} = useAlert()
	const {error2,setError2} = useReserves_Week()
	async function loadRsvTeacher(teacher:string) {
		setError2(false)
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date",">=",timestamp(today)),
				where("date","<=",timestamp(today7)),
				where("student", "==", teacher),
				orderBy("date", "asc"),
				orderBy("time", "asc")
			))
			if (snapshot.empty) {
				setError2(true);
			}
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage()
		}
	}
	return {rsv,error2,setError2,loadRsvTeacher}
}
/**==== Get Reserves =====*/
export function useGetReserves() {
	const {baseQuery} = useReserves();
	const {loadRsv} = useReserves_Today()
	const {newDateTime} = useDate()
	const {handleClose2} = useHandle()
	const {loadFreeSpace_newValue} = useShiftList_newDate()
	async function getReserves(e,date,time,student,id) {
		e.preventDefault();
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date","==",date),
				where("time","==",time),
				where("student","==",student)
			))
			if(snapshot.empty) {
				await updateDoc(doc(db, "FreeSpace", id), {
					student: student,
					reserved: true,
					reserverUid: id,
					reserveAt: serverTimestamp(),
				}).then(() => {
					toast.success("予約を登録しました", {
						position: "bottom-left",
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					  });
					  handleClose2();
					  loadRsv().then(() => {
						loadFreeSpace_newValue(newDateTime)
					  })
				})
			}
		} catch (error) {
			console.error(error);
			toast.error("読み込みに失敗しました", {
				position: "bottom-left",
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			  });
		}
	}
	return { getReserves }
}
/**======== Schedule =======*/
export function useSchedule() {
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
	// create base hooks
	function baseQuery (dateTime) {
		return query(
			collection(db,"FreeSpace"),
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
	async function loadScheduleAll (newDate) {
		async function loadSchedule() {
			const snapshot = await getDocs((baseQuery(newDate)));
			baseLoading(snapshot,0)
		}
		async function loadSchedule10() {
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",10)))
			baseLoading(snapshot,10)
		}
		async function loadSchedule11() {
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",11)));
			baseLoading(snapshot,11)
		}
		async function loadSchedule12() {
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",12)));
			baseLoading(snapshot,12)
		}
		async function loadSchedule13() {
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",13)));
			baseLoading(snapshot,13)
		}
		async function loadSchedule14() {
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",14)));
			baseLoading(snapshot,14)
		}
		async function loadSchedule15() {
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",15)));
			baseLoading(snapshot,15)
		}
		async function loadSchedule16() {
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",16)));
			baseLoading(snapshot,16)
		}
		async function loadSchedule17() {
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",17)));
			baseLoading(snapshot,17)
		}
		async function loadSchedule18() {
			const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",18)));
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
		rsv,
		rsv10,
		rsv11,
		rsv12,
		rsv13,
		rsv14,
		rsv15,
		rsv16,
		rsv17,
		rsv18,
		loadScheduleAll
	}
}