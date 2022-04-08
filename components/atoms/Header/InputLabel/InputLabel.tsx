import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
interface InputLabelProps {
  children?: React.ReactNode;
}

export default function InputLabelComponent(props: InputLabelProps) {
  return (
    <InputLabel id="demo-simple-select-standard-label">
      {props.children}
    </InputLabel>
  );
}
