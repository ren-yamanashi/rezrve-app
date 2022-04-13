import { atom, useRecoilState } from "recoil";
const initialId: string = "";
export const idState = atom({
  key: "id",
  default: initialId,
});
export const dateTimeState = atom({
	key: "dateTime",
	default: initialId,
  });
export const timeState = atom({
  key: "time",
  default: initialId,
});
export const useSetData_teachersRsv = () => {
  const [id,setId] = useRecoilState(idState);
  const [rsvTime,setRsvTime] = useRecoilState(timeState)
  const [rsvDate,setRsvDate] = useRecoilState(dateTimeState)
  const setData = (idString,value,time) => {
	setId(idString)
	setRsvDate(value)
  setRsvTime(time)
  }
  return {id,rsvDate,rsvTime,setData};
}