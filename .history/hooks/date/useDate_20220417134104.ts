import { atom, useRecoilState } from "recoil";
import { useSchedule } from "../firebase/manager/useReserves";
import { useFreeSpace_newValue,useShiftList } from "../firebase/manager/useShift";
const initialDate: Date | null = new Date();
export const dateState = atom({
  key: "date",
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
  const chgDate = (newDateValue,number:number) => {
    changeDateValue(newDateValue);
    const day = new Date(newDateValue);
    const y = day.getFullYear();
    const m = day.getMonth();
    const d = day.getDate();
    let date = new Date(y,m,d,12,0,0);
    number == 1 && loadScheduleAll(date);
    number == 2 && loadFreeSpace_newValue(date);
    number == 3 && loadFreeSpace(date);
  }
  return {changeDateValue,chgDate,newDateTime,dateValue,toDate};
}
