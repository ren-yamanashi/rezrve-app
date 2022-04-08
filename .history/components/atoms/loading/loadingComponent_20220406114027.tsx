import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import ReactLoading from "react-loading";

const Loading = () => (
  <>
    <Box justifyContent="center" display={"flex"} my={"auto"}>
      <ReactLoading type={"bars"} color={blue[500]} height={100} width={100} />
    </Box>
  </>
);

export default Loading;
