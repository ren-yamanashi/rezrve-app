import React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { createMedia } from "@artsy/fresnel";
import { blue } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";

import Title_15 from "../../atoms/Text/Title_15";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import { useData } from "../../../hooks/images/useImages";

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
  const { data_firstView } = useData();
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
                            buttonText={"今すぐ始める"}
                            style={{ fontSize: 15, fontWeight: 600 }}
                          />
                        </a>
                      </Media>
                      <Media at="xs">
                        <a href="#transition">
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
                        image={data.url}
                        alt="Icon"
                      />
                    </Grid>
                  </Box>
                </>
              ))}
          </Box>
        </MediaContextProvider>
      </a>
    </>
  );
};
export default FirstView;
