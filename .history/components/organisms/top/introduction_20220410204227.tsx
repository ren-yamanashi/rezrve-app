import React from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Title_15 from "../../atoms/Text/Title_15";
import { blue } from "@mui/material/colors";
import CardMedia from "@mui/material/CardMedia";
const array = [
  {
    title: "顧客管理",
    text: "テキストテキスト",
    iconNumber: 1,
    url: "https://source.unsplash.com/random",
  },
  {
    title: "スタッフ・シフト",
    text: "テキストテキスト",
    iconNumber: 2,
    url: "https://source.unsplash.com/random",
  },
  {
    title: "レスポンシブ対応",
    text: "テキストテキスト",
    iconNumber: 3,
    url: "https://source.unsplash.com/random",
  },
  {
    title: "かんたん操作",
    text: "テキストテキスト",
    iconNumber: 4,
    url: "https://source.unsplash.com/random",
  },
];

const IntroductionPage: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          py: 3,
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
              <Grid item xs={6} sm={4} lg={4} md={5}>
                <Box mb={3} display="flex" justifyContent="center" mx="auto">
                  <CardContent
                    style={{
                      borderRadius: "7px",
                      borderStyle: "solid",
                      backgroundColor: blue[500],
                      borderWidth: "2px",
                      borderColor: blue[500],
                      margin: "auto",
                      height: 250,
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
                        fontSize={15}
                        color={"primary"}
                        fontWeight={600}
                        textTitle={index.title}
                        style={{
                          mb: 2,
                          mx: "auto",
                        }}
                      />
                      <Title_15
                        fontSize={10}
                        color={"primary"}
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
