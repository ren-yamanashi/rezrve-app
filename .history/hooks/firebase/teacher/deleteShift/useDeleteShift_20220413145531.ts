import {getFirestore,deleteDoc,doc,} from "firebase/firestore";
import { atom,useRecoilState } from 'recoil'
import { useAlert } from "../../../alert/useAlert";
const initialError : boolean = false
export const errState = atom({
	key:"error",
	default:initialError,
})

export const useDeleteShift = () => {
	const db = getFirestore()
	const {showErrorMessage,showSuccessMessage} = useAlert()
	const deleteShift = async(e:any,clickEvent,shiftId) => {
		e.stopPropagation()
		console.log("シフト削除")
		try {
            await deleteDoc(doc(db, "FreeSpace", shiftId)).then(() => {clickEvent;
				showSuccessMessage("シフトの登録に成功しました")
			});
        } catch (error) {
            console.log(error);
			showErrorMessage("シフトの削除に失敗しました")
        }
	}
	return{deleteShift}
}