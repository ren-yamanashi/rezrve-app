import * as React from 'react'
import {
	collection,
	doc,
	query,
	where,
	getDocs,
	updateDoc,
	serverTimestamp,
} from "firebase/firestore";
import { useAlert } from "../../useAlert";
import { db,timestamp } from '../useFirebase';
/**======== Create hooks =======*/
export const useGetReserves = () => {
	const {showErrorMessage,showSuccessMessage} = useAlert()
	const  loadGetReserves = async (e:any,date,time,person,rsvId,reserverUid,handleClose) =>  {
		e.preventDefault();
		const q = query(
			collection(db, "FreeSpace"),
			where("date", "==", timestamp(date)),
			where("time", "==", time),
			where("person", "==", person)
		);
		try {
			const snapshot = await getDocs(q);
			if (snapshot.empty) {
			await updateDoc(doc(db, "FreeSpace", rsvId), {
			  person,
			  reserved: true,
			  reserverUid,
			  reserveAt: serverTimestamp(),
			}).then( () => {
			  handleClose;
			  showSuccessMessage("予約登録に成功しました")
			});
		  } else {
			showErrorMessage("同時間帯で既に予約済みです")
		  }
		} catch (error) {
			showErrorMessage("予約登録に失敗しました")
			console.error(error)
		}
	}
	return{loadGetReserves}
}
