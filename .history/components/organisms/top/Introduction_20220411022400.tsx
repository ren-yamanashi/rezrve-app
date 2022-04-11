import React from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Title_15 from "../../atoms/Text/Title_15";
import { blue, grey } from "@mui/material/colors";
import CardMedia from "@mui/material/CardMedia";
const array = [
  {
    title: "多彩な管理方法",
    text: "顧客・スタッフ・オーナー それぞれで閲覧、操作可能な範囲が異なります",
    iconNumber: 1,
    url: "https://firebasestorage.googleapis.com/v0/b/reserve-app-2c00c.appspot.com/o/images%2Fkrakenimages-Y5bvRlcCx8k-unsplash.jpg?alt=media&token=66f0ef6e-9f6b-425c-8102-5f48fdf97407",
  },
  {
    title: "スタッフ・シフト",
    text: "スタッフのシフト、出勤を管理できる機能を完備しています。",
    iconNumber: 2,
    url: "https://firebasestorage.googleapis.com/v0/b/reserve-app-2c00c.appspot.com/o/images%2Fbehnam-norouzi-fg2T4Hbadfc-unsplash.jpg?alt=media&token=64319c82-3c6b-48ce-be76-b7b611453b97",
  },
  {
    title: "レスポンシブ対応",
    text: "スマートフォン・タブレット・PCなど、多彩なデバイスに対応しています",
    iconNumber: 3,
    url: "https://firebasestorage.googleapis.com/v0/b/reserve-app-2c00c.appspot.com/o/images%2Fpeter-bo-faMPQuSe4Wo-unsplash.jpg?alt=media&token=85e49d4c-f469-4c8a-b6bf-a34a320f3e96",
  },
  {
    title: "かんたん操作",
    text: "パソコンが不慣れなユーザーも、直感的に操作可能です。",
    iconNumber: 4,
    url: "https://firebasestorage.googleapis.com/v0/b/reserve-app-2c00c.appspot.com/o/images%2Flauren-mancke-aOC7TSLb1o8-unsplash.jpg?alt=media&token=10c46013-9758-4acc-acdb-d3ad92683b6c",
  },
];

const IntroductionPage: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          pb: 3,
          bgcolor: blue[500],
        }}
      >
        {array.map((index) => (
          <>
            <Box
              sx={{
                my: 3,
                display: "flex",
                justifyContent: "center",
                mx: "auto",
              }}
            >
              <Grid item xs={6} sm={4} lg={10} md={6}>
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
                      <Title_15
                        fontSize={20}
                        color={"white"}
                        fontWeight={600}
                        textTitle={index.title}
                        style={{
                          mb: 2,
                          mx: "auto",
                        }}
                      />
                      <Title_15
                        fontSize={12}
                        color={"white"}
                        textTitle={index.text}
                        style={{ mb: 2 }}
                      />
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
                        image={index.url}
                        alt="Icon"
                      />
                    </Box>
                  </CardContent>
                </Box>
              </Grid>
            </Box>
          </>
        ))}
      </Box>
    </>
  );
};
export default IntroductionPage;
