import React from "react";
import FirstView from "../../organisms/top/FirstView";
import IntroductionPage from "../../organisms/top/Introduction";
import PageTransition from "../../organisms/top/PageTransition";
import Header from "../../templates/Header/Header4";
import { Box } from "@mui/system";
import Title_15 from "../../atoms/Text/Title_15";
import { blue } from "@mui/material/colors";
import Footer from "../../templates/Footer/Footer";

const TopPage: React.FC = () => {
  return (
    <>
      <Header />
      <FirstView />
      <PageTransition />
      <Footer />
    </>
  );
};
export default TopPage;
