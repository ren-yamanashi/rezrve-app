//import notIn File
import { getAuth, onAuthStateChanged,sendPasswordResetEmail, signInAnonymously } from 'firebase/auth'
import { atom,useRecoilState } from 'recoil'
import { useEffect } from 'react'
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
  } from "firebase/firestore";
//import in File 
import { browser } from 'process';

//create state use atom
const initialDate : Date = new Date()

export const dateState = atom({
	key:"date",
	default:initialDate,
})

// Create day setTime 12:00
const newDate = new Date();
const y = newDate.getFullYear();
const m = newDate.getMonth();
const d = newDate.getDate();
const today = new Date(y, m, d, 12, 0, 0);
const weekend = new Date(y,m,d+1,12,0,0)
const timestamp = (datetimeStr: any) => {
	return Timestamp.fromDate(new Date(datetimeStr));
};
// getFireStore 
const db = getFirestore()
/**=============================
 * @returns 今日の予約表示
 *=============================*/
export function useToday() {
	const [today,setToday] = useRecoilState(dateState)
	const newDate = new Date();
	const y = newDate.getFullYear();
const m = newDate.getMonth();
const d = newDate.getDate();
const date = new Date(y, m, d, 12, 0, 0);
}