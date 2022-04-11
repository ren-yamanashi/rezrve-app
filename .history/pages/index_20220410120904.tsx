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
            <Box
              display={"flex"}
              width={300}
              mx={"auto"}
              justifyContent={"center"}
            >
              <PrimaryBtn
                click={() => router.push("signup/teacher")}
                style={{ width: 100, mr: 3 }}
                buttonText={"新規登録"}
              />
              <PrimaryBtn
                click={() => router.push("login/teacher")}
                style={{ width: 100 }}
                buttonText={"ログイン"}
              />
            </Box>
          </Box>
        </Box>
      </MediaContextProvider>
    </>
  );
};
export default TopPage;
