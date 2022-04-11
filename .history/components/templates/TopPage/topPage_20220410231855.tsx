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

      <IntroductionPage />
      <PageTransition />
    </>
  );
};
export default TopPage;
