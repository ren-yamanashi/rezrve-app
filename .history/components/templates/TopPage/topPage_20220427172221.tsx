import React from "react";
import FirstView from "../../organisms/top/FirstView";
import PageTransition from "../../organisms/top/PageTransition";
import Header from "../../templates/Header/Header3";
import Introduction from "../../organisms/top/Introduction";
import Footer from "../../templates/Footer/Footer";

const TopPage = () => {
  return (
    <>
      <Header />
      <FirstView />
      <Introduction />
      <PageTransition />
      <Footer />
    </>
  );
};
export default TopPage;
