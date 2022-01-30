import { Timestamp } from "firebase/firestore";
export type Chat = {
	createAt:Timestamp;
	message:string;
	senderId:string;
	userName:string;
}