import React from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import { useRouter } from "next/router";
import Title_15 from "../../atoms/Text/Title_15";
import { blue } from "@mui/material/colors";
import CardMedia from "@mui/material/CardMedia";
import { useData } from "../../../hooks/firebase/useImages";

const PageTransition = () => {
  const router = useRouter();
  const { data_pageTransition } = useData();
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
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Title_15
            fontSize={15}
            color={blue[500]}
            fontWeight={600}
            textTitle={"管理者・講師・生徒それぞれで操作方法や特徴が異なります"}
            style={{
              mb: 2,
              my: "auto",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", p: 3 }}>
          {data_pageTransition &&
            data_pageTransition.map((index) => (
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
                      z
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
                            width: 220,
                            height: 140,
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
                          fontSize={15}
                          color={blue[500]}
                          fontWeight={600}
                          textTitle={index.text}
                          style={{
                            mb: 1,
                          }}
                        />
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
