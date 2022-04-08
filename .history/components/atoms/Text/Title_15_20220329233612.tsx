import * as React from "react";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

const Title_15 = (props) => {
  return (
    <>
      <Typography
        fontSize={props.fontSize}
        component="div"
        color={props.color}
        textAlign="left"
        fontWeight={props.fontWeight}
      >
        {props.textTitle}
      </Typography>
    </>
  );
};

export default Title_15;
