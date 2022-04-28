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
import { useHandle } from '../../useHandle';
import { useShiftList_newDate } from './useShift';
import { useDate } from '../../date/useDate';
import { useAlert } from '../../useAlert';
import {db,timestamp} from "../useFirebase";
import { Query } from '../../../models/router_query';
import { useRouter } from 'next/router';
import { useLoading } from '../../useLoading';

// create date at timestamp set 12:00
const day = new Date();
const y = day.getFullYear();
const m = day.getMonth();
const d = day.getDate();
let today = new Date(y, m, d, 12, 0, 0);
let today7 = new Date(y, m, d + 7, 12, 0, 0);

/** ========================
 * @returns ベース作成
 * ========================*/
export const useReserves = () => {
	const [reserve,setReserve] = React.useState<FreeList[]>([])
	const baseQuery = (companyId) => {
		return query (
			collection(db, "FreeSpace"),
			where("reserved", "==", true),
			where("companyId","==",companyId),
		)
	};
	const baseLoading = (snapshot:QuerySnapshot<DocumentData>) => {
		const gotRsv = snapshot.docs.map((doc) => {
			const reserve = doc.data() as FreeList
			reserve.id = doc.id
			return reserve
		})
		setReserve(gotRsv)
	};
	return {baseQuery,baseLoading,reserve}
}
/** =======================
 * @returns カレンダー
 * =======================*/
export const useReservesAll = () => {
	const {baseQuery,baseLoading,reserve} = useReserves();
	const {startLoading,completeLoading} = useLoading();
	const {showErrorMessage} = useAlert()
	const router = useRouter();
	const pageQuery = router.query as Query
	const loadRsvAll = async(companyId) =>  {
		try {
			const snapshot = await getDocs(query(baseQuery(companyId),orderBy("time","asc")))
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	React.useEffect(() => {
		if(pageQuery?.id == undefined) {
			return
		};
		startLoading();
		loadRsvAll(pageQuery?.id).then(() => {
			setTimeout(() => completeLoading(),500)
		})
	},[pageQuery?.id])
	return {reserve,loadRsvAll}
}

/** ==========================
 * @returns 今日の予約
 * ==========================*/
export const useReserves_Today = () => {
	const {baseQuery,baseLoading,reserve} = useReserves();
	const {startLoading,completeLoading} = useLoading();
	const {showErrorMessage} = useAlert()
	const [error,setError] = React.useState(false);
	const router = useRouter();
	const pageQuery = router.query as Query
    const loadRsv = async(companyId) => {
		try {
			const snapshot = await getDocs(query(
				baseQuery(companyId),
				where("date","==",timestamp(today)),
				orderBy("time", "asc")
			));
			if (snapshot.empty) {
				setError(true);
			};
			baseLoading(snapshot);
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	React.useEffect(() => {
		if(pageQuery?.id == undefined) {
			return
		};
		startLoading();
		loadRsv(pageQuery?.id).then(() => {
			setTimeout(() => completeLoading(),500);
		});
	},[])
	return {reserve,error,loadRsv}
}
/** ==========================
 * @returns 1週間の予約
 * ==========================*/
export const useReserves_Week = () => {
	const {baseQuery,baseLoading,reserve} = useReserves();
	const {showErrorMessage} = useAlert()
	const {startLoading,completeLoading} = useLoading();
	const [error,setError] = React.useState(false);
	const router = useRouter();
	const pageQuery = router.query as Query
	const loadRsv = async(companyId) => {
		try {
			const snapshot = await getDocs(query(
				baseQuery(companyId),
				where("date",">=",timestamp(today)),
				where("date","<=",timestamp(today7)),
				orderBy("date", "asc"),
				orderBy("time", "asc")
			))
			if (snapshot.empty) {
				setError(true);
			}
			baseLoading(snapshot);
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました");
		}
	}
	React.useEffect(() => {
		if(pageQuery?.id == undefined) {
			return
		};
		startLoading();
		loadRsv(pageQuery?.id).then(() => {
			setTimeout(() => completeLoading(),500);
		});
	},[])
	return {reserve,error,setError,loadRsv}
}

/**===== chancelRsv ======*/

/** ==========================
 * @returns 講師選択
 * ==========================*/
 export const useReserves_teacher = () => {
	const {baseQuery,baseLoading,reserve,} = useReserves();
	const {showErrorMessage} = useAlert()
	const [error,setError] = React.useState(false);
	const loadRsvTeacher = async(staff,companyId) => {
		setError(false)
		try {
			const snapshot = await getDocs(query(
				baseQuery(companyId),
				where("date",">=",timestamp(today)),
				where("date","<=",timestamp(today7)),
				where("staff", "==", staff),
				orderBy("date", "asc"),
				orderBy("time", "asc")
			));
			if (snapshot.empty) {
				setError(true);
			}
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	return {reserve,error,setError,loadRsvTeacher}
}

/** ==========================
 * @returns 予約登録
 * ==========================*/
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
				baseQuery(companyId),
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
/** ================================
 * @returns 予約キャンセル
 * ================================*/
export const useChancelRsv = () => {
	const {showErrorMessage,showSuccessMessage} = useAlert()
	const router = useRouter();
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
				setTimeout(() => router.reload(),500) 
			})
		} catch (error) {
			showErrorMessage("読み取りに失敗しました")
			console.error(error);
		}
	}
	return {chancelRsv}
}
