import * as React from "react";
import Button from "@mui/material/Button";
const PrimaryBtn = (props) => {
  return (
    <>
      <Button variant="contained" onClick={props.click} sx={props.style}>
        {props.title}
      </Button>
    </>
  );
};
export default PrimaryBtn;
