import React from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import { useRouter } from "next/router";
import Title_15 from "../../atoms/Text/Title_15";
import { blue, grey } from "@mui/material/colors";
import CardMedia from "@mui/material/CardMedia";
const array = [
  {
    title: "管理者で始める",
    iconNumber: 1,
    url: "https://source.unsplash.com/random",
    role: "manager",
    transition: "login/manager",
  },
  {
    title: "講師で始める",
    iconNumber: 2,
    url: "https://source.unsplash.com/random",
    role: "teacher",
    transition: "login/teacher",
  },
  {
    title: "生徒で始める",
    iconNumber: 3,
    url: "https://source.unsplash.com/random",
    role: "student",
    transition: "login/student",
  },
];

const PageTransition: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <a id="transition">
        <Box sx={{ display: "flex", flexWrap: "wrap", py: 3 }}>
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
                        backgroundColor: blue[400],
                        borderWidth: "2px",
                        borderColor: blue[400],
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
                          color={"white"}
                          fontWeight={600}
                          textTitle={index.title}
                          style={{
                            mb: 2,
                            mx: "auto",
                          }}
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
                              bgColor: "white",
                            }}
                          />
                          {index.role == "student" && (
                            <PrimaryBtn
                              click={() => router.push("signup/student")}
                              buttonText={"新規登録"}
                              style={{
                                mt: 2,
                                ml: 2,
                                fontSize: 13,
                                fontWeight: 600,
                                bgColor: "white",
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </CardContent>
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
