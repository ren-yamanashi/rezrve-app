import * as React from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
const PrimaryBtn = (props) => {
  return (
    <>
      <FormControlLabel
        control={<Radio />}
        label="12:00"
        checked={time == 12}
        onChange={() => {
          setTime(12);
        }}
      />
    </>
  );
};
export default PrimaryBtn;
