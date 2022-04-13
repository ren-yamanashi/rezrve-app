import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
interface InputLabelProps {
  children?: React.ReactNode;
}

const InputLabelComponent = (props: InputLabelProps) => {
  return (
    <InputLabel id="demo-simple-select-standard-label">
      {props.children}
    </InputLabel>
  );
};
export default InputLabelComponent;
