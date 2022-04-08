import { atom,useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import {
	getFirestore,
	collection,
	doc,
	getDoc,
	setDoc,
	Timestamp,
	query,
	where,
	orderBy,
	getDocs,
	QuerySnapshot,
	DocumentData,
	updateDoc,
	serverTimestamp,
  } from "firebase/firestore";
  import { toast } from "react-toastify";
//import in File 
import { User } from '../../../models/User';
import { FreeList } from '../../../models/FreeList';
import { useAuth } from '../../useUserAuth';
//create state use atom
const initialFreeSpace : FreeList[] = []
const initialError : boolean = false
export const spaceState = atom({
	key:"rsv",
	default:initialFreeSpace,
})
export const errState = atom({
	key:"error",
	default:initialError,
})
// getFireStore 
const db = getFirestore()
// create date at timestamp set 12:00
const day = new Date();
const y = day.getFullYear();
const m = day.getMonth();
const d = day.getDate();
let today = new Date(y, m, d, 12, 0, 0);
//日付をTimeStamp型にして返す
const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
};
/**==========================
 * @returns Create hooks
 *==========================*/
export function useGetReserves() {
	const [freeSpace_get,setFreeSpace_get] = useRecoilState(spaceState)
	const [rsvError,setRsvError] = useRecoilState(errState)
	async function loadGetReserves (date,time,student,e:any,studentId,handleClose) {
		const q = query(
			collection(db, "FreeSpace"),
			where("date", "==", date),
			where("time", "==", time),
			where("student", "==", student)
		);
		const snapshot = await getDocs(q);
		if (snapshot.empty) {
			await updateDoc(doc(db, "FreeSpace", studentId), {
			  student: student,
			  reserved: true,
			  reserverUid: studentId,
			  reserveAt: serverTimestamp(),
			}).then( () => {
			  handleClose;
			  toast.success("予約を登録しました", {
				position: "bottom-left",
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			  });
			});
		  } else {
			toast.error("同時間で既に予約済みです")
		  }
	}
	return{loadGetReserves,rsvError}
}