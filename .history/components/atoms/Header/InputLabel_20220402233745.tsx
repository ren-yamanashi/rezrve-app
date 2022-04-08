import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
interface InputLabelProps {
  children?: React.ReactNode;
}

export default function InputLabelComponent(props: InputLabelProps, props2) {
  return (
    <InputLabel id="demo-simple-select-standard-label" sx={props2.color}>
      {props.children}
    </InputLabel>
  );
}
