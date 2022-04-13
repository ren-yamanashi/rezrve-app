import { atom, useRecoilState } from "recoil";
import * as React from "react";
const initialTime: number = null;
export const timeState = atom({
  key: "time",
  default: initialTime,
});
export const useSelectTimeValue = () => {
  const [timeValue, setTimeValue] = useRecoilState(timeState);
  function setSortTime(timeNumber) {
    setTimeValue(timeNumber);
  }
  return { setSortTime, timeValue };
};
