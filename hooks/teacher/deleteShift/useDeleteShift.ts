import {getFirestore,deleteDoc,doc,} from "firebase/firestore";
import { toast } from "react-toastify";
import { atom,useRecoilState } from 'recoil'
import { useAlert } from "../../alert/useAlert";
const initialError : boolean = false
export const errState = atom({
	key:"error",
	default:initialError,
})

export function useDeleteShift() {
	const db = getFirestore()
	const {showErrorMessage} = useAlert()
	async function deleteShift (e:any,clickEvent,shiftId) {
		e.stopPropagation()
		console.log("シフト削除")
		try {
            await deleteDoc(doc(db, "FreeSpace", shiftId)).then(() => {clickEvent;
				toast.success("シフトを削除しました", {
					position: "bottom-left",
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			});
        } catch (error) {
            console.log(error);
			showErrorMessage()
        }
	}
	return{deleteShift}
}