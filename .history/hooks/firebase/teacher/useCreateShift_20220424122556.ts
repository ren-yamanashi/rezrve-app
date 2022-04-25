import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { useAuth } from "../useUserAuth";
import { useHandle } from "../../useHandle";
import { useDate } from "../../date/useDate";
import { atom } from "recoil";
import { useAlert } from "../../useAlert";
import { db,timestamp } from "../useFirebase";
const initialError: boolean = false;
export const errState = atom({
  key: "error",
  default: initialError,
});
export const useCreateShift = () => {
	const {user} = useAuth()
	const {showErrorMessage,showSuccessMessage} = useAlert()
	const {handleClose3} = useHandle()
	const {newDateTime} = useDate();
	 const createShift = async(e,teacher,time) => {
		const q = query(
			collection(db,"FreeSpace"),
			where("teacher","==",teacher),
			where("time","==",time),
			where("date","==",timestamp(newDateTime))
		)
		const snapshot = await getDocs(q);
		if(snapshot.empty) {
			e.preventDefault();
			try {
				await addDoc(collection(db,"FreeSpace"),{
					teacher: teacher,
					student: "",
					date: timestamp(newDateTime),
					reserved: false,
					completed: false,
					time,
					createAt: serverTimestamp(),
					senderUid: user.uid,
				});
					handleClose3();
					showSuccessMessage("シフトを登録しました");
			} catch (error) {
				console.log(error)
				showErrorMessage("シフト登録に失敗しました")
			}
		} else {
			handleClose3()
			showErrorMessage("既に同時間で登録済みです")
		}
	}
	return {createShift}
}