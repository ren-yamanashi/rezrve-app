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
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import AppBar from "@mui/material/AppBar";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Link_mui from "@mui/material/Link";
import GroupIcon from "@mui/icons-material/Group";
import ListIcon from "@mui/icons-material/List";
import ChatIcon from "@mui/icons-material/Chat";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useRouter } from "next/router";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { blue } from "@mui/material/colors";
import { browser } from "process";

const drawerWidth = 240;
interface HeaderProps {
  children?: React.ReactNode;
}
/**===============
 * @returns Header　コンポーネントの作成
 *=============*/
export default function Header(props: HeaderProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [test, setTest] = useState<string>("");
  const [test2, setTest2] = useState<string>("");
  const router = useRouter();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    async function load() {
      const u = user;
      setTest(u.displayName);
      setTest2(u.email);
    }
    load();
  }, [process, browser, user]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#FFFFFE",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              fontFamily: "Comic Sans MS",
              fontSize: 35,
              color: "#0288d1",
            }}
            component="div"
          >
            Bee Music School
          </Typography>
          <>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                {test}
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
              >
                <MenuItem>
                  <Button
                    onClick={() => router.push(`/user/profile/${user?.uid}`)}
                  >
                    アカウントを編集
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button onClick={() => router.push(`/user/login`)}>
                    ログアウト
                  </Button>
                </MenuItem>
              </Select>
            </FormControl>
          </>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#0288d1",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {test2.indexOf("@bee") !== -1 ? (
            <Link_mui href={`/home/${user?.uid}`}>
              <ListItem button key="Home">
                <ListItemIcon>
                  <HomeIcon sx={{ color: "#e3f2fd" }} />
                </ListItemIcon>
                <ListItemText primary="ホーム" sx={{ color: "#e3f2fd" }} />
              </ListItem>
            </Link_mui>
          ) : (
            <>
              <Link_mui href={`/home/students/${user?.uid}`}>
                <ListItem button key="Home">
                  <ListItemIcon>
                    <HomeIcon sx={{ color: "#e3f2fd" }} />
                  </ListItemIcon>
                  <ListItemText primary="ホーム" sx={{ color: "#e3f2fd" }} />
                </ListItem>
              </Link_mui>
            </>
          )}
          {test2.indexOf("@bee") === -1 && (
            <>
              <Link_mui href={`/reserve/students/list/${user?.uid}`}>
                <ListItem button key="Home">
                  <ListItemIcon>
                    <ListIcon sx={{ color: "#e3f2fd", mt: 1 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="予約確認"
                    sx={{ color: "#e3f2fd", mt: 2 }}
                  />
                </ListItem>
              </Link_mui>
            </>
          )}
          {test2.indexOf("@bee") === -1 && (
            <>
              <Link_mui href={`/reserve/students/list/${user?.uid}`}>
                <ListItem button key="Add">
                  <ListItemIcon>
                    <ListIcon sx={{ color: "#e3f2fd", mt: 2 }} />
                  </ListItemIcon>
                  <>
                    <FormControl
                      variant="standard"
                      sx={{
                        minWidth: 100,
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      <InputLabel
                        id="demo-simple-select-standard-label"
                        sx={{ color: "white" }}
                      >
                        予約登録
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                      >
                        <MenuItem>
                          <Button
                            onClick={() =>
                              router.push(`/user/profile/${user?.uid}`)
                            }
                          >
                            アカウントを編集
                          </Button>
                        </MenuItem>
                        <MenuItem>
                          <Button onClick={() => router.push(`/user/login`)}>
                            ログアウト
                          </Button>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </>
                </ListItem>
              </Link_mui>
            </>
          )}
          <Link_mui href={`/chat/${user?.uid}`}>
            <ListItem button key="Chat">
              <ListItemIcon>
                <ChatIcon sx={{ color: "#e3f2fd" }} />
              </ListItemIcon>
              <ListItemText primary="みんなの声" sx={{ color: "#e3f2fd" }} />
            </ListItem>
          </Link_mui>
          <Divider />
          {test2.indexOf("@bee") !== -1 && (
            <Link_mui href={`/user/profile/${user?.uid}`}>
              <ListItem button key="profile">
                <ListItemIcon>
                  <PersonIcon sx={{ color: "#e3f2fd" }} />
                </ListItemIcon>
                <ListItemText primary="プロフィール" />
              </ListItem>
            </Link_mui>
          )}
          {test2.indexOf("@bee") !== -1 && (
            <Link_mui href={`/user/${user?.uid}`}>
              <ListItem button key="teachers">
                <ListItemIcon>
                  <GroupIcon sx={{ color: "#e3f2fd" }} />
                </ListItemIcon>
                <ListItemText primary="講師一覧" />
              </ListItem>
            </Link_mui>
          )}
          <Divider />

          {test2.indexOf("@bee") !== -1 && (
            <Link_mui href={`/reserve/${user?.uid}`}>
              <ListItem button key="List">
                <ListItemIcon>
                  <ListIcon sx={{ color: blue[500] }} />
                </ListItemIcon>
                <ListItemText primary="予約一覧" />
              </ListItem>
            </Link_mui>
          )}
          {test2.indexOf("@bee") !== -1 && (
            <Link_mui href={`/shift/${user?.uid}`}>
              <ListItem button key="AddReserve">
                <ListItemIcon>
                  <AddIcon sx={{ color: blue[500] }} />
                </ListItemIcon>
                <ListItemText primary="予約登録" />
              </ListItem>
            </Link_mui>
          )}
          {test2.indexOf("@bee") !== -1 && (
            <Link_mui href={`/calender/${user?.uid}`}>
              <ListItem button key="Schedule">
                <ListItemIcon>
                  <ScheduleIcon sx={{ color: blue[500] }} />
                </ListItemIcon>
                <ListItemText primary="スケジュール" />
              </ListItem>
            </Link_mui>
          )}
          {test2.indexOf("@bee") !== -1 && (
            <Link_mui href={`/calender2/${user?.uid}`}>
              <ListItem button key="Calender">
                <ListItemIcon>
                  <DateRangeIcon sx={{ color: blue[500] }} />
                </ListItemIcon>
                <ListItemText primary="カレンダー" />
              </ListItem>
            </Link_mui>
          )}
          <Divider />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
