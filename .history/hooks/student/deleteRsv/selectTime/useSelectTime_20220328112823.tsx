import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
const initialTime: number = null;
export const timeState = atom({
  key: "time",
  default: initialTime,
});
export function useSelectTimeValue() {
  const [timeValue, setTimeValue] = useRecoilState(timeState);
  function setSortTime(timeNumber) {
    setTimeValue(timeNumber);
  }
  return { setSortTime, timeValue };
}
