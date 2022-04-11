import React from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import { useRouter } from "next/router";
import Title_15 from "../../atoms/Text/Title_15";
import { blue, grey, teal } from "@mui/material/colors";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
const array = [
  {
    title: "管理者ではじめる",
    iconNumber: 1,
    url: "https://firebasestorage.googleapis.com/v0/b/reserve-app-2c00c.appspot.com/o/images%2F%E8%93%AE%E3%81%95%E3%82%93%E4%BB%A3%E7%90%86%E5%90%9B%E3%83%9B%E3%82%9A%E3%83%BC%E3%82%B9%E3%82%99%EF%BC%92.png?alt=media&token=a15a0dd8-af62-41ca-89d4-b203c26ee355",
    role: "manager",
    transition: "login/manager",
    transition2: "signup/manager",
  },
  {
    title: "講師ではじめる",
    iconNumber: 2,
    url: "https://firebasestorage.googleapis.com/v0/b/reserve-app-2c00c.appspot.com/o/images%2Fjordan-whitfield-BhfE1IgcsA8-unsplash.jpg?alt=media&token=829deb5f-75c7-4dac-905b-6e97c91c3862",
    role: "teacher",
    transition: "login/teacher",
    transition2: "signup/teacher",
  },
  {
    title: "生徒ではじめる",
    iconNumber: 3,
    url: "https://firebasestorage.googleapis.com/v0/b/reserve-app-2c00c.appspot.com/o/images%2Fderek-truninger-uLitVttkC7o-unsplash.jpg?alt=media&token=c1a2f55b-35be-4c73-bd8b-416a493173b0",
    role: "student",
    transition: "login/students",
    transition2: "signup/students",
  },
];

const PageTransition: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <a id="transition">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Title_15
            fontSize={30}
            color={blue[500]}
            fontWeight={600}
            textTitle={"3つのユーザータイプ"}
            style={{
              mb: 2,

              my: "auto",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", p: 3 }}>
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        my: "auto",
                      }}
                    >
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
                      <Title_15
                        fontSize={20}
                        color={blue[500]}
                        fontWeight={600}
                        textTitle={index.title}
                        style={{
                          mb: 1,
                          mt: 1,
                        }}
                      />
                      <Title_15
                        fontSize={10}
                        color={blue[500]}
                        fontWeight={600}
                        textTitle={index.title}
                        style={{
                          mb: 2,
                        }}
                      />
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        mx={"auto"}
                      >
                        <PrimaryBtn
                          click={() => router.push(index.transition)}
                          buttonText={"ログイン"}
                          style={{
                            mt: 2,
                            fontSize: 13,
                            fontWeight: 600,
                            bgcolor: "#67b5b7",
                            "&:hover": { bgcolor: "#67c5b7" },
                          }}
                        />
                        <PrimaryBtn
                          click={() => router.push(index.transition2)}
                          buttonText={"新規登録"}
                          style={{
                            mt: 2,
                            ml: 2,
                            fontSize: 13,
                            fontWeight: 600,
                            bgcolor: blue[300],
                            "&:hover": { bgcolor: blue[400] },
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </>
          ))}
        </Box>
      </a>
    </>
  );
};
export default PageTransition;
