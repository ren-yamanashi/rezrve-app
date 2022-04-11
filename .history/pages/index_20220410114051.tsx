import React from "react";
import PrimaryBtn from "../components/atoms/Button/PrimaryButton";
import { useRouter } from "next/router";

const TopPage: React.FC = () => {
  const router = useRouter();
  return (
    <PrimaryBtn
      click={() => router.push("login/teacher")}
      buttonText={"講師"}
    />
  );
};
export default TopPage;
