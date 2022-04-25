import {deleteDoc,doc,} from "firebase/firestore";
import { useAlert } from "../../useAlert";
import { db } from "../useFirebase";

export const useDeleteShift = () => {
	const {showErrorMessage,showSuccessMessage} = useAlert()
	const deleteShift = async(e:any,clickEvent,shiftId) => {
		e.stopPropagation()
		console.log("シフト削除")
		try {
            await deleteDoc(doc(db, "FreeSpace", shiftId)).then(() => {clickEvent;
				showSuccessMessage("シフトの削除に成功しました")
			});
        } catch (error) {
            console.log(error);
			showErrorMessage("シフトの削除に失敗しました")
        }
	}
	return{deleteShift}
}