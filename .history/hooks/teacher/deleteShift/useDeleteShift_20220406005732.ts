import {getFirestore,deleteDoc,doc,} from "firebase/firestore";
import { toast } from "react-toastify";
import { atom,useRecoilState } from 'recoil'
const initialError : boolean = false
export const errState = atom({
	key:"error",
	default:initialError,
})
/**==========================
 * @returns Create hooks
 *==========================*/
export function useDeleteShift() {
	const db = getFirestore()
	const [deleteError,setDeleteError] = useRecoilState(errState);
	async function deleteShift (e:any,clickEvent,shiftId) {
		e.stopPropagation()
		setDeleteError(false);
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
			setDeleteError(true);
        }
	}
	return{deleteShift,deleteError}
}