//import notIn File
import { atom,useRecoilState } from 'recoil'
import { useEffect } from 'react'
import { Timestamp } from "firebase/firestore";
//import in File 
import { browser } from 'process';
import { useAuth } from '../useUserAuth';
//create state use atom
const initialDate : Timestamp = null
export const dateState = atom({
	key:"date",
	default:initialDate,
})

/**=============================
 * @returns 今日の日付 Timestamp型
 *=============================*/
export function useWeekend() {
	const [weekend,setWeekend] = useRecoilState(dateState)
	const {user} = useAuth()
	const timestamp = (datetimeStr: any) => {
		return Timestamp.fromDate(new Date(datetimeStr));
	};
	useEffect(() => {
		if (!process.browser) {
			return;
		  }
		if(user == null) {
			return
		}
		const newDate = new Date();
		const y = newDate.getFullYear();
		const m = newDate.getMonth();
		const d = newDate.getDate();
		const date = new Date(y, m, d + 7, 12, 0, 0);
		setWeekend(timestamp(date));
	},[process, browser, user]);
	return{weekend};
};