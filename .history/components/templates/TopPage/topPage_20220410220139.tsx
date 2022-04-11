import React from "react";
import FirstView from "../../organisms/top/FirstView";
import IntroductionPage from "../../organisms/top/introduction";
import PageTransition from "../../organisms/top/PageTransition";
import { Box } from "@mui/system";
import Title_15 from "../../atoms/Text/Title_15";

const TopPage: React.FC = () => {
  return (
    <>
      <FirstView />
      <Box>
        <Title_15
          fontSize={25}
          color={"white"}
          fontWeight={600}
          textTitle={"音楽教室予約システム"}
          style={{ mb: 2 }}
        />
      </Box>
      <IntroductionPage />
      <PageTransition />
    </>
  );
};
export default TopPage;
