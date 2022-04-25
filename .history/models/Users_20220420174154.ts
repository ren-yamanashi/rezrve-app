export interface Users  {
    email:string;
	id:string;
	role:string;
	password:string;
	userName:string
	course:string
	url:string
	address?:string,
	companyId?:string,
	storeImageURL?:string,
	times?:Array<number>,

}