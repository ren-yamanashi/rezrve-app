import React from "react";
import FirstView from "../../organisms/top/FirstView";
import IntroductionPage from "../../organisms/top/introduction";
import PageTransition from "../../organisms/top/PageTransition";
import Header from "../../templates/Header/Header4";
import { Box } from "@mui/system";
import Title_15 from "../../atoms/Text/Title_15";
import { blue } from "@mui/material/colors";

const TopPage: React.FC = () => {
  return (
    <>
      <Header />
      <FirstView />
      <Box display={"flex"} mx={"auto"} justifyContent={"center"} mt={3}>
        <Title_15
          fontSize={25}
          color={blue[500]}
          fontWeight={600}
          textTitle={"充実の機能を揃えた予約システム"}
          style={{ mb: 2 }}
        />
      </Box>
      <IntroductionPage />
      <PageTransition />
    </>
  );
};
export default TopPage;
