import { SelectChangeEvent } from "@mui/material";
import dayjs from "dayjs";
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
	email?:string;
	senderUid:string;
	reserverUid:string,
	phoneNumber:string,
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
		email:"",
		senderUid:"",
		reserverUid:"",
		phoneNumber:""
	});
	// 生徒検索に使用
	const selectStudent = (e) => {
		setRsvData({ ...rsvData, student: e.target.value });
	  };
	  // シフト登録に使用
	  const handleChange = (event: SelectChangeEvent) => {
		setRsvData({ ...rsvData, time: event.target.value });
	  };
	  const handleChangeTime = (e) => {
		  setRsvData({...rsvData,time:e.value})
	  }
	  const selectTeacher = (item) => {
		setRsvData({
		  ...rsvData,
		  teacherName: item.userName,
		  teacherId: item.id,
		});
	  };
	  // 予約登録に使用
	  const selectRsv = (item) => {
		setRsvData({
		  ...rsvData,
		  id: item.id,
		  teacher: item.staff,
		  rsvStudent: item.person,
		  rsvTime: item.time,
		  date: `${dayjs(item.date.toDate()).format("YYYY/MM/DD ")} ${
			item.time
		  }:00~`,
		});
		console.log(rsvData.rsvStudent)
	  };
	// 予約確認に使用
	const selectReserve = (item) => {
		setRsvData({
			...rsvData,
            date: item.date,
            teacher: item.staff,
            rsvStudent: item.person,
            id: item.id,
			phoneNumber:item.phoneNumber,
			email:item.email
		})
	}
	const setEmail = (e) => {
		setRsvData({...rsvData, email: e.target.value })
	}
	return { selectRsv ,selectTeacher,handleChange,selectStudent,selectReserve,rsvData,setEmail,handleChangeTime};
}
