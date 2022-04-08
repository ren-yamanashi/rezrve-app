import {
  collection,
  getFirestore,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import Button from "@mui/material/Button";
import { browser } from "process";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { blue, teal } from "@mui/material/colors";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import { useTeacherList } from "../../../hooks/user/useUserList";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    xs: 0,
    sm: 365,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

//ユーザーリストの作成　名前に管理者があればユーザーの削除が可能。 メアドに @bee が入っていればシフトの登録が可能
export default function UsersList() {
  const db = getFirestore();
  const { usersList } = useTeacherList();
  const [users, setUsers] = useState<Users[]>([]);
  const { user } = useAuth();
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
                            height: 250,
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
                              image={index.url}
                              alt="Icon"
                            />
                          </Grid>
                          <Box display="flex" margin="auto">
                            <Typography
                              sx={{ fontSize: 15, mt: 2, mb: 1, mx: "auto" }}
                            >
                              {`講師名 : ${index.userName}`}
                            </Typography>
                          </Box>
                          <Box display="flex" margin="auto">
                            <Button
                              onClick={() =>
                                router.push(`/reserve/teachers/${index.id}`)
                              }
                              variant="contained"
                              sx={{
                                bgcolor: teal[500],
                                "&:hover": { bgcolor: "#2E8B57" },
                                fontSize: 12,
                                width: 140,
                                margin: "auto",
                              }}
                            >
                              選択
                            </Button>
                          </Box>
                        </CardContent>
                      </Box>
                    </Grid>
                  </>
                ))}
            </Box>
          </Media>
          {/* スマホレスポンシブ */}
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
                          height: 220,
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
                            image={index.url}
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
                          <Button
                            onClick={() =>
                              router.push(`/reserve/teachers/${index.id}`)
                            }
                            variant="contained"
                            sx={{
                              bgcolor: teal[500],
                              "&:hover": { bgcolor: "#2E8B57" },
                              fontSize: 12,
                              width: 140,
                              margin: "auto",
                            }}
                          >
                            選択
                          </Button>
                        </Box>
                      </CardContent>
                    </Box>
                  </>
                ))}
            </Box>
          </Media>
          {/* スマホレスポンシブ */}
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
                            image={index.url}
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
                          <Button
                            onClick={() =>
                              router.push(`/reserve/teachers/${index.id}`)
                            }
                            type="submit"
                            variant="contained"
                            sx={{
                              bgcolor: teal[500],
                              "&:hover": { bgcolor: "#2E8B57" },
                              fontSize: 8,
                              width: 150,
                              margin: "auto",
                            }}
                          >
                            選択
                          </Button>
                        </Box>
                      </CardContent>
                    </Box>
                  </>
                ))}
            </Box>
          </Media>
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
