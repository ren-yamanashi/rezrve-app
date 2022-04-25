import { atom, useRecoilState } from "recoil";
import { useSchedule } from "../firebase/manager/useReserves";
import { useFreeSpace_newValue,useShiftList } from "../firebase/manager/useShift";
const initialDate: Date | null = new Date();
export const dateState = atom({
  key: "dateTime",
  default: initialDate,
});

export const useDate = () => {
  const [dateValue,setDateValue] = useRecoilState(dateState);
  const {loadFreeSpace} = useShiftList();
  const {loadScheduleAll} = useSchedule()
  const {loadFreeSpace_newValue} = useFreeSpace_newValue()
  const day = new Date(dateValue);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let newDateTime = new Date(y, m, d, 12, 0, 0);
  const today = new Date();
  const td_y = today.getFullYear();
  const td_m = today.getMonth();
  const td_d = today.getDate();
  const toDate = new Date(td_y,td_m,td_d,12,0,0)
  const changeDateValue = (newDateValue) => {
	  setDateValue(newDateValue)
  }
  
  return {changeDateValue,chgDate,newDateTime,dateValue,toDate};
}
