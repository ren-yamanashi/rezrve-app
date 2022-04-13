import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
interface InputLabelProps {
  children?: React.ReactNode;
}

const InputLabelComponent2 = (props: InputLabelProps) => {
  return (
    <InputLabel
      id="demo-simple-select-standard-label"
      sx={{ color: "#e3f2fd", fontSize: "13px" }}
    >
      {props.children}
    </InputLabel>
  );
};

export default InputLabelComponent2;
