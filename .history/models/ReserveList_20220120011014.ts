import { Timestamp } from "firebase/firestore";
//予約の方
export interface ReserveList {
	id:string
	Teacher:string
	Student:string
	Time:Timestamp
	WeekAndDay:string
	More:string
}