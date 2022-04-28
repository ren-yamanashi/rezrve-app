//import notIn File
import { atom,useRecoilState } from 'recoil'
import * as React from "react"
import {
	collection,
	query,
	where,
	orderBy,
	getDocs,
  } from "firebase/firestore";
import { useRouter } from 'next/router';
//import in File 
import { FreeList } from '../../../models/FreeList';
import { useDate } from '../../date/useDate';
import { useAlert } from '../../useAlert';
import { db,timestamp } from '../useFirebase';
import { useLoading } from '../../useLoading';
import {Query} from "../../../models/router_query";

/**=== select date ====*/
export const useReserves_Date = () => {
	const router = useRouter();
	const pageQuery = router.query as Query 
	const {newDateTime} =useDate()
	const {showErrorMessage} = useAlert()
	const {startLoading,completeLoading} = useLoading()
	const [reserve,setReserve] = React.useState<FreeList[]>([])
	const loadRsv_date = async(dateTime,companyId) => {
		try {
			const snapshot = await getDocs(
				query(
					collection(db, "FreeSpace"),
					where("companyId","==",companyId),
					where("reserved", "==", false),
					where("date", "==", timestamp(dateTime)),
					orderBy("time", "asc")
				)
			)
			const gotRsv = snapshot.docs.map((doc) => {
				const reserve = doc.data() as FreeList
				reserve.id = doc.id
				return reserve
			})
			setReserve(gotRsv)
		} catch (error) {
			showErrorMessage("読み取りに失敗しました")
			console.error(error);
		}
	}
	React.useEffect(() => {
		if(pageQuery?.id == null) {
			return;
		} 
		startLoading();
		loadRsv_date(newDateTime,pageQuery?.id).then(() => {
			setTimeout(() => completeLoading(),500)
		})
	},[pageQuery?.id])
	return {reserve,loadRsv_date}
}