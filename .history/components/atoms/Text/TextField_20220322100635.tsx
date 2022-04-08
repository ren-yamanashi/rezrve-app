import * as React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
const FieldTx = (props) => {
  return (
    <>
      <TextField
        margin="normal"
        sx={props.style}
        label={props.label}
        fullWidth
        onChange={props.changeEv}
      />
    </>
  );
};
export default FieldTx;
