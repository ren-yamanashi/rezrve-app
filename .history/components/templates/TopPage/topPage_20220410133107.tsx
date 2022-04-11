import React from "react";
import FirstView from "../../organisms/top/FirstView";
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";

const TopPage: React.FC = () => {
  return (
    <>
      <FirstView />
      <Box sx={{bgcolor:blue[500],width:"100%" }}
    </>
  );
};
export default TopPage;
