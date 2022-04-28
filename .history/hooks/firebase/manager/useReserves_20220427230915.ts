import { atom,atomFamily,useRecoilState } from 'recoil'
import * as React from "react";
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
import { Query } from '../../../models/router_query';
import { useRouter } from 'next/router';

//create state use atom
const initialRsv : FreeList[] = []
const initialError : boolean = false
export type RsvType = {
	rsv:FreeList[];
	error:boolean
}
// create reserve state
export const rsvState = atom({
	key:"rsv",
	default:initialRsv,
})
export const rsvState_today = atom({
	key:"rsv_today",
	default:initialRsv,
})
export const errorState = atom({
	key:"err",
	default:initialError,
})






export const rsvState_week = atom({
	key:"rsv_week",
	default:initialRsv,
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

export const reservesState = React.createContext<FreeList[]>([]);  
export const useReserves = () => {
	const [rsv,setRsv] = React.useState<FreeList[]>([])
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
	const loadRsvAll = async(companyId) =>  {
		try {
			const snapshot = await getDocs(query(baseQuery(),where("companyId","==",companyId),orderBy("time","asc")))
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
	const {baseQuery,baseLoading,rsv} = useReserves();
	const [error,setError] = useRecoilState(errorState)
	const {showErrorMessage} = useAlert()
	const router = useRouter();
	const pageQuery = router.query as Query
    const loadRsv = async(companyId) => {
		setError(false);
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("companyId","==",companyId),
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
	React.useEffect(() => {
		loadRsv(pageQuery.id)
	},[])
	return {rsv,error,loadRsv}
}
/**====== onesWeek ========*/
export const useReserves_Week = () => {
	const {baseQuery,baseLoading,rsv_week} = useReserves();
	const {showErrorMessage} = useAlert()
	const [error2,setError2] = useRecoilState(errorState2)
	const loadRsv = async(companyId) => {
		setError2(false);
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date",">=",timestamp(today)),
				where("date","<=",timestamp(today7)),
				where("companyId","==",companyId),
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

/**====== search teacher ========*/
 export const useReserves_teacher = () => {
	const {baseQuery,baseLoading,rsv_week,} = useReserves();
	const {showErrorMessage} = useAlert()
	const {error2,setError2} = useReserves_Week()
	const loadRsvTeacher = async(staff) => {
		setError2(false)
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date",">=",timestamp(today)),
				where("date","<=",timestamp(today7)),
				where("staff", "==", staff),
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
/**==== 予約登録 =====*/
export const useGetReserves = () => {
	const {baseQuery} = useReserves();
	const {showErrorMessage,showSuccessMessage} = useAlert()
	const {loadRsv} = useReserves_Today()
	const {newDateTime} = useDate()
	const {handleClose2} = useHandle()
	const {loadShift} = useShiftList_newDate()
	const getReserves = async(e,date,time,person,id,email?,phoneNumber?,reserver?,companyId?,) => {
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
					email,
					phoneNumber,
					reserver,
				}).then(() => {
					showSuccessMessage("予約登録に成功しました")
					  handleClose2();
					  loadRsv(companyId).then(() => {
						loadShift(newDateTime,companyId);
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