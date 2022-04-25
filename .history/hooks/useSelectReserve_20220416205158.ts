import * as React from "react"
type rsvObject = {
	student: string;
	id: string;
	date: string;
	time: number | string;
	teacher: string;
};

export const useSelectReserve = () => {
	const [reserveData, setReserveData] = React.useState<rsvObject>({
		student: "",
		id: "",
		date: "",
		time: "",
		teacher: "",
	});
	const selectRsv = (id,teacher,student,time,date) => {
		setReserveData({...reserveData,id,teacher,student,time,date})
	}
	return { selectRsv,reserveData };
}
