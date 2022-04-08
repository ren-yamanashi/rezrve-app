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
// getFireStore 
const db = getFirestore()
/**==========================
 * @returns Create hooks
 *==========================*/
export function useGetReserves() {
	async function loadGetReserves (e:any,date,time,student,rsvId,studentId,handleClose) {
		e.preventDefault();
		const q = query(
			collection(db, "FreeSpace"),
			where("date", "==", date),
			where("time", "==", time),
			where("student", "==", student)
		);
		const snapshot = await getDocs(q);
		if (snapshot.empty) {
			await updateDoc(doc(db, "FreeSpace", rsvId), {
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
			toast.error("同時間で既に予約済みです",{
				position: "bottom-center",
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})
		  }
	}
	return{loadGetReserves}
}