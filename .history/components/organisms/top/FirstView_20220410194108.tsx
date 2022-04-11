import React from "react";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import Header from "../../templates/Header/Header3";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { createMedia } from "@artsy/fresnel";
import { blue } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Title from "../../atoms/Text/PrimaryTitle";
import Title_15 from "../../atoms/Text/Title_15";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    xs: 0,
    sm: 350,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

const FirstView: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <MediaContextProvider>
        <Header />
        <Box display={"flex"} justifyContent={"center"} p={5}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              width: "50%",
              my: "auto",
              mx: "0 auto",
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
              <Media greaterThan="md">
                <Title_15
                  fontSize={35}
                  color={"primary"}
                  fontWeight={600}
                  textTitle={"音楽教室予約システム"}
                  style={{ mb: 2 }}
                />
              </Media>
              <Media at="md">
                <Title_15
                  fontSize={30}
                  color={"primary"}
                  fontWeight={600}
                  textTitle={"音楽教室予約システム"}
                  style={{ mb: 2 }}
                />
              </Media>
              <Media at="sm">
                <Title_15
                  fontSize={20}
                  color={"primary"}
                  fontWeight={600}
                  textTitle={"音楽教室予約システム"}
                  style={{ mb: 2 }}
                />
              </Media>
              <Media at="xs">
                <Title_15
                  fontSize={15}
                  color={"primary"}
                  fontWeight={600}
                  textTitle={"音楽教室予約システム"}
                  style={{ mb: 2 }}
                />
              </Media>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mx: "auto",
              }}
            >
              <Media greaterThan="sm">
                <Title_15
                  fontSize={15}
                  color={"primary"}
                  fontWeight={600}
                  textTitle={
                    "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
                  }
                  style={{ mb: 2, textAlign: "left" }}
                />
              </Media>
              <Media at="sm">
                <Title_15
                  fontSize={10}
                  color={"primary"}
                  fontWeight={600}
                  textTitle={
                    "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
                  }
                  style={{ mb: 2, textAlign: "left" }}
                />
              </Media>
              <Media at="xs">
                <Title_15
                  fontSize={10}
                  color={"primary"}
                  fontWeight={600}
                  textTitle={
                    "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
                  }
                  style={{ mb: 2, textAlign: "left" }}
                />
              </Media>
            </Box>
            <Box
              sx={{
                display: "flex",
                mx: "auto",
                justifyContent: "center",
              }}
            >
              <Media greaterThan="sm">
                <a href="#transition">
                  <PrimaryBtn
                    buttonText={"今すぐ始める"}
                    style={{ fontSize: 20, fontWeight: 600 }}
                  />
                </a>
              </Media>
              <Media at="sm">
                <a href="#transition">
                  <PrimaryBtn
                    click={() => router.push("signup/teacher")}
                    buttonText={"今すぐ始める"}
                    style={{ fontSize: 15, fontWeight: 600 }}
                  />
                </a>
              </Media>
              <Media at="xs">
                <a href="#transition">
                  <PrimaryBtn
                    click={() => router.push("signup/teacher")}
                    buttonText={"今すぐ始める"}
                    style={{ fontSize: 10, fontWeight: 600 }}
                  />
                </a>
              </Media>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "50%",
              my: "auto",
              mx: "auto",
            }}
          >
            <Grid item xs={12} sm={14} lg={20} md={20}>
              <CardMedia
                component="img"
                sx={{
                  borderRadius: "10%",
                  height: 200,
                  maxWidth: 300,
                  margin: "auto",
                  borderColor: blue[500],
                  border: "10px",
                }}
                image={
                  "https://firebasestorage.googleapis.com/v0/b/reserve-app-2c00c.appspot.com/o/images%2F%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202022-04-10%2019.23.00.png?alt=media&token=5bc3600e-8a20-4c5e-91f8-88aa9e0633f3"
                }
                alt="Icon"
              />
            </Grid>
          </Box>
        </Box>
      </MediaContextProvider>
    </>
  );
};
export default FirstView;
