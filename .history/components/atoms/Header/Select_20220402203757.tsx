import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
interface InputLabelProps {
  children?: React.ReactNode;
}

export default function InputLabelComponent(props: InputLabelProps) {
  return (
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
    >
      {props.children}
    </Select>
  );
}
