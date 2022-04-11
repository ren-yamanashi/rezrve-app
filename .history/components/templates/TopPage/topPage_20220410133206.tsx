import React from "react";
import FirstView from "../../organisms/top/FirstView";
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";

const TopPage: React.FC = () => {
  return (
    <>
      <Box sx={{ my: 5 }}>
        <FirstView />
      </Box>
      <Box sx={{ bgcolor: blue[500], width: "100%" }}>テキスト</Box>
    </>
  );
};
export default TopPage;
