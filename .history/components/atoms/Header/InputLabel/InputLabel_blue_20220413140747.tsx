import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import { blue } from "@mui/material/colors";
interface InputLabelProps {
  children?: React.ReactNode;
}

const InputLabelComponent3 = (props: InputLabelProps) => {
  return (
    <InputLabel
      id="demo-simple-select-standard-label"
      sx={{ color: blue[500], fontSize: "13px" }}
    >
      {props.children}
    </InputLabel>
  );
};

export default InputLabelComponent3;
