import {getFirestore,deleteDoc,doc,} from "firebase/firestore";
import { toast } from "react-toastify";
/**==========================
 * @returns Create hooks
 *==========================*/
export function useDeleteShift() {
	const db = getFirestore()
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
        }
	}
	return{deleteShift}
}