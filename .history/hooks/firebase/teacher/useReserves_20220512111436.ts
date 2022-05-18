import {
	collection,
	query,
	where,
	orderBy,
	getDocs,
	QuerySnapshot,
	DocumentData,
  } from "firebase/firestore";
  import * as React from "react"
//import in File 
import { FreeList } from '../../../models/FreeList';
import { useAuth } from '../useUserAuth';
import { useAlert } from '../../useAlert';
import { db,timestamp } from '../useFirebase';
import { useLoading } from '../../useLoading';

const day = new Date();
const y = day.getFullYear();
const m = day.getMonth();
const d = day.getDate();
let today = new Date(y, m, d, 12, 0, 0);
let today7 = new Date(y, m, d + 7, 12, 0, 0);
/** =============================
 * @returns 基盤作成
 * =============================*/
export const useReserves = () =>  {
	const {user} = useAuth();
	const [reserve,setReserve] = React.useState<FreeList[]>([])
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
		setReserve(gotRsv)
	}
	return {baseQuery,baseLoading,reserve}
}
/** ======================
 * @returns 全件取得
 * =====================*/ 
export const useReservesAll = () => {
	const {baseQuery,baseLoading,reserve} = useReserves()
	const {user} = useAuth();
	const {showErrorMessage} = useAlert()
	const {startLoading,completeLoading} = useLoading();
	const loadRsvAll = async () => {
		try {
			const snapshot = await getDocs(query(baseQuery(),orderBy("time","asc")))
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	React.useEffect(() => {
		if(user === null) {
			return
		}
		startLoading();
		loadRsvAll().then(() => {
			setTimeout(() => completeLoading(),500)
		});
	},[user])
	return {reserve,loadRsvAll}
}
/** ======================
 * @returns 今日の予約
 * =====================*/ 
export const useReserves_Today = () => {
	const {baseQuery,baseLoading,reserve} = useReserves();
	const {showErrorMessage} = useAlert()
	const {startLoading,completeLoading} = useLoading();
	const {user} = useAuth();
	const loadRsv = async() => {
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date","==",timestamp(today)),
				orderBy("time", "asc")))
			baseLoading(snapshot)
		} catch (error) {
			showErrorMessage("読み取りに失敗しました")
			console.error(error);
		}
	}
	React.useEffect(() => {
		if(user == null) {
			return;
		}
		startLoading();
		loadRsv().then(() => {
			setTimeout(() => completeLoading(),500);
		});
	},[user])
	return {reserve,loadRsv}
}
/** ======================
 * @returns 1週間の予約
 * =====================*/ 
export const useReserves_Week = () => {
	const {baseQuery,baseLoading,reserve} = useReserves();
	const {user} = useAuth()
	const {showErrorMessage} = useAlert()
	const {startLoading,completeLoading} = useLoading();
	const loadRsv = async() => {
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date",">=",timestamp(today)),
				where("date","<=",timestamp(today7)),
				orderBy("date", "asc"),
				orderBy("time", "asc")))
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	React.useEffect(() => {
		if (user === null) {
		  return;
		}
		startLoading();
		loadRsv().then(() => {
			setTimeout(() => completeLoading(),500);
		})
	  }, [user]);
	return {reserve,loadRsv}
}