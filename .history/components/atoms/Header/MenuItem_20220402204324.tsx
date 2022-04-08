import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const SelectComponent = (props) => {
  return (
    <>
      <MenuItem>
        <Button onClick={props.clickEvent}>{props.buttonText}</Button>
      </MenuItem>
    </>
  );
};

export default SelectComponent;
