import { atom,useRecoilState } from 'recoil'
import * as React from "react"
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
import { useLoading } from '../../useLoading';
//create state use atom
const initialFreeSpace : FreeList[] = []
const initialError : boolean = false
export const SpaceState = atom({
	key:"rsv",
	default:initialFreeSpace,
})
export const errState = atom({
	key:"error",
	default:initialError,
})
export const loadErrorState = atom({
	key:"loadError",
	default:initialError,
})

/**======== Create Base hooks =========*/
export const useFreeSpace = () => {
	const {user} = useAuth();
	const [freeSpaces,setFreeSpaces] = React.useState<FreeList[]>([])
	const baseQuery = () => {
		return query (
			collection(db, "FreeSpace"),
			where("senderUid", "==", user.uid),
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

/**========= newValue ===========*/
export const useFreeSpace_newValue = () => {
	const {user} = useAuth();
	const {newDateTime} = useDate();
	const {startLoading,completeLoading} = useLoading();
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const {showErrorMessage} = useAlert()
    const loadFreeSpace_newValue = async(date) =>  {
		try {
			const snapshot = await getDocs(query(
			baseQuery(),
			where("reserved", "==", false),
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
		if(user == null) {
			return;
		}
		startLoading();
		loadFreeSpace_newValue(newDateTime).then(() => {
			setTimeout(() => completeLoading(),500);
		});
	},[user]);
	return {freeSpaces,loadFreeSpace_newValue}
}
/**======== ShiftList today ==========*/
export const useShiftList_today = ()=> {
	const {startLoading,completeLoading} = useLoading();
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const {showErrorMessage} = useAlert()
	const {newDateTime} = useDate()
	const {user} = useAuth();
	 const loadFreeSpace = async() => {
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date", "==", timestamp(newDateTime)),
				orderBy("time", "asc")
			))
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	React.useEffect(() => {
		if(user == null) {
			return;
		}
		startLoading();
		loadFreeSpace().then(() => {
			setTimeout(() => completeLoading(),500);
		});
	},[user]);
	return {freeSpaces,loadFreeSpace}
}
/**========= ShiftList newValue ========*/
export const useShiftList_newDate = () => {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const [err,setErr] = useRecoilState(errState);
	const { showErrorMessage } = useAlert()
	const loadFreeSpace_newValue = async(date) =>  {
		setErr(false);
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
				where("date", "==", timestamp(date)),
				orderBy("time", "asc")
			))
			if (snapshot.empty) {
				setErr(true);
			}
			baseLoading(snapshot)
		} catch (error) {
			console.error(error);
			showErrorMessage("読み取りに失敗しました")
		}
	}
	return {freeSpaces,err,loadFreeSpace_newValue}
}