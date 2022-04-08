import { addDoc, collection, getDocs, getFirestore, query, serverTimestamp, Timestamp, where } from "firebase/firestore";
import { useAuth } from "../../../hooks/useUserAuth";
import { toast } from "react-toastify";
import { atom,useRecoilState } from 'recoil'
import { useHandle } from "../../handle/useHandle";
import { useDate } from "../../date/useDate";
import { useSchedule } from "../reserves/useReserves";
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
	const {user} = useAuth()
	const {handleClose3} = useHandle()
	const {
		loadSchedule,
		loadSchedule10,
		loadSchedule11,
		loadSchedule12,
		loadSchedule13,
		loadSchedule14,
		loadSchedule15,
		loadSchedule16,
		loadSchedule17,
		loadSchedule18,
	  } = useSchedule();
	const {dateValue} = useDate();
	const day = new Date(dateValue);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let newDate = new Date(y, m, d, 12, 0, 0);
	
	async function createShift(e,teacher,time) {
		const q = query(
			collection(db,"FreeSpace"),
			where("teacher","==",teacher),
			where("time","==",time),
			where("date","==",timestamp(newDate))
		)
		const snapshot = await getDocs(q);
		if(snapshot.empty) {
			e.preventDefault();
			try {
				await addDoc(collection(db,"FreeSpace"),{
					teacher: teacher,
					student: "",
					date: timestamp(dateValue),
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
			}
			finally{
				loadSchedule(newDate);
      loadSchedule10(newDate);
      loadSchedule11(newDate);
      loadSchedule12(newDate);
      loadSchedule13(newDate);
      loadSchedule14(newDate);
      loadSchedule15(newDate);
      loadSchedule16(newDate);
      loadSchedule17(newDate);
      loadSchedule18(newDate);
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