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

import { blue } from "@mui/material/colors";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { browser } from "process";
import { Users } from "../../models/Users";
import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const drawerWidth = 200;
interface HeaderProps {
  children?: React.ReactNode;
}
/**===============
 * @returns Header　コンポーネントの作成
 *=============*/
export default function Header(props: HeaderProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [u, setU] = useState<Users[]>([]);
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
      const db = getFirestore();
      setTest(u.displayName);
      setTest2(u.email);
      const q = query(collection(db, "users"), where("id", "==", user.uid));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //ReserveList一覧の展開
      const gotUsers = snapshot.docs.map((doc) => {
        const user = doc.data() as Users;
        user.id = doc.id;
        return user;
      });
      setU(gotUsers);
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
            Next Reserve App
          </Typography>
          <>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, color: "#0288d1" }}
            >
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
                {u.map(
                  (item) =>
                    item.role == "manager" && (
                      <MenuItem>
                        <Button
                          onClick={() => router.push(`/user/${user?.uid}`)}
                        >
                          講師一覧
                        </Button>
                      </MenuItem>
                    )
                )}
                {u.map((item) =>
                  item.role == "manager" ? (
                    <MenuItem>
                      <Button
                        onClick={() => router.push(`/user/login/manager`)}
                      >
                        ログアウト
                      </Button>
                    </MenuItem>
                  ) : item.role == "teacher" ? (
                    <MenuItem>
                      <Button
                        onClick={() => router.push(`/user/login/teacher`)}
                      >
                        ログアウト
                      </Button>
                    </MenuItem>
                  ) : (
                    <MenuItem>
                      <Button onClick={() => router.push(`/user/login`)}>
                        ログアウト
                      </Button>
                    </MenuItem>
                  )
                )}
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
          {u.map((item) =>
            item.role == "manager" ? (
              <Link_mui href={`/home/manager/${user?.uid}`}>
                <ListItem button key="Home">
                  <ListItemIcon>
                    <HomeIcon sx={{ color: "#e3f2fd" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="ホーム"
                    sx={{ color: "#e3f2fd", fontSize: "20px" }}
                  />
                </ListItem>
              </Link_mui>
            ) : item.role == "teacher" ? (
              <>
                <Link_mui href={`/home/${user?.uid}`}>
                  <ListItem button key="Home">
                    <ListItemIcon>
                      <HomeIcon sx={{ color: "#e3f2fd" }} />
                    </ListItemIcon>
                    <ListItemText primary="ホーム" sx={{ color: "#e3f2fd" }} />
                  </ListItem>
                </Link_mui>
              </>
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
            )
          )}
          {u.map((item) =>
            item.role == "manager" ? (
              <>
                <ListItem button key="Add">
                  <ListItemIcon>
                    <ListIcon sx={{ color: "#e3f2fd", mt: 2 }} />
                  </ListItemIcon>
                  <>
                    <FormControl
                      variant="standard"
                      sx={{
                        minWidth: 140,
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      <InputLabel
                        id="demo-simple-select-standard-label"
                        sx={{ color: "white" }}
                      >
                        スタッフシフト
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                      >
                        <MenuItem>
                          <Button
                            onClick={() => router.push(`/user/${user.uid}`)}
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
              // <>
              //   <Link_mui href={`/shift/list/all/${user?.uid}`}>
              //     <ListItem button key="Shift">
              //       <ListItemIcon>
              //         <ListIcon sx={{ color: "#e3f2fd", mt: 1 }} />
              //       </ListItemIcon>
              //       <ListItemText
              //         primary="シフト確認"
              //         sx={{ color: "#e3f2fd", mt: 2 }}
              //       />
              //     </ListItem>
              //   </Link_mui>
              // </>
              item.role == "teacher" && (
                <>
                  <ListItem button key="Add">
                    <ListItemIcon>
                      <ListIcon sx={{ color: "#e3f2fd", mt: 2 }} />
                    </ListItemIcon>
                    <>
                      <FormControl
                        variant="standard"
                        sx={{
                          minWidth: 140,
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        <InputLabel
                          id="demo-simple-select-standard-label"
                          sx={{ color: "white" }}
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
          {u.map((item) =>
            item.role == "manager" ? (
              <>
                <Link_mui href={`/reserve/manager/${user.uid}`}>
                  <ListItem button key="Home">
                    <ListItemIcon>
                      <ListIcon sx={{ color: "#e3f2fd", mt: 1 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="予約確認 / 登録"
                      sx={{ color: "#e3f2fd", mt: 2 }}
                    />
                  </ListItem>
                </Link_mui>
              </>
            ) : (
              item.role == "teacher" && (
                <>
                  <Link_mui href={`/reserve/${user.uid}`}>
                    <ListItem button key="Home">
                      <ListItemIcon>
                        <ListIcon sx={{ color: "#e3f2fd", mt: 1 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="予約確認 / 登録"
                        sx={{ color: "#e3f2fd", mt: 2 }}
                      />
                    </ListItem>
                  </Link_mui>
                </>
              )
            )
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
