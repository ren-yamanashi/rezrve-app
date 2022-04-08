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
  async function showErrorMessage(props) {
	  toast.error(props.messageTitle, {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  async function showSuccessMessage(props) {
	  toast.success(props.messageTitle, {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return {errMsg,showErrorMessage,successMsg,showSuccessMessage};
};
