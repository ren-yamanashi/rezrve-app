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
	phoneNumber:number,
	reserver?:string,
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
		phoneNumber:0,
		reserver:"",
	});
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
		  email:item.email,
		  phoneNumber:item.phoneNumber,
		  teacher: item.staff,
		  rsvStudent: item.person,
		  rsvTime: item.time,
		  date: `${dayjs(item.date.toDate()).format("YYYY/MM/DD ")} ${
			item.time
		  }:00~`,
		  reserver:item.reserver
		});
	};
	const selectStudent = (e) => {
		setRsvData({ ...rsvData, student: e.target.value });
	};
	const setEmail = (e) => {
		setRsvData({...rsvData, email: e.target.value })
	}
	const setPhoneNumber = (e) => {
		setRsvData({...rsvData,phoneNumber:Number(e.target.value)})
	}
	return { selectRsv ,selectTeacher,handleChange,selectStudent,rsvData,setEmail,handleChangeTime,setPhoneNumber};
}
