//予約の方
export interface ReserveList {
	id:string
	Teacher:string
	Student:string
	Course:string
	Time:number
	WeekNumber:number
	DayOfWeek:string
	DayOfWeekNumber:number
	More:string
	completed:boolean;
}