import { atom, useRecoilState } from "recoil";
import * as React  from "react";
import { toast } from "react-toastify";
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
	  toast.error("既に提出済みです", {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  async function showSuccessMessage() {
	  setSuccessMsg(true);
	  setTimeout(() => setSuccessMsg(false),2000);
  }
  return {errMsg,showErrorMessage,successMsg,showSuccessMessage};
};
