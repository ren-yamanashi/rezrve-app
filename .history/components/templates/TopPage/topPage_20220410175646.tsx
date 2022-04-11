import React from "react";
import FirstView from "../../organisms/top/FirstView";
import IntroductionPage from "../../organisms/top/introduction";
import PageTransition from "../../organisms/top/PageTransition";

const TopPage: React.FC = () => {
  return (
    <>
      <FirstView />
      <IntroductionPage />
      <PageTransition />
    </>
  );
};
export default TopPage;
