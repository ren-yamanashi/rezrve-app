import * as React from "react"
type rsvObject = {
	student: string;
	id: string;
	date: string;
	time: number | string;
	teacher: string;
};

export const useSelectReserve = () => {
	const [rsvData, setRsvData] = React.useState<rsvObject>({
		student: "",
		id: "",
		date: "",
		time: "",
		teacher: "",
	});
	const selectRsv = (id,teacher,student,time,date) => {
		setRsvData({...rsvData,id,teacher,student,time,date})
	}
	return { selectRsv,rsvData };
}
