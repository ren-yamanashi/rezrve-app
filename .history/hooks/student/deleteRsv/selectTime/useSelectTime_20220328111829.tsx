import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
const initialTime: number = null;
export const timeState = atom({
  key: "time",
  default: initialTime,
});
export function useSelectStudent() {
  const [time, setTime] = useRecoilState(timeState);
  function setSortTime(timeNumber) {
    setTime(timeNumber);
  }
  return { setSortTime, time };
}
