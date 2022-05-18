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
/**========= ShiftList newValue ========*/
export const useShiftList_newDate = () => {
	const {baseQuery,baseLoading,freeSpaces} = useFreeSpace();
	const {startLoading,completeLoading} = useLoading();
	const {newDateTime} = useDate()
	const {user} = useAuth();
	const { showErrorMessage } = useAlert()
	const loadFreeSpace_newValue = async(date) =>  {
		try {
			const snapshot = await getDocs(query(
				baseQuery(),
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
			setTimeout(() => completeLoading(),500)
		})
	},[user]);
	return {freeSpaces,loadFreeSpace_newValue}
}