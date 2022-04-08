import { addDoc, collection, getDocs, getFirestore, query, serverTimestamp, Timestamp, where } from "firebase/firestore";
import { useAuth } from "../../../hooks/useUserAuth";
import { toast } from "react-toastify";
import { atom,useRecoilState } from 'recoil'
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
	const [err,setErr] = useRecoilState(errState)
	const {user} = useAuth()
	async function createShift(e,teacher,time,date) {
		setErr(false)
		const q = query(
			collection(db,"FreeSpace"),
			where("teacher","==",teacher),
			where("time","==",time),
			where("date","==",timestamp(date))
		)
		const snapshot = await getDocs(q);
		if(snapshot.empty) {
			e.preventDefault();
			await addDoc(collection(db,"FreeSpace"),{
				teacher: teacher,
                student: "",
                date: timestamp(date),
                reserved: false,
                completed: false,
                time,
                createAt: serverTimestamp(),
                senderUid: user.uid,
			}).then(() => {
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
		} else {
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
	return {createShift,err}
}