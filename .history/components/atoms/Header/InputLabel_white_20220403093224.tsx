import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
interface InputLabelProps {
  children?: React.ReactNode;
}

export default function InputLabelComponent(props: InputLabelProps) {
  return (
    <InputLabel
      id="demo-simple-select-standard-label"
      sx={{ color: "#e3f2fd", fontSize: "13px" }}
    >
      {props.children}
    </InputLabel>
  );
}
