//空き枠の型
export interface ReserveList {
	id:string
	Teacher:string
	Student:string
	DayOfWeek:string
	DayOfWeekNumber:number
	WeekNumber:number
	Time:number
	Free:boolean;
}