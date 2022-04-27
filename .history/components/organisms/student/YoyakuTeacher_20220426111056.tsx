import Grid from "@mui/material/Grid";
import React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { teal } from "@mui/material/colors";
import { useRouter } from "next/router";
import { createMedia } from "@artsy/fresnel";
import { ToastContainer } from "react-toastify";
// import my File
import { useStaffList } from "../../../hooks/firebase/user/useUserList";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
// Create Media
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    xs: 0,
    sm: 365,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});
// 担当者から探す
const YoyakuTeacher = () => {
  const { usersList } = useStaffList();
  const router = useRouter();
  return (
    <>
      <React.Fragment>
        <MediaContextProvider>
          <Media greaterThan="sm">
            <Box
              display="flex"
              flexWrap="wrap"
              mb={3}
              justifyContent="center"
              mx="auto"
            >
              {usersList &&
                usersList.map((index) => (
                  <>
                    <Grid item xs={12} sm={5} lg={3} md={3}>
                      <Box mb={3} display="flex" mx={2}>
                        <CardContent
                          style={{
                            borderRadius: "7px",
                            borderStyle: "solid",
                            borderWidth: "2px",
                            margin: "auto",
                            width: 200,
                            maxHeight: 300,
                          }}
                        >
                          <Grid item xs={12} sm={14} lg={10} md={10}>
                            <CardMedia
                              component="img"
                              sx={{
                                width: 150,
                                height: 120,
                                borderRadius: "10%",
                              }}
                              image={index.staffImageURL}
                              alt="Icon"
                            />
                          </Grid>
                          <Box display="flex" margin="auto">
                            <Typography
                              sx={{ fontSize: 15, mt: 2, mb: 1, mx: "auto" }}
                            >
                              {`担当者名 : ${index.userName}`}
                            </Typography>
                          </Box>
                          <Box display="flex" margin="auto">
                            <PrimaryBtn
                              click={() =>
                                router.push(`/reserve/students/${index.id}`)
                              }
                              style={{
                                bgcolor: teal[500],
                                "&:hover": { bgcolor: "#2E8B57" },
                                fontSize: 12,
                                width: 140,
                                margin: "auto",
                              }}
                              buttonText={"選択"}
                            />
                          </Box>
                        </CardContent>
                      </Box>
                    </Grid>
                  </>
                ))}
            </Box>
          </Media>
          {/* Mobile(365~600) */}
          <Media at="sm">
            <Box
              display="flex"
              flexWrap="wrap"
              mb={3}
              justifyContent="center"
              mx="auto"
            >
              {usersList &&
                usersList.map((index) => (
                  <>
                    <Box mb={3} display="flex" mx={2}>
                      <CardContent
                        style={{
                          borderRadius: "7px",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          margin: "auto",
                          minWidth: 120,
                          width: 150,
                          maxHeight: 250,
                        }}
                      >
                        <Box display="flex" justifyContent="center" mx="auto">
                          <CardMedia
                            component="img"
                            sx={{
                              minWidth: 100,
                              width: 130,
                              height: 100,
                              borderRadius: "10%",
                              justifyContent: "center",
                            }}
                            image={index.staffImageURL}
                            alt="Icon"
                          />
                        </Box>
                        <Box display="flex" margin="auto">
                          <Typography
                            sx={{ fontSize: 12, mt: 2, mb: 1, mx: "auto" }}
                          >
                            {`担当者名 : ${index.userName}`}
                          </Typography>
                        </Box>
                        <Box display="flex" margin="auto">
                          <PrimaryBtn
                            click={() =>
                              router.push(`/reserve/students/${index.id}`)
                            }
                            style={{
                              bgcolor: teal[500],
                              "&:hover": { bgcolor: "#2E8B57" },
                              fontSize: 12,
                              width: 140,
                              margin: "auto",
                            }}
                            buttonText={"選択"}
                          />
                        </Box>
                      </CardContent>
                    </Box>
                  </>
                ))}
            </Box>
          </Media>
          {/* Mobile (~365) */}
          <Media at="xs">
            <Box
              display="flex"
              flexWrap="wrap"
              mb={3}
              justifyContent="center"
              mx="auto"
            >
              {usersList &&
                usersList.map((index) => (
                  <>
                    <Box mb={3} display="flex" mx={2}>
                      <CardContent
                        style={{
                          borderRadius: "7px",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          margin: "auto",
                          width: 125,
                          height: 180,
                        }}
                      >
                        <Box display="flex" justifyContent="center" mx="auto">
                          <CardMedia
                            component="img"
                            sx={{
                              width: 100,
                              height: 60,
                              borderRadius: "10%",
                              justifyContent: "center",
                            }}
                            image={index.staffImageURL}
                            alt="Icon"
                          />
                        </Box>
                        <Box display="flex" margin="auto">
                          <Typography
                            sx={{ fontSize: 12, mt: 2, mb: 1, mx: "auto" }}
                          >
                            {`講師名 : ${index.userName}`}
                          </Typography>
                        </Box>
                        <Box display="flex" margin="auto">
                          <PrimaryBtn
                            click={() =>
                              router.push(`/reserve/students/${index.id}`)
                            }
                            style={{
                              bgcolor: teal[500],
                              "&:hover": { bgcolor: "#2E8B57" },
                              fontSize: 8,
                              width: 150,
                              margin: "auto",
                            }}
                            buttonText={"選択"}
                          />
                        </Box>
                      </CardContent>
                    </Box>
                  </>
                ))}
            </Box>
          </Media>
        </MediaContextProvider>
        <ToastContainer />
      </React.Fragment>
    </>
  );
};

export default YoyakuTeacher;
