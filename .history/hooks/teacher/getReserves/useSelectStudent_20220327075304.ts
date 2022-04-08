import { atom,useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
const initialStudent : string = "";
const initialStudentNum : string = "";
export const studentState = atom({
	key:"student",
	default:initialStudent
});
export const studentNumState = atom({
	key:"studentNumber",
	default:initialStudentNum
});
export function useSelectStudent() {
	const [student,setStudent] = useRecoilState(studentState);
	const [studentNum,setStudentNum] = useRecoilState(studentNumState);
	function setData(studentName,studentNumber) {
		setStudent(studentName);
		setStudentNum(studentNumber);
	}
	return{setData,student,studentNum}
};