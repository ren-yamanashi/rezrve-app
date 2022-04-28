import { atom,useRecoilState } from 'recoil'
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
	deleteDoc,
  } from "firebase/firestore";
//import in File 
import { FreeList } from '../../../models/FreeList';
import { useAuth } from '../useUserAuth';
import { useDate } from '../../date/useDate';
import {useAlert} from "../../useAlert";
import { timestamp,db } from "../useFirebase"; 
import { Query } from '../../../models/router_query';
import { useRouter } from 'next/router';
import { useLoading } from '../../useLoading';

const initialError : boolean = false;
export const errState = atom({
	key:"error",
	default:initialError,
})
export const loadFsErrorState = atom({
	key:"loadFsError",
	default:initialError,
})

/** =========================
 * @returns 基盤作成
 * =========================*/
export const useFreeSpace = () => {
	const [freeSpaces,setFreeSpaces] = React.useState<FreeList[]>([])
	const baseQuery = (companyId) => {
		return query (
			collection(db, "FreeSpace"),
			where("companyId","==",companyId),
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
	return {baseQuery,baseLoading,freeSpaces}
}

/** =============================
 * @returns 指定日のシフト
 * =============================*/
export const useFreeSpace_newValue = () => {
	const router = useRouter();
	const pageQuery = router.query as Query;
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const {showErrorMessage} = useAlert()
	const {newDateTime} = useDate();
	const {startLoading,completeLoading} = useLoading();
	const loadFreeSpace_newValue = async(date,companyId) => {
		try {
			const snapshot = await getDocs(query(
				baseQuery(companyId),
				where("date", "==", timestamp(date)),
				orderBy("time", "asc")
			)) 
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	React.useEffect(() => {
		if(pageQuery?.id == undefined) {
			return;
		}
		startLoading();
		loadFreeSpace_newValue(newDateTime,pageQuery?.id).then(() => {
			setTimeout(() => completeLoading(),500);
		})
	},[pageQuery?.id]);
	// deleteShift
	
	return {freeSpaces,loadFreeSpace_newValue,deleteShift}
}

/**===== ShiftList newValue ======*/
export const useShiftList_newDate = () => {
	const router = useRouter();
	const pageQuery = router.query as Query
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const {showErrorMessage} = useAlert()
	const {startLoading,completeLoading} = useLoading();
	const {newDateTime} = useDate();
	const loadShift = async (date,companyId)  => {
		try {
			const snapshot = await getDocs(query(
				baseQuery(companyId),
				where("reserved", "==", false),
				where("date", "==", timestamp(date)),
				orderBy("time", "asc")
			));
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました");
		}
	}
	React.useEffect(() => {
		if(pageQuery?.id == undefined) {
			return;
		}
		startLoading();
		loadShift(newDateTime,pageQuery?.id).then(() => {
			setTimeout(() => completeLoading(),500);
		})
	},[pageQuery?.id]);
	return {freeSpaces,loadShift}
}

/** ============================
 * @returns FreeSpaceドキュメント削除
 * ============================*/
export const useDeleteFreeSpace = () => {
	const {showErrorMessage} = useAlert();
	const deleteShift = async (e:any,id:string) => {
		e.stopPropagation();
		try {
			await deleteDoc(doc(db, "FreeSpace", id))
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	return {deleteShift}
}