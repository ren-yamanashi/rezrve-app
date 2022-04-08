import * as React from 'react'
import {
	getFirestore,
	collection,
	doc,
	Timestamp,
	query,
	where,
	getDocs,
	updateDoc,
	serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { atom,useRecoilState } from 'recoil'
import { useAlert } from "../../../hooks/alert/useAlert";
const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
const initialError : boolean = false
export const errState = atom({
	key:"error",
	default:initialError,
})
/**======== Create hooks =======*/
export function useGetReserves() {
	const db = getFirestore()
	const {showErrorMessage,showSuccessMessage} = useAlert()
	async function loadGetReserves (e:any,date,time,student,rsvId,studentId,handleClose) {
		e.preventDefault();
		const q = query(
			collection(db, "FreeSpace"),
			where("date", "==", timestamp(date)),
			where("time", "==", time),
			where("student", "==", student)
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
			showErrorMessage("読み取りに失敗しました")
			console.error(error)
		}
	}
	return{loadGetReserves}
}
