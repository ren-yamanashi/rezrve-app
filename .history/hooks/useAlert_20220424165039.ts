import * as React  from "react";
import { toast } from "react-toastify";

export const useAlert = () => {
  const showErrorMessage = (props) =>  {
	  toast.error(props, {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const showSuccessMessage = (props) => {
	  toast.success(props, {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return {showErrorMessage,showSuccessMessage};
};
