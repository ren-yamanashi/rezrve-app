import { atom, useRecoilState } from "recoil";
import * as React  from "react";
const initialAlert:boolean = false;
export const alertState = atom({
  key: "date",
  default: initialAlert,
});

export function useAlert() {
  const [showing,setShowing] = useRecoilState(alertState);
  async function showErrorMessage() {
	  setShowing(true);
	  setTimeout(() => setShowing(false),1000);
  }
  return {showing,showErrorMessage};
};
