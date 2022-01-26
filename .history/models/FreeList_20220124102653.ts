//空き枠の型
import { Timestamp } from "firebase/firestore";
export interface FreeList {
	id:string
	teacher:string
	student:string
	course:string
	date:string
	dayOfWeek:string
	dayOfWeekNumber:number
	weekNumber:number
	time:number
	reserved:boolean;
	completed:boolean;
	createAt:Timestamp
}