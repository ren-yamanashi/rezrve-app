import { addDoc, collection, getDocs, getFirestore, query, serverTimestamp, where } from "firebase/firestore";
import { atom,useRecoilState } from 'recoil'
import { useHandle } from "../../../handle/useHandle";
import { useDate } from "../../../date/useDate";
import { useSchedule } from "../useReserves";
import { useAlert  } from "../../../alert/useAlert";
import { timestamp } from "../../useTimeStamp"; 
const initialError : boolean = false
export const errState = atom({
	key:"error",
	default:initialError,
});
export const useCreateShift = () => {
	const db = getFirestore();
	const {showErrorMessage,showSuccessMessage} = useAlert()
	const {handleClose3} = useHandle()
	const {newDateTime} = useDate();
	const {loadScheduleAll} = useSchedule()
	const createShift = async(e,teacher,time,loads,id) => {
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
					time:time,
					createAt: serverTimestamp(),
					senderUid: id,
				});
				handleClose3();
				showSuccessMessage("シフトを登録しました");
				if(loads == 1 ) {
					loadScheduleAll(newDateTime)
				};
			} catch (error) {
				console.log(error);
				showErrorMessage("読み取りに失敗しました");
			};
		} else {
			handleClose3();
			showErrorMessage("既に同時間で提出済みです");
		};
	};
	return {createShift};
}