import { Timestamp } from "firebase/firestore";
export type FreeList = {
	id:string
	teacher:string
	student:string
	course:string
	date:Timestamp
	time:number
	reserved:boolean;
	completed:boolean;
	createAt:Timestamp
	senderUid:string;
}