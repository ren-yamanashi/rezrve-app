import React from "react";
import FirstView from "../../organisms/top/FirstView";
import PageTransition from "../../organisms/top/PageTransition";
import Header from "../../templates/Header/Header3";
import Footer from "../../templates/Footer/Footer";

const TopPage = () => {
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
