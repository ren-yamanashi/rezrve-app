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
import { atom } from 'recoil'
import { useAlert } from "../../useAlert";
import { db,timestamp } from '../useFirebase';
const initialError : boolean = false
export const errState = atom({
	key:"error",
	default:initialError,
})
/**======== Create hooks =======*/
export const useGetReserves = () => {
	const {showErrorMessage,showSuccessMessage} = useAlert()
	const  loadGetReserves = async (e:any,date,time,student,rsvId,studentId,handleClose) =>  {
		e.preventDefault();
		const q = query(
			collection(db, "FreeSpace"),
			where("date", "==", timestamp(date)),
			where("time", "==", time),
			where("staff", "==", student)
		);
		try {
			const snapshot = await getDocs(q);
			if (snapshot.empty) {
			await updateDoc(doc(db, "FreeSpace", rsvId), {
			  student: student,
			  reserved: true,
			  reserverUid: studentId,
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
