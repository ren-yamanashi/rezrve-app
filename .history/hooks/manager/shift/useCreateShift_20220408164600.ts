import { addDoc, collection, getDocs, getFirestore, query, serverTimestamp, Timestamp, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { atom,useRecoilState } from 'recoil'
import { useHandle } from "../../handle/useHandle";
import { useDate } from "../../date/useDate";
import { useSchedule } from "../useReserves";
import { useAlert  } from "../../alert/useAlert";
const initialError : boolean = false
export const errState = atom({
	key:"error",
	default:initialError,
})
const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
};
export function useCreateShift () {
	const db = getFirestore();
	const {showErrorMessage} = useAlert()
	const {handleClose3} = useHandle()
	const {newDateTime} = useDate();
	const {loadScheduleAll} = useSchedule()
	async function createShift(e,teacher,time,loads,id) {
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
				}).then(() => {
					handleClose3()
					toast.success("シフトを登録しました", {
						position: "bottom-left",
						autoClose: 4000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					if(loads == 1 ) {
						loadScheduleAll(newDateTime)
					}
				})
			} catch (error) {
				console.log(error)
				
			}
		} else {
			handleClose3()
			toast.error("既に提出済みです", {
				position: "bottom-left",
				autoClose: 4000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	}
	return {createShift}
}