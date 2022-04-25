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
import { useDate } from '../../date/useDate';
import { useAlert } from '../../useAlert';
import { db,timestamp } from '../useFirebase';
//create state use atom
const initialRsv : FreeList[] = []
const initialReserves : FreeList = null
const initialError : boolean = false
// create reserve state
export const rsvState = atom({
	key:"rsv",
	default:initialRsv,
})
export const rsvState2 = atom({
	key:"rsv2",
	default:initialRsv,
})
export const reservesState = atom({
	key:"reserves",
	default:initialReserves,
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
	default:initialError,
})
/**======= Create Base hooks ========*/
 export const useReserves = () =>  {
	const [rsv,setRsv] = useRecoilState(rsvState)
	const [rsv2,setRsv2] = useRecoilState(rsvState2)
	const baseQuery = () => {
		return query (
			collection(db, "FreeSpace"),
		)
	}
	const baseLoading = (snapshot:QuerySnapshot<DocumentData>) => {
		const gotRsv = snapshot.docs.map((doc) => {
			const reserve = doc.data() as FreeList
			reserve.id = doc.id
			return reserve
		})
		setRsv(gotRsv)
	}
	const baseLoading2 = (snapshot:QuerySnapshot<DocumentData>) =>  {
		const gotRsv = snapshot.docs.map((doc) => {
			const reserve = doc.data() as FreeList
			reserve.id = doc.id
			return reserve
		})
		setRsv2(gotRsv)
	}
	return {baseQuery,baseLoading,baseLoading2,rsv,rsv2}
}
/**==== after today ====*/
export const useReserves_AfterToday = () => {
	const {user} = useAuth();
	const {rsv,baseLoading,baseQuery} =useReserves();
	const {toDate} = useDate()
	const [error,setError] = useRecoilState(errorState);
	const {showErrorMessage} = useAlert()
	const loadReserves_AfterToday = async() => {
		setError(false);
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("student", "==", user.displayName),
				where("date", ">=", timestamp(toDate)),
				where("reserved", "==", true),
				orderBy("date", "asc"),
				orderBy("time", "asc"))
				);
				if(snapshot.empty) {
					setError(true);
				}
				baseLoading(snapshot);
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	useEffect(() => {
		if(!process.browser) {
			return;
		}
		loadReserves_AfterToday();
	},[process.browser]);
	return {rsv,error,loadReserves_AfterToday}
}
/**=== select date ====*/
export const useReserves_Date = () => {
	const {user} = useAuth()
	const {newDateTime} =useDate()
	const {showErrorMessage} = useAlert()
	const {rsv2,baseLoading2,baseQuery} = useReserves()
	const [error2,setError2] = useRecoilState(errorState2)
	const loadRsv_date = async(dateTime) => {
		setError2(false)
		try {
			const snapshot = await getDocs(
				query(
					baseQuery(),
					where("reserved", "==", false),
					where("date", "==", timestamp(dateTime)),
					orderBy("time", "asc")
				)
			)
			if(snapshot.empty) {
				setError2(true)
			}
			baseLoading2(snapshot);
		} catch (error) {
			showErrorMessage("読み取りに失敗しました")
			console.error(error);
		}
		
	}
	useEffect(() => {
		if(!process.browser) {
			return;
		}
		loadRsv_date(newDateTime)
	},[process.browser])
	return {rsv2,loadRsv_date,error2}
}
/**====== select date and time =====*/
export const useReserves_dateTime =()=> {
	const {newDateTime} = useDate();
	const {rsv2,baseLoading2,baseQuery} = useReserves();
	const [error2,setError2] = useRecoilState(errorState2);
	const {showErrorMessage} = useAlert()
	const loadRsv_dateTime = async(time) => {
		setError2(false);
		try {
			const snapshot = await getDocs(
				query(
					baseQuery(),
					where("reserved", "==", false),
					where("date", "==", timestamp(newDateTime)),
					where("time", "==", time)
				)
			)
			if( snapshot.empty ) {
				setError2(true)
			}
			baseLoading2(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
		
	}
	return { rsv2,error2,loadRsv_dateTime }
}
