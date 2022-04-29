import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { useHandle } from "../../useHandle";
import { useDate } from "../../date/useDate";
import { useAlert  } from "../../useAlert";
import { timestamp,db } from "../useFirebase"; 
import { useRouter } from "next/router";
// シフト登録
export const useCreateShift = () => {
	const router = useRouter();
	const {showErrorMessage,showSuccessMessage} = useAlert()
	const {handleClose3} = useHandle()
	const {newDateTime} = useDate();
	const createShift = async(e,staffName,time,id,companyId) => {
		const q = query(
			collection(db,"FreeSpace"),
			where("companyId","==",companyId),
			where("staff","==",staffName),
			where("time","==",time),
			where("date","==",timestamp(newDateTime))
		)
		const snapshot = await getDocs(q);
		if(snapshot.empty) {
			e.preventDefault();
			try {
				await addDoc(collection(db,"FreeSpace"),{
					staff: staffName,
					senderUid: id,
					person: "",
					date: timestamp(newDateTime),
					reserved: false,
					time:time,
					createAt: serverTimestamp(),
					companyId
				});
				handleClose3();
				showSuccessMessage("シフトを登録しました");
				setTimeout(() => router.reload(),500);
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