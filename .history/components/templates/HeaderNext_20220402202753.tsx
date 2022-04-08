import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import AppBar from "@mui/material/AppBar";
import Link_mui from "@mui/material/Link";
import ListIcon from "@mui/icons-material/List";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useRouter } from "next/router";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import my File
import { useUser } from "../../hooks/user/useUserList";
import { useAuth } from "../../hooks/useUserAuth";

const drawerWidth = 210;
interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header(props: HeaderProps) {
  const { usersList, loadUser } = useUser();
  const { user } = useAuth();
  const router = useRouter();
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
          <>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, color: "#0288d1" }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                {user && user.displayName}
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
                {usersList &&
                  usersList.map(
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
                {usersList &&
                  usersList.map((item) =>
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
        <List>
          {usersList &&
            usersList.map((item) =>
              item.role == "manager" ? (
                <Link_mui href={`/home/manager/${user?.uid}`}>
                  <ListItem button key="Home">
                    <ListItemIcon>
                      <HomeIcon sx={{ color: "#e3f2fd" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="ホーム"
                      sx={{ color: "#e3f2fd", fontSize: "13px" }}
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
                      <ListItemText
                        primary="ホーム"
                        sx={{ color: "#e3f2fd", fontSize: "13px" }}
                      />
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
                      <ListItemText
                        primary="ホーム"
                        sx={{ color: "#e3f2fd", fontSize: "13px" }}
                      />
                    </ListItem>
                  </Link_mui>
                </>
              )
            )}
          {usersList &&
            usersList.map((item) =>
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
                          minWidth: 120,
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        <InputLabel
                          id="demo-simple-select-standard-label"
                          sx={{ color: "#e3f2fd", fontSize: "13px" }}
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
                            minWidth: 120,
                            textAlign: "center",
                            color: "#e3f2fd",
                          }}
                        >
                          <InputLabel
                            id="demo-simple-select-standard-label"
                            sx={{ color: "#e3f2fd", fontSize: "15px" }}
                          >
                            シフト管理
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
          {usersList &&
            usersList.map((item) =>
              item.role == "manager" ? (
                <>
                  <Link_mui href={`/reserve/manager/${user.uid}`}>
                    <ListItem button key="Home">
                      <ListItemIcon>
                        <DateRangeIcon sx={{ color: "#e3f2fd", mt: 2 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="予約確認 / 登録"
                        sx={{ color: "#e3f2fd", fontSize: "13px", mt: 2 }}
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
                          <DateRangeIcon sx={{ color: "#e3f2fd", mt: 2 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="予約確認 / 登録"
                          sx={{ color: "#e3f2fd", fontSize: "13px", mt: 2 }}
                        />
                      </ListItem>
                    </Link_mui>
                  </>
                )
              )
            )}
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
