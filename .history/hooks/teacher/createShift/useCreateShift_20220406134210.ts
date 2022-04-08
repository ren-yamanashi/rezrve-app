import { addDoc, collection, getDocs, getFirestore, query, serverTimestamp, Timestamp, where } from "firebase/firestore";
import { useAuth } from "../../../hooks/useUserAuth";
import { toast } from "react-toastify";
import { useHandle } from "../../handle/useHandle";
import { useDate } from "../../date/useDate";
import { useSchedule } from "../reserves/useReserves";
import { atom, useRecoilState } from "recoil";
const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
};
const initialError: boolean = false;
export const errState = atom({
  key: "error",
  default: initialError,
});
export function useCreateShift () {
	const db = getFirestore();
	const {user} = useAuth()
	const [createShiftError,setCreateShiftError] = useRecoilState(errState)
	const {handleClose3} = useHandle()
	const {
		loadScheduleAll
	  } = useSchedule();
	const {newDateTime} = useDate();
	async function createShift(e,teacher,time) {
		const q = query(
			collection(db,"FreeSpace"),
			where("teacher","==",teacher),
			where("time","==",time),
			where("date","==",timestamp(newDateTime))
		)
		const snapshot = await getDocs(q);
		if(snapshot.empty) {
			e.preventDefault();
			setCreateShiftError(false);
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
				})
			} catch (error) {
				console.log(error)
				setCreateShiftError(true);
			}
			finally{
				loadScheduleAll(newDateTime);
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
	return {createShift,createShiftError}
}