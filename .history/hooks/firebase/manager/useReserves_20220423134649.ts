import { atom,atomFamily,useRecoilState } from 'recoil'
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
	updateDoc,
	serverTimestamp,
  } from "firebase/firestore";
//import in File 
import { FreeList } from '../../../models/FreeList';
import { useAuth } from '../useUserAuth';
import { useHandle } from '../../useHandle';
import { useShiftList_newDate } from './useShift';
import { useDate } from '../../date/useDate';
import { useAlert } from '../../useAlert';
import {db,timestamp} from "../useFirebase";
import { useSelectStore } from '../user/useSelectStore';

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

// create date at timestamp set 12:00
const day = new Date();
const y = day.getFullYear();
const m = day.getMonth();
const d = day.getDate();
let today = new Date(y, m, d, 12, 0, 0);
let today7 = new Date(y, m, d + 7, 12, 0, 0);

export const useReserves = () => {
	const [rsv,setRsv] = useRecoilState(rsvState)
	const [rsv_today,setRsv_today] = useRecoilState(rsvState_today);
	const [rsv_week,setRsv_week] = useRecoilState(rsvState_week);
	const baseQuery = () => {
		return query (
			collection(db, "FreeSpace"),
			where("reserved", "==", true),
		)
	};
	
	const baseLoading = (snapshot:QuerySnapshot<DocumentData>) => {
		const gotRsv = snapshot.docs.map((doc) => {
			const reserve = doc.data() as FreeList
			reserve.id = doc.id
			return reserve
		})
		setRsv(gotRsv)
		setRsv_today(gotRsv)
		setRsv_week(gotRsv)
	};
	return {baseQuery,baseLoading,rsv,rsv_today,rsv_week}
}
/**======== all =======*/
export const useReservesAll = () => {
	const {baseQuery,baseLoading,rsv} = useReserves()
	const {showErrorMessage} = useAlert()
	const {user} = useAuth();
	const loadRsvAll = async() =>  {
		try {
			const snapshot = await getDocs(query(baseQuery(),orderBy("time","asc")))
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	return {rsv,loadRsvAll}
}
/**===== today ======*/
export const useReserves_Today = () => {
	const {baseQuery,baseLoading,rsv_today} = useReserves();
	const [error,setError] = useRecoilState(errorState)
	const {showErrorMessage} = useAlert()
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
	return {rsv_today,error,loadRsv}
}
/**====== onesWeek ========*/
export const useReserves_Week = () => {
	const {baseQuery,baseLoading,rsv_week} = useReserves();
	const {showErrorMessage} = useAlert()
	const [error2,setError2] = useRecoilState(errorState2)
	const loadRsv = async(teacher?) => {
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
			showErrorMessage("読み取りに失敗しました")
		}
	}
	return {rsv_week,error2,setError2,loadRsv}
}
/**===== chancelRsv ======*/
export const useChancelRsv = () => {
	const {showErrorMessage,showSuccessMessage} = useAlert()
    const chancelRsv = async(e: any,id:string,loads,loads2?) =>{
		e.stopPropagation();
		try {
			await updateDoc(doc(db, "FreeSpace", id), {
				reserved: false,
				student: "",
				reserverUid: "",
			}).then(() => {
				showSuccessMessage("予約をキャンセルしました")
				loads;
				loads2;
			})
		} catch (error) {
			showErrorMessage("読み取りに失敗しました")
			console.error(error);
		}
}
return {chancelRsv}
}

/**======== search student ========*/
export const useReserves_student = () => {
	const {baseQuery,baseLoading,rsv} = useReserves();
	const {showErrorMessage} = useAlert()
	const {error2,setError2} = useReserves_Week();
	const loadRsvStudent = async(student:string)  =>{
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
			showErrorMessage("読み取りしました")
		}
	}
	return {rsv,error2,setError2,loadRsvStudent}
}
/**====== search teacher ========*/
 export const useReserves_teacher = () => {
	const {baseQuery,baseLoading,rsv_week,} = useReserves();
	const {showErrorMessage} = useAlert()
	const {error2,setError2} = useReserves_Week()
	const loadRsvTeacher = async(teacher) => {
		setError2(false)
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date",">=",timestamp(today)),
				where("date","<=",timestamp(today7)),
				where("staff", "==", teacher),
				orderBy("date", "asc"),
				orderBy("time", "asc")
			));
			if (snapshot.empty) {
				setError2(true);
			}
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	return {rsv_week,error2,setError2,loadRsvTeacher}
}
/**==== Get Reserves =====*/
export const useGetReserves = () => {
	const {baseQuery} = useReserves();
	const {showErrorMessage,showSuccessMessage} = useAlert()
	const {loadRsv} = useReserves_Today()
	const {newDateTime} = useDate()
	const {handleClose2} = useHandle()
	const {loadShift} = useShiftList_newDate()
	const getReserves = async(e,date,time,person,id) => {
		e.preventDefault();
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date","==",date),
				where("time","==",time),
				where("person","==",person)
			))
			if(snapshot.empty) {
				await updateDoc(doc(db, "FreeSpace", id), {
					person,
					reserved: true,
					reserverUid: id,
					reserveAt: serverTimestamp(),
				}).then(() => {
					showSuccessMessage("予約登録に成功しました")
					  handleClose2();
					  loadRsv().then(() => {
						loadShift(newDateTime);
					  })
				})
			} else {
				showErrorMessage("既に同時間で予約済みです")
				handleClose2()
			}
		} catch (error) {
			console.error(error);
			
		}
	}
	return { getReserves }
}
/**======== Schedule =======*/
export const useSchedule = () => {
	const [rsv10,setRsv10] = useRecoilState(rsvState10);
	const [rsv11,setRsv11] = useRecoilState(rsvState11);
	const [rsv12,setRsv12] = useRecoilState(rsvState12)
	const [rsv13,setRsv13] = useRecoilState(rsvState13)
	const [rsv14,setRsv14] = useRecoilState(rsvState14)
	const [rsv15,setRsv15] = useRecoilState(rsvState15)
	const [rsv16,setRsv16] = useRecoilState(rsvState16)
	const [rsv17,setRsv17] = useRecoilState(rsvState17)
	const [rsv18,setRsv18] = useRecoilState(rsvState18)
	const {store} = useSelectStore();
	const rsvArr = [
		rsv10,
		rsv11,
		rsv12,
		rsv13,
		rsv14,
		rsv15,
		rsv16,
		rsv17,
		rsv18,
	];
	
	const [reserveList,setReserveList] = useState(
		[
			{rsv:[],number:1},
			{rsv:[],number:2},
			{rsv:[],number:3},
			{rsv:[],number:4},
			{rsv:[],number:5},
			{rsv:[],number:6},
			{rsv:[],number:7},
			{rsv:[],number:8},
			{rsv:[],number:9},
			{rsv:[],number:10},
			{rsv:[],number:11},
			{rsv:[],number:12},
			{rsv:[],number:13},
			{rsv:[],number:13},
			{rsv:[],number:14},
			{rsv:[],number:15},
			{rsv:[],number:16},
			{rsv:[],number:17},
			{rsv:[],number:18},
			{rsv:[],number:19},
			{rsv:[],number:20},
			{rsv:[],number:21},
			{rsv:[],number:22},
			{rsv:[],number:23},
			{rsv:[],number:24},
		]);
	const [reserve,setReserve] = useState<FreeList[]>([])

	const rsvLoad = (snapshot:QuerySnapshot<DocumentData>) => {
		const gotFreeList = snapshot.docs.map((doc) => {
			const rsv = doc.data() as FreeList;
			rsv.id = doc.id;
			return rsv
		})
		setReserve(gotFreeList);
	}
	
	// create base hooks
	const baseQuery = async(dateTime) => {
		return query(
			collection(db,"FreeSpace"),
			where("date","==",timestamp(dateTime))
		)
	}
	const baseLoading = (snapshot:QuerySnapshot<DocumentData>,number:number) =>{
		const gotFreeList = snapshot.docs.map((doc) => {
			const free = doc.data() as FreeList;
			free.id = doc.id;
			return free
		});
		number == 0 && setReserve(gotFreeList)
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
	const getReserveList = async(date,teacher) => {
		const snapshot = await getDocs(query(await baseQuery(date),where("teacher","==",teacher)));
		baseLoading(snapshot,0)
	};
	
    const loadScheduleAll = async(newDate) => {
		
		const loadSchedule10 = async() => {
			const snapshot = await getDocs(query( await baseQuery(newDate),where("time","==",10)))
			baseLoading(snapshot,10)
		}
		const loadSchedule11 = async() => {
			const snapshot = await getDocs(query( await baseQuery(newDate),where("time","==",11)));
			baseLoading(snapshot,11)
		}
		const loadSchedule12 = async() =>{
			const snapshot = await getDocs(query( await baseQuery(newDate),where("time","==",12)));
			baseLoading(snapshot,12)
		}
		const loadSchedule13 = async() =>{
			const snapshot = await getDocs(query( await baseQuery(newDate),where("time","==",13)));
			baseLoading(snapshot,13)
		}
		const loadSchedule14 = async() =>{
			const snapshot = await getDocs(query( await baseQuery(newDate),where("time","==",14)));
			baseLoading(snapshot,14)
		}
		const loadSchedule15 = async() =>{
			const snapshot = await getDocs(query( await baseQuery(newDate),where("time","==",15)));
			baseLoading(snapshot,15)
		}
		const loadSchedule16 = async() =>{
			const snapshot = await getDocs(query( await baseQuery(newDate),where("time","==",16)));
			baseLoading(snapshot,16)
		}
		const loadSchedule17 = async() =>{
			const snapshot = await getDocs(query( await baseQuery(newDate),where("time","==",17)));
			baseLoading(snapshot,17)
		}
		const loadSchedule18 = async() =>{
			const snapshot = await getDocs(query( await baseQuery(newDate),where("time","==",18)));
			baseLoading(snapshot,18)
		}
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
	return {rsvArr,loadScheduleAll,getReserveList,reserve}
}