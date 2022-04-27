import * as React from "react";
import { Box } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Title_15 from "../../atoms/Text/Title_15";

const introArr = [
  {
    title: "かんたん操作",
    text: "パソコンが不慣れなユーザーも、直感的に操作可能です。",
    url: "",
  },
  {
    title: "レスポンシブ対応",
    text: "スマートフォン・タブレット・PCなど、多彩なデバイスに対応しています",
    url: "",
  },
  {
    title: "スタッフ・シフト",
    text: "スタッフのシフト、出勤を管理できる機能を完備しています。",
    url: "",
  },
];

const Introduction = () => {
  return (
    <>
      <a id="introduction">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
            bgcolor: blue[500],
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", p: 3 }}>
            {introArr.map((index) => (
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
                    <Box
                      mb={3}
                      display="flex"
                      justifyContent="center"
                      mx="auto"
                    >
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
                            fontSize={10}
                            fontWeight={600}
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
        </Box>
      </a>
    </>
  );
};
export default Introduction;
