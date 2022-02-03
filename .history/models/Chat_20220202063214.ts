import { Timestamp } from "firebase/firestore";
export type Chat = {
	id:string;
	createAt:Timestamp;
	message:string;
	senderId:string;
	userName:string;
	photoURL:string;
	likeCount:number;
	likeUsersId:string[]
}
export interface LikedUser {
	id:string;
	createTime:Timestamp
}