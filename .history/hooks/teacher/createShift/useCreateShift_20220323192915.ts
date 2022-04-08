import { collection, getFirestore, query, where } from "firebase/firestore";

export function useCreateShift () {
	const db = getFirestore();
	async function createShift(teacher,time,date) {
		const q = query(collection(db,"FreeSpace"),where("teacher","==",teacher),where("time","==",time),where("date","==",date))
	}
}