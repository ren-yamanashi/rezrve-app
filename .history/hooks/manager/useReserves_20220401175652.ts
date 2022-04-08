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
	updateDoc,
	serverTimestamp,
  } from "firebase/firestore";
//import in File 
import { FreeList } from '../../models/FreeList';
import { useAuth } from '../useUserAuth';
import { toast } from 'react-toastify';
import { useHandle } from '../handle/useHandle';
//create state use atom
const initialRsv : FreeList[] = []
const initialError : boolean = false
// create reserve state
export const rsvState = atom({
	key:"rsv",
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
/**===================================
 * @returns Create Base hooks
 *===================================*/
export function useReserves() {
	const {user} = useAuth();
	const [rsv,setRsv] = useRecoilState(rsvState)
	/**=========================
	 * @returns Create Base Query
	 *========================*/
	// reserved == true
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
	}
	return {baseQuery,baseLoading,rsv}
}
/**=====================================
 * @returns all
 *=====================================*/
export function useReservesAll() {
	const {baseQuery,baseLoading,rsv} = useReserves()
	const {user} = useAuth();
	async function loadRsvAll() {
		const snapshot = await getDocs(query(baseQuery(),orderBy("time","asc")))
		baseLoading(snapshot)
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
	return {rsv}
}
/**========================================
 * @returns today
 *========================================*/
export function useReserves_Today() {
	const {baseQuery,baseLoading,rsv} = useReserves();
	const [error,setError] = useRecoilState(errorState)
	const {user} = useAuth();
	async function loadRsv() {
		setError(false);
		const snapshot = await getDocs(query(
			baseQuery(),
			where("date","==",timestamp(today)),
			orderBy("time", "asc")))
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
		loadRsv();
	  }, [process.browser, user]);
	return {rsv,error,loadRsv}
}
/**=============================
 * @returns onesWeek
 *=============================*/
export function useReserves_Week() {
	const {baseQuery,baseLoading,rsv} = useReserves();
	const [error2,setError2] = useRecoilState(errorState2)
	const {user} = useAuth()
	async function loadRsv() {
		setError2(false);
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
	return {rsv,error2,setError2,loadRsv}
}
/**=============================
 * @returns chancelRsv
 *=============================*/
export function useChancelRsv() {
    async function chancelRsv(e: any,id:string,loads) {
		e.stopPropagation();
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
			})
}
return {chancelRsv}
}

/**===============================
 * @returns search student
 *===============================*/
export function useReserves_student() {
	const {baseQuery,baseLoading,rsv} = useReserves();
	const {error2,setError2} = useReserves_Week();
	async function loadRsvStudent(student:string) {
		setError2(false)
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
	}
	return {rsv,error2,setError2,loadRsvStudent}
}
/**===============================
 * @returns search teacher
 *===============================*/
 export function useReserves_teacher() {
	const {baseQuery,baseLoading,rsv} = useReserves();
	const {error2,setError2} = useReserves_Week()
	async function loadRsvTeacher(teacher:string) {
		setError2(false)
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
	}
	return {rsv,error2,setError2,loadRsvTeacher}
}
/**===============================
 * Get Reserves
 *==============================*/
export function useGetReserves() {
	const {baseQuery} = useReserves();
	const {handleClose2} = useHandle()
	async function getReserves(e,date,time,student,id,loads) {
		e.preventDefault();
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
				  loads;
			})
		}
	}
	return { getReserves}
}
/**================================
 * @returns Schedule
 *===============================*/
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
	async function loadSchedule(newDate) {
		const snapshot = await getDocs((baseQuery(newDate)));
		baseLoading(snapshot,0)
	}
	async function loadSchedule10(newDate) {
		setError10(false);
		const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",10)))
		if(snapshot.empty) {
			setError10(true);
		}
		baseLoading(snapshot,10)
	}
	async function loadSchedule11(newDate) {
		setError11(false);
		const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",11)));
		if(snapshot.empty) {
			setError11(true);
		}
		baseLoading(snapshot,11)
	}
	async function loadSchedule12(newDate) {
		setError12(false);
		const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",12)));
		if(snapshot.empty) {
			setError12(true);
		}
		baseLoading(snapshot,12)
	}
	async function loadSchedule13(newDate) {
		setError13(false);
		const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",13)));
		if(snapshot.empty) {
			setError13(true);
		}
		baseLoading(snapshot,13)
	}
	async function loadSchedule14(newDate) {
		setError14(false);
		const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",14)));
		if(snapshot.empty) {
			setError14(true);
		}
		baseLoading(snapshot,14)
	}
	async function loadSchedule15(newDate) {
		setError15(false);
		const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",15)));
		if(snapshot.empty) {
			setError15(true);
		}
		baseLoading(snapshot,15)
	}
	async function loadSchedule16(newDate) {
		setError16(false);
		const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",16)));
		if(snapshot.empty) {
			setError16(true);
		}
		baseLoading(snapshot,16)
	}
	async function loadSchedule17(newDate) {
		setError17(false);
		const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",17)));
		if(snapshot.empty) {
			setError17(true);
		}
		baseLoading(snapshot,17)
	}
	async function loadSchedule18(newDate) {
		setError18(false);
		const snapshot = await getDocs(query(baseQuery(newDate),where("time","==",18)));
		if(snapshot.empty) {
			setError18(true);
		}
		baseLoading(snapshot,18)
	}
	useEffect(() => {
		if (!process.browser) {
			return;
		  }
		  if (user === null) {
			return;
		  }
		  loadSchedule(today);
    loadSchedule10(today);
    loadSchedule11(today);
    loadSchedule12(today);
    loadSchedule13(today);
    loadSchedule14(today);
    loadSchedule15(today);
    loadSchedule16(today);
    loadSchedule17(today);
    loadSchedule18(today);
	},[process.browser, user])
	return {
		loadSchedule,rsv,
		error10,loadSchedule10,rsv10,
		error11,loadSchedule11,rsv11,
		error12,loadSchedule12,rsv12,
		error13,loadSchedule13,rsv13,
		error14,loadSchedule14,rsv14,
		error15,loadSchedule15,rsv15,
		error16,loadSchedule16,rsv16,
		error17,loadSchedule17,rsv17,
		error18,loadSchedule18,rsv18,
	}
}