import React from "react";
import PrimaryBtn from "../components/atoms/Button/PrimaryButton";
import Header from "../components/templates/Header/Header3";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { createMedia } from "@artsy/fresnel";
import { blue } from "@mui/material/colors";
import Title from "../components/atoms/Text/PrimaryTitle";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

const TopPage: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <MediaContextProvider>
        <Header />
        <Box display={"flex"} justifyContent={"center"}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Title>音楽教室予約システム</Title>
            <PrimaryBtn
              click={() => router.push("login/teacher")}
              style={{ width: 100 }}
              buttonText={"講師"}
            />
          </Box>
        </Box>
      </MediaContextProvider>
    </>
  );
};
export default TopPage;
