import { atom, useRecoilState } from "recoil";
import { useSchedule } from "../firebase/manager/useReserves";
import * as React  from "react";
import { useFreeSpace_newValue } from "../firebase/manager/useShift";
const initialDate: Date | null = new Date();
export const dateState = atom({
  key: "date",
  default: initialDate,
});

export const useDate = () => {
  const [dateValue,setDateValue] = useRecoilState(dateState);
  const {loadScheduleAll} = useSchedule();
  const {loadFreeSpace_newValue} = useFreeSpace_newValue();
  //入力された日付
  const day = new Date(dateValue);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let newDateTime = new Date(y, m, d, 12, 0, 0);
  //今日の日付
  const today = new Date();
  const td_y = today.getFullYear();
  const td_m = today.getMonth();
  const td_d = today.getDate();
  const toDate = new Date(td_y,td_m,td_d,12,0,0)
  // 1週間を表現
  let dayArr = {
    today: new Date(dateValue),
    dy: new Date(dateValue),
    dy2: new Date(dateValue),
    dy3: new Date(dateValue),
    dy4: new Date(dateValue),
    dy5: new Date(dateValue),
    dy6: new Date(dateValue),
    dy7: new Date(dateValue),
  };
  const dateArr = [
    { date: dayArr.today, number: 0 },
    { date: dayArr.dy, number: 1 },
    { date: dayArr.dy2, number: 2 },
    { date: dayArr.dy3, number: 3 },
    { date: dayArr.dy4, number: 4 },
    { date: dayArr.dy5, number: 5 },
    { date: dayArr.dy6, number: 6 },
  ];
  // 前の週　次の週を表現
  const xArr = [];
  const yArr = [];
  const zArr = [];
  // 1週間分同じ処理をさせる
  dateArr.map((item) => {
    item.date.setDate(item.date.getDate() + item.number);
    const y = item.date.getFullYear();
    const m = item.date.getMonth();
    const d = item.date.getDate();
    xArr.push(new Date(y, m, d, 12, 0, 0));
    yArr.push(new Date(y, m, d + 7, 12, 0));
    zArr.push(new Date(y, m, d - 7, 12, 0, 0));
  });
  //日付を変更させる関数
  const changeDateValue = (newDateValue) => {
	  setDateValue(newDateValue)
  }
  // 日付を変更させて、時間を合わせる。必要であれば処理も実行する
  const chgDate = (newDateValue) => {
    setDateValue(newDateValue);
    const day = new Date(newDateValue);
    const y = day.getFullYear();
    const m = day.getMonth();
    const d = day.getDate();
    let date = new Date(y,m,d,12,0,0);
    return date;
  }
  return {changeDateValue,chgDate,newDateTime,dateValue,toDate,dayArr,xArr,yArr,zArr,dateArr};
}