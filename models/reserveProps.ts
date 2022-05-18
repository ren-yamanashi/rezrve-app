export type reserveProps = {
	companyId:string;
	id:string;
	staff:string;
	reserver?:string;
	date:Date;
	time:number;
	reserved:boolean;
	createAt:Date;
	senderUid:string;
	reserverUid?:string;
	email?:string;
	phoneNumber?:string;
}