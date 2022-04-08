import { atom,useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import {
	getFirestore,
	deleteDoc,
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

/**==========================
 * @returns Create hooks
 *==========================*/
export function useDeleteShift() {
	const db = getFirestore()
	async function deleteShift (e:any,clickEvent,shiftId) {
		e.stopPropagation()
		console.log("シフト削除")
		try {
            await deleteDoc(doc(db, "FreeSpace", shiftId)).then(
              () => clickEvent
            );
          } catch (error) {
            console.log(error);
          }
	}
	return{deleteShift}
}