import { atom, useRecoilState } from "recoil";
import * as React  from "react";
const initialAlert:boolean = false;
export const errorState = atom({
  key: "error",
  default: initialAlert,
});
export const successState = atom({
	key:"success",
	default:initialAlert,
});

export function useAlert() {
  const [errMsg,setErrMsg] = useRecoilState(errorState);
  const [successMsg,setSuccessMsg] = useRecoilState(successState);
  async function showErrorMessage() {
	  setErrMsg(true);
	  setTimeout(() => setErrMsg(false),2000);
  }
  async function showSuccessMessage() {
	  setSuccessMsg(true);
	  setTimeout(() => setSuccessMsg(false),2000);
  }
  return {errMsg,showErrorMessage,successMsg,showSuccessMessage};
};
