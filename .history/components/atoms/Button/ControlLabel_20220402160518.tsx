import * as React from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
const FormControl = (props) => {
  return (
    <>
      <FormControlLabel
        control={<Radio />}
        label={`${props.time}:00`}
        checked={props.radio == props.time}
        onChange={props.clickRadio}
      />
    </>
  );
};
export default FormControl;
