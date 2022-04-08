import * as React from "react";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

const PrimaryText = (props) => {
  return (
    <>
      <Typography
        variant="h5"
        component="div"
        textAlign="left"
        color={props.color}
        fontSize={props.size}
        mx={props.margin}
        sx={props.style}
      >
        {props.textTitle}
      </Typography>
    </>
  );
};

export default PrimaryText;
