import React from "react";
import PrimaryBtn from "../components/atoms/Button/PrimaryButton";
import Header from "../components/templates/Header/Header3";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { createMedia } from "@artsy/fresnel";
import { blue } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Title from "../components/atoms/Text/PrimaryTitle";
import Title_15 from "../components/atoms/Text/Title_15";

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
        <Box display={"flex"} justifyContent={"center"} px={5}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              width: "50%",
              mt: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mx: "auto",
                width: "80%",
              }}
            >
              <Title_15
                fontSize={35}
                color={"primary"}
                fontWeight={600}
                textTitle={"音楽教室予約システム"}
                style={{ mb: 2 }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mx: "auto",
              }}
            >
              <Title_15
                fontSize={20}
                color={"primary"}
                fontWeight={600}
                textTitle={
                  "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
                }
                style={{ mb: 5, textAlign: "left" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: 300,
                mx: "auto",
                justifyContent: "center",
              }}
            >
              <PrimaryBtn
                click={() => router.push("signup/teacher")}
                buttonText={"今すぐ始める"}
                style={{ fontSize: 20, fontWeight: 600 }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Grid item xs={12} sm={14} lg={20} md={20}>
              <CardMedia
                component="img"
                sx={{
                  borderRadius: "10%",
                  width: "80%",
                  margin: "auto",
                }}
                image={"https://source.unsplash.com/random"}
                alt="Icon"
              />
            </Grid>
          </Box>
        </Box>
      </MediaContextProvider>
    </>
  );
};
export default TopPage;
