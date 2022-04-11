import React from "react";
import PrimaryBtn from "../components/atoms/Button/PrimaryButton";
import Header from "../components/templates/Header/Header3";
import { useRouter } from "next/router";

const TopPage: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Header />
      <PrimaryBtn
        click={() => router.push("login/teacher")}
        buttonText={"講師"}
      />
    </>
  );
};
export default TopPage;
