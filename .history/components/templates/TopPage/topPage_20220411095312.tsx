import React from "react";
import FirstView from "../../organisms/top/FirstView";
import PageTransition from "../../organisms/top/PageTransition";
import Header from "../../templates/Header/Header4";
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
