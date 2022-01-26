//空き枠の型
export interface FreeList {
	id:string
	teacher:string
	student:string
	course:string
	dayOfWeek:string
	dayOfWeekNumber:number
	weekNumber:number
	time:number
	free:boolean;
	completed:boolean;
}