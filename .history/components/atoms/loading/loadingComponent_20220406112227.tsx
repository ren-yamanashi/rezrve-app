import { blue } from "@mui/material/colors";
import React from "react";
import ReactLoading from "react-loading";

const Loading = () => (
  <ReactLoading type={"bars"} color={blue[500]} height={"20%"} width={"20%"} />
);

export default Loading;
