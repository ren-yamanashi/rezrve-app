import React from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Title_15 from "../../atoms/Text/Title_15";
import { blue } from "@mui/material/colors";
import CardMedia from "@mui/material/CardMedia";
const array = [
  {
    title: "管理者で始める",
    iconNumber: 1,
    url: "https://source.unsplash.com/random",
  },
  {
    title: "講師で始める",
    iconNumber: 2,
    url: "https://source.unsplash.com/random",
  },
  {
    title: "生徒で始める",
    iconNumber: 3,
    url: "https://source.unsplash.com/random",
  },
];

const PageTransition: React.FC = () => {
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", my: 5 }}>
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
                      backgroundColor: "white",
                      borderWidth: "2px",
                      borderColor: "white",
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
export default PageTransition;
