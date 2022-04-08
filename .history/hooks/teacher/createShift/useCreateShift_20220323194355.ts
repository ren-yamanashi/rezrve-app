import { addDoc, collection, getDocs, getFirestore, query, serverTimestamp, where } from "firebase/firestore";
import { useAuth } from "../../../hooks/useUserAuth";

export function useCreateShift () {
	const db = getFirestore();
	const {user} = useAuth()
	async function createShift(e,teacher,time,date) {
		const q = query(
			collection(db,"FreeSpace"),
			where("teacher","==",teacher),
			where("time","==",time),
			where("date","==",date)
		)
		const snapshot = await getDocs(q);
		if(snapshot.empty) {
			e.preventDefault();
			await addDoc(collection(db,"FreeSpace"),{
				teacher: teacher,
        student: "",
        date: date,
        reserved: false,
        completed: false,
        time,
        createAt: serverTimestamp(),
        senderUid: user.uid,
			})
		}
	}
}