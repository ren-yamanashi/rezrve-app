import { Timestamp } from "firebase/firestore";
export type FreeList = {
	createAt:Timestamp;
	message:string;
	senderId:string;
	userName:string;
}