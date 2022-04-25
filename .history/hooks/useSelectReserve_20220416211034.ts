import * as React from "react"
type rsvObject = {
	student: string;
	rsvStudent: string;
	teacher: string;
	id: string;
	date: string;
	rsvTime: number;
	time: number | string;
	teacherId: string;
	teacherName: string;
};

export const useSelectReserve = () => {
	const [rsvData, setRsvData] = React.useState<rsvObject>({
		student: "",
		rsvStudent: "",
		teacher: "",
		id: "",
		date: "",
		rsvTime: null,
		time: "",
		teacherId: "",
		teacherName: "",
	});
	const selectRsv = (id,teacher,student,time,date) => {
		setRsvData({...rsvData,id,teacher,student,time,date})
	}
	return { selectRsv ,rsvData};
}
