import React from "react";
import { Box } from "@mui/material";
import { createMedia } from "@artsy/fresnel";
import { blue, grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Link from "next/link";
import Title_15 from "../../atoms/Text/Title_15";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import { useData } from "../../../hooks/firebase/useImages";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    xs: 0,
    sm: 350,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});
const title = "多彩な機能で自由に予約を管理";
const text =
  "REZRVE(リザーブ)予約はクラウドで提供するWeb予約システムです。音楽教室・サロン・ネイル教室など、さまざまな用途に応じて使用できる最適な予約システムをご利用いただけます";

const introArr = {
  title: [
    "かんたん操作",
    "レスポンシブ対応",
    "多彩な管理方法",
    "スタッフ・シフト",
  ],
  text: [
    "パソコンが不慣れなユーザーも、直感的に操作可能です。",
    "スマートフォン・タブレット・PCなど、多彩なデバイスに対応しています",
    "顧客・スタッフ・管理者それぞれで閲覧、操作可能な範囲が異なります",
    "スタッフのシフト、出勤を管理できる機能を完備しています。",
  ],
};

const FirstView = () => {
  const { data_firstView, data_introduction } = useData();
  return (
    <>
      <a id={"top"}>
        <MediaContextProvider>
          <Box
            display={"flex"}
            justifyContent={"center"}
            p={5}
            bgcolor={blue[500]}
          >
            <>
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
                      color={"white"}
                      fontWeight={600}
                      textTitle={title}
                      style={{ mb: 3 }}
                    />
                  </Media>
                  <Media at="md">
                    <Title_15
                      fontSize={30}
                      color={"white"}
                      fontWeight={600}
                      textTitle={title}
                      style={{ mb: 3 }}
                    />
                  </Media>
                  <Media at="sm">
                    <Title_15
                      fontSize={20}
                      color={"white"}
                      fontWeight={600}
                      textTitle={title}
                      style={{ mb: 3 }}
                    />
                  </Media>
                  <Media at="xs">
                    <Title_15
                      fontSize={15}
                      color={"white"}
                      fontWeight={600}
                      textTitle={title}
                      style={{ mb: 3 }}
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
                      color={"white"}
                      fontWeight={600}
                      textTitle={text}
                      style={{ mb: 2, textAlign: "left" }}
                    />
                  </Media>
                  <Media at="sm">
                    <Title_15
                      fontSize={10}
                      color={"white"}
                      fontWeight={600}
                      textTitle={text}
                      style={{ mb: 2, textAlign: "left" }}
                    />
                  </Media>
                  <Media at="xs">
                    <Title_15
                      fontSize={10}
                      color={"white"}
                      fontWeight={600}
                      textTitle={text}
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
                    <a href={"/join/"}>
                      <PrimaryBtn
                        buttonText={"今すぐ始める"}
                        style={{ fontSize: 20, fontWeight: 600 }}
                      />
                    </a>
                  </Media>
                  <Media at="sm">
                    <a href={"/join/"}>
                      <PrimaryBtn
                        buttonText={"今すぐ始める"}
                        style={{ fontSize: 15, fontWeight: 600 }}
                      />
                    </a>
                  </Media>
                  <Media at="xs">
                    <a href={"/join/"}>
                      <PrimaryBtn
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
                      borderRadius: "5%",
                      height: 220,
                      maxWidth: 400,
                      margin: "auto",
                      border: "10px",
                    }}
                    image={"https://source.unsplash.com/random"}
                    alt="Icon"
                  />
                  <CardMedia
                    component="img"
                    sx={{
                      position: "absolute",
                      borderRadius: "5%",
                      height: 260,
                      width: 120,
                      top: "120px",
                      right: "5%",
                    }}
                    image={"https://source.unsplash.com/random"}
                    alt="Icon"
                  />
                </Grid>
              </Box>
            </>
          </Box>
        </MediaContextProvider>
      </a>
      {/* introduction */}
      <>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            pb: 3,
            bgcolor: blue[500],
          }}
        >
          <>
            <Box
              sx={{
                my: 3,
                display: "flex",
                justifyContent: "center",
                mx: "auto",
              }}
            >
              <Grid item xs={6} sm={4} lg={1} md={2}>
                <Box mb={3} display="flex" justifyContent="center" mx="auto">
                  <CardContent
                    style={{
                      borderRadius: "7px",
                      borderStyle: "solid",
                      backgroundColor: grey[500],
                      borderWidth: "2px",
                      borderColor: grey[400],
                      margin: "auto",
                      height: 270,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        my: "auto",
                      }}
                    >
                      {introArr.text.map((i) => (
                        <>
                          <Title_15
                            fontSize={20}
                            color={"white"}
                            fontWeight={600}
                            textTitle={i}
                            style={{
                              mb: 2,
                              mx: "auto",
                            }}
                          />
                        </>
                      ))}
                      {introArr.title.map((i) => (
                        <>
                          <Title_15
                            fontSize={10}
                            fontWeight={600}
                            color={"white"}
                            textTitle={i}
                            style={{ mb: 2 }}
                          />
                        </>
                      ))}

                      <CardMedia
                        component="img"
                        sx={{
                          width: 200,
                          height: 120,
                          borderRadius: "10%",
                          justifyContent: "center",
                          textAlign: "center",
                          alignItems: "center",
                        }}
                        image={"https://source.unsplash.com/random"}
                        alt="Icon"
                      />
                    </Box>
                  </CardContent>
                </Box>
              </Grid>
            </Box>
          </>
        </Box>
      </>
    </>
  );
};
export default FirstView;
