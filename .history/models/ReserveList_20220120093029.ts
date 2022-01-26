import { Timestamp } from "firebase/firestore";
//予約の方
export interface ReserveList {
	id:number
	Teacher:string
	Student:string
	Time:Timestamp
	WeekNumber:number
	WeekDay:string
	More:string
	completed:boolean;
}