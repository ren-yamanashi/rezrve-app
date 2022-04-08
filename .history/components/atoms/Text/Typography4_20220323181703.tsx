import * as React from "react";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

const PrimaryText = (props) => {
  <Typography variant="h5" component="div" sx={props.style}>
    {props.textTitle}
  </Typography>;
};

export default PrimaryText;
