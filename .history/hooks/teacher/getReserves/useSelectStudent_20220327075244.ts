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
const initialStudent : string = "";
const initialStudentNum : string = "";
export const studentState = atom({
	key:"student",
	default:initialStudent
})
export const studentNumState = atom({
	key:"studentNumber",
	default:initialStudentNum
})
export function useSelectStudent() {
	const [student,setStudent] = useRecoilState(studentState);
	const [studentNum,setStudentNum] = useRecoilState(studentNumState);
	function setData(studentName,studentNumber) {
		setStudent(studentName);
		setStudentNum(studentNumber);
	}
	return{setData,student,studentNum}
}