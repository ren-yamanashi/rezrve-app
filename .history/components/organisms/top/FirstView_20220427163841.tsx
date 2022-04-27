import React from "react";
import { Box } from "@mui/material";
import { createMedia } from "@artsy/fresnel";
import { blue, grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

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
            {data_firstView &&
              data_firstView.map((data) => (
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
                          textTitle={data.text}
                          style={{ mb: 3 }}
                        />
                      </Media>
                      <Media at="md">
                        <Title_15
                          fontSize={30}
                          color={"white"}
                          fontWeight={600}
                          textTitle={data.text}
                          style={{ mb: 3 }}
                        />
                      </Media>
                      <Media at="sm">
                        <Title_15
                          fontSize={20}
                          color={"white"}
                          fontWeight={600}
                          textTitle={data.text}
                          style={{ mb: 3 }}
                        />
                      </Media>
                      <Media at="xs">
                        <Title_15
                          fontSize={15}
                          color={"white"}
                          fontWeight={600}
                          textTitle={data.text}
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
                          textTitle={data.text2}
                          style={{ mb: 2, textAlign: "left" }}
                        />
                      </Media>
                      <Media at="sm">
                        <Title_15
                          fontSize={10}
                          color={"white"}
                          fontWeight={600}
                          textTitle={data.text2}
                          style={{ mb: 2, textAlign: "left" }}
                        />
                      </Media>
                      <Media at="xs">
                        <Title_15
                          fontSize={10}
                          color={"white"}
                          fontWeight={600}
                          textTitle={data.text2}
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
                        <PrimaryBtn
                          buttonText={"今すぐ始める"}
                          style={{ fontSize: 20, fontWeight: 600 }}
                        />
                      </Media>
                      <Media at="sm">
                        <PrimaryBtn
                          buttonText={"今すぐ始める"}
                          style={{ fontSize: 15, fontWeight: 600 }}
                        />
                      </Media>
                      <Media at="xs">
                        <PrimaryBtn
                          buttonText={"今すぐ始める"}
                          style={{ fontSize: 10, fontWeight: 600 }}
                        />
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
                        image={data.url}
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
                        image={data.url2}
                        alt="Icon"
                      />
                    </Grid>
                  </Box>
                </>
              ))}
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
          {data_introduction &&
            data_introduction.map((index) => (
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
      </>
    </>
  );
};
export default FirstView;
