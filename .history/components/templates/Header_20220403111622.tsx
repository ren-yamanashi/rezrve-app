import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Link_mui from "@mui/material/Link";
import ListIcon from "@mui/icons-material/List";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useRouter } from "next/router";
import { createMedia } from "@artsy/fresnel";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { useUser } from "../../hooks/user/useUserList";
import { blue, grey, teal } from "@mui/material/colors";
import InputLabelComponent2 from "../atoms/Header/InputLabel/InputLabel_white";
import SelectComponent from "../atoms/Header/Select";
import MenuItemComponent from "../atoms/Header/MenuItem";
import DrawerComponent from "../atoms/Header/Drawer/Drawer";
import Main from "../atoms/Header/Main";
import AppBarComponent from "../atoms/Header/AppBar/AppBar";
import DrawerHeader from "../atoms/Header/Drawer/DrawerHeader";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 450,
    lg: 990,
    xl: 1200,
  },
});

const drawerWidth = 210;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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
          <AppBar position="fixed" open={open}>
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
                      />
                      {user_id &&
                        user_id.map(
                          (item) =>
                            item.role == "manager" && (
                              <MenuItemComponent
                                clickEvent={() =>
                                  router.push(`/user/${user?.uid}`)
                                }
                                buttonEvent={"講師一覧"}
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
                    <Link_mui href={`/home/manager/${user?.uid}`}>
                      <ListItem button key="Home">
                        <ListItemIcon>
                          <HomeIcon sx={{ color: blue[500] }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="ホーム"
                          sx={{ color: blue[500], fontSize: "13px" }}
                        />
                      </ListItem>
                    </Link_mui>
                  ) : item.role == "teacher" ? (
                    <Media greaterThan="sm">
                      <>
                        <Link_mui href={`/home/${user?.uid}`}>
                          <ListItem button key="Home">
                            <ListItemIcon>
                              <HomeIcon sx={{ color: blue[500] }} />
                            </ListItemIcon>
                            <ListItemText
                              primary="ホーム"
                              sx={{ color: blue[500], fontSize: "13px" }}
                            />
                          </ListItem>
                        </Link_mui>
                      </>
                    </Media>
                  ) : (
                    <>
                      <Link_mui href={`/home/students/${user?.uid}`}>
                        <ListItem button key="Home">
                          <ListItemIcon>
                            <HomeIcon sx={{ color: blue[500] }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="ホーム"
                            sx={{ color: blue[500], fontSize: "13px" }}
                          />
                        </ListItem>
                      </Link_mui>
                    </>
                  )
                )}
              {user_id &&
                user_id.map((item) =>
                  item.role == "manager" ? (
                    <>
                      <ListItem button key="Add">
                        <ListItemIcon>
                          <ListIcon sx={{ color: blue[500], mt: 2 }} />
                        </ListItemIcon>
                        <>
                          <FormControl
                            variant="standard"
                            sx={{
                              minWidth: 120,
                              textAlign: "center",
                              color: "white",
                            }}
                          >
                            <InputLabel
                              id="demo-simple-select-standard-label"
                              sx={{ color: blue[500], fontSize: "13px" }}
                            >
                              スタッフシフト
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-standard-label"
                              id="demo-simple-select-standard"
                            >
                              <MenuItem>
                                <Button
                                  onClick={() =>
                                    router.push(`/user/${user.uid}`)
                                  }
                                >
                                  シフト登録
                                </Button>
                              </MenuItem>
                              <MenuItem>
                                <Button
                                  onClick={() =>
                                    router.push(`/shift/list/all/${user?.uid}`)
                                  }
                                >
                                  シフト確認
                                </Button>
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </>
                      </ListItem>
                    </>
                  ) : (
                    item.role == "teacher" && (
                      <>
                        <ListItem button key="Add">
                          <ListItemIcon>
                            <ListIcon sx={{ color: blue[500], mt: 2 }} />
                          </ListItemIcon>
                          <>
                            <FormControl
                              variant="standard"
                              sx={{
                                minWidth: 120,
                                textAlign: "center",
                                color: blue[500],
                              }}
                            >
                              <InputLabel
                                id="demo-simple-select-standard-label"
                                sx={{ color: blue[500], fontSize: "13px" }}
                              >
                                スタッフシフト
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                              >
                                <MenuItem>
                                  <Button
                                    onClick={() =>
                                      router.push(`/user/edit/${user.uid}`)
                                    }
                                  >
                                    シフト登録
                                  </Button>
                                </MenuItem>
                                <MenuItem>
                                  <Button
                                    onClick={() =>
                                      router.push(`/shift/list/${user?.uid}`)
                                    }
                                  >
                                    シフト確認
                                  </Button>
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </>
                        </ListItem>
                      </>
                    )
                  )
                )}
              {user_id &&
                user_id.map((item) =>
                  item.role == "manager" ? (
                    <>
                      <Link_mui href={`/reserve/manager/${user.uid}`}>
                        <ListItem button key="Home">
                          <ListItemIcon>
                            <DateRangeIcon sx={{ color: blue[500], mt: 1 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="予約確認 / 登録"
                            sx={{ color: blue[500], mt: 2, fontSize: "13px" }}
                          />
                        </ListItem>
                      </Link_mui>
                      <Divider />
                    </>
                  ) : (
                    item.role == "teacher" && (
                      <>
                        <Link_mui href={`/reserve/${user.uid}`}>
                          <ListItem button key="Home">
                            <ListItemIcon>
                              <DateRangeIcon sx={{ color: blue[500], mt: 1 }} />
                            </ListItemIcon>
                            <ListItemText
                              primary="予約確認 / 登録"
                              sx={{ color: blue[500], mt: 2, fontSize: "13px" }}
                            />
                          </ListItem>
                        </Link_mui>
                        <Divider />
                      </>
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
