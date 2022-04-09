import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
import { createMedia } from "@artsy/fresnel";
//import my File
import { useAuth } from "../../../hooks/useUserAuth";
import { useUser } from "../../../hooks/user/useUserList";
import { blue, grey, teal } from "@mui/material/colors";
import InputLabelComponent2 from "../../atoms/Header/InputLabel/InputLabel_white";
import SelectComponent from "../../atoms/Header/Select";
import RsvButton from "../../atoms/Header/Button/RsvButton2";
import MenuItemComponent from "../../atoms/Header/MenuItem";
import Main from "../../atoms/Header/Main";
import AppBar from "../../atoms/Header/AppBar/AppBar2";
import DrawerHeader from "../../atoms/Header/Drawer/DrawerHeader";
import HomeButton_Blue from "../../atoms/Header/Button/HomeButton2";
import ShiftButton_Blue from "../../atoms/Header/Button/ShiftButton2";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 450,
    lg: 990,
    xl: 1200,
  },
});

const drawerWidth = 210;

export default function Header() {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { user_id } = useUser();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MediaContextProvider>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar>
            <Media greaterThan="sm">
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerOpen}
                  sx={{ ...(open && { display: "none" }), mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <>
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, minWidth: 120, color: "white" }}
                  >
                    <InputLabelComponent2>
                      {user && user.displayName}
                    </InputLabelComponent2>
                    <SelectComponent>
                      <MenuItemComponent
                        clickEvent={() =>
                          router.push(`/user/profile/${user?.uid}`)
                        }
                        buttonText={"アカウントを編集"}
                        style={{ display: "block", width: "100%" }}
                      />
                      {user_id &&
                        user_id.map(
                          (item) =>
                            item.role == "manager" && (
                              <MenuItemComponent
                                clickEvent={() =>
                                  router.push(`/user/${user?.uid}`)
                                }
                                buttonText={"講師一覧"}
                                style={{ display: "block", width: "100%" }}
                              />
                            )
                        )}
                      {user_id &&
                        user_id.map((item) =>
                          item.role == "manager" ? (
                            <MenuItemComponent
                              clickEvent={() =>
                                router.push(`/user/login/manager`)
                              }
                              buttonText={"ログアウト"}
                              style={{ display: "block", width: "100%" }}
                            />
                          ) : (
                            item.role == "teacher" && (
                              <MenuItemComponent
                                clickEvent={() =>
                                  router.push(`/user/login/teacher`)
                                }
                                buttonText={"ログアウト"}
                                style={{ display: "block", width: "100%" }}
                              />
                            )
                          )
                        )}
                    </SelectComponent>
                  </FormControl>
                </>
              </Toolbar>
            </Media>
            {/* Media Mobile */}
            <Media at="sm">
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerOpen}
                  sx={{ ...(open && { display: "none" }) }}
                >
                  <MenuIcon />
                </IconButton>
                <>
                  <FormControl
                    variant="standard"
                    sx={{
                      ml: 2,
                      mb: 1,
                      minWidth: 90,
                      color: "#0288d1",
                      textAlign: "right",
                    }}
                  >
                    <InputLabelComponent2>
                      {user && user.displayName}
                    </InputLabelComponent2>
                    <SelectComponent>
                      <MenuItemComponent
                        clickEvent={() =>
                          router.push(`/user/profile/${user?.uid}`)
                        }
                        buttonText={"アカウントを編集"}
                      />
                      {user_id &&
                        user_id.map(
                          (item) =>
                            item.role == "manager" && (
                              <MenuItemComponent
                                clickEvent={() =>
                                  router.push(`/user/${user?.uid}`)
                                }
                                buttonText={"講師一覧"}
                              />
                            )
                        )}
                      {user_id &&
                        user_id.map((item) =>
                          item.role == "manager" ? (
                            <MenuItemComponent
                              clickEvent={() =>
                                router.push(`/user/login/manager`)
                              }
                              buttonText={"ログアウト"}
                            />
                          ) : (
                            item.role == "teacher" && (
                              <MenuItemComponent
                                clickEvent={() =>
                                  router.push(`/user/login/teacher`)
                                }
                                buttonText={"ログアウト"}
                              />
                            )
                          )
                        )}
                    </SelectComponent>
                  </FormControl>
                </>
              </Toolbar>
            </Media>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                bgcolor: grey[100],
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronLeftIcon sx={{ color: blue[500] }} />
                ) : (
                  <ChevronRightIcon sx={{ color: blue[500] }} />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {user_id &&
                user_id.map((item) =>
                  item.role == "manager" ? (
                    <HomeButton_Blue goLink={`/home/manager/${user?.uid}`} />
                  ) : item.role == "teacher" ? (
                    <Media greaterThan="sm">
                      <HomeButton_Blue goLink={`/home/${user?.uid}`} />
                    </Media>
                  ) : (
                    <HomeButton_Blue goLink={`/home/students/${user?.uid}`} />
                  )
                )}
              {user_id &&
                user_id.map((item) =>
                  item.role == "manager" ? (
                    <ShiftButton_Blue
                      addShift={() => router.push(`/user/${user.uid}`)}
                      seeShift={() =>
                        router.push(`/shift/list/all/${user?.uid}`)
                      }
                    />
                  ) : (
                    item.role == "teacher" && (
                      <ShiftButton_Blue
                        addShift={() => router.push(`/user/edit/${user.uid}`)}
                        seeShift={() => router.push(`/shift/list/${user?.uid}`)}
                      />
                    )
                  )
                )}
              {user_id &&
                user_id.map((item) =>
                  item.role == "manager" ? (
                    <RsvButton goLink={`/reserve/manager/${user.uid}`} />
                  ) : (
                    item.role == "teacher" && (
                      <RsvButton goLink={`/reserve/${user.uid}`} />
                    )
                  )
                )}
            </List>
          </Drawer>
          <Main open={open}>
            <DrawerHeader />
          </Main>
        </Box>
      </MediaContextProvider>
    </>
  );
}
