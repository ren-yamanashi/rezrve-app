import {
  collection,
  getFirestore,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import Alert from "@mui/material/Alert";
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
import { createMedia } from "@artsy/fresnel";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import { useTeacherList } from "../../../hooks/user/useUserList";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";

//MediaQuery設定
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 1000,
    xl: 1220,
  },
});

//ユーザーリストの作成　名前に管理者があればユーザーの削除が可能。 メアドに @bee が入っていればシフトの登録が可能
export default function YoyakuTeacherAtManager() {
  console.log("講師一覧（管理者）");
  const { usersList } = useTeacherList();
  const { user } = useAuth();
  const router = useRouter();
  return (
    <>
      <React.Fragment>
        <Box display="flex" flexWrap="wrap">
          {usersList &&
            usersList.map((index) => (
              <>
                <Box mb={3} display="flex" justifyContent="center" mx="auto">
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
                          borderWidth: "2px",
                          margin: "auto",
                          height: 230,
                        }}
                      >
                        <Grid item xs={6} sm={8} lg={3} md={8}>
                          <Box
                            sx={{
                              justifyContent: "center",
                              textAlign: "center",
                              alignItems: "center",
                            }}
                          >
                            <CardMedia
                              component="img"
                              sx={{
                                width: 150,
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
                              router.push(
                                `/reserve/manager/teachers/${index.id}`
                              )
                            }
                            variant="contained"
                            sx={{
                              bgcolor: teal[500],
                              "&:hover": { bgcolor: "#2E8B57" },
                              fontSize: 10,
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
                </Box>
              </>
            ))}
        </Box>
      </React.Fragment>
    </>
  );
}
