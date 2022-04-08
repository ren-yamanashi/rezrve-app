import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
interface InputLabelProps {
  children?: React.ReactNode;
}

export default function AppBarComponent(props: InputLabelProps) {
  return (
    <InputLabel id="demo-simple-select-standard-label">
      {props.children}
    </InputLabel>
  );
}
