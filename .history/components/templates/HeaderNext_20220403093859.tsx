import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
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
import AppBarComponent from "../atoms/Header/AppBar";
import InputLabelComponent from "../atoms/Header/InputLabel";
import InputLabelComponent2 from "../atoms/Header/InputLabel_white";
import SelectComponent from "../atoms/Header/Select";
import MenuItemComponent from "../atoms/Header/MenuItem";
import DrawerComponent from "../atoms/Header/Drawer";
import HomeButton from "../atoms/Header/HomeButton";

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
      <AppBarComponent>
        <Toolbar>
          <>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, color: "#0288d1" }}
            >
              <InputLabelComponent>
                {user && user.displayName}
              </InputLabelComponent>
              <SelectComponent>
                <MenuItemComponent
                  clickEvent={() => router.push(`/user/profile/${user?.uid}`)}
                  buttonText={"アカウントを編集"}
                />
                {usersList &&
                  usersList.map(
                    (item) =>
                      item.role == "manager" && (
                        <MenuItemComponent
                          clickEvent={() => router.push(`/user/${user?.uid}`)}
                          buttonText={"講師一覧"}
                        />
                      )
                  )}
                {usersList &&
                  usersList.map((item) =>
                    item.role == "manager" ? (
                      <MenuItemComponent
                        clickEvent={() => router.push(`/user/login/manager`)}
                        buttonText={"ログアウト"}
                      />
                    ) : item.role == "teacher" ? (
                      <MenuItemComponent
                        clickEvent={() => router.push(`/user/login/teacher`)}
                        buttonText={"ログアウト"}
                      />
                    ) : (
                      <MenuItemComponent
                        clickEvent={() => router.push(`/user/login`)}
                        buttonText={"ログアウト"}
                      />
                    )
                  )}
              </SelectComponent>
            </FormControl>
          </>
        </Toolbar>
      </AppBarComponent>
      <DrawerComponent>
        <Toolbar />
        <List>
          {usersList &&
            usersList.map((item) =>
              item.role == "manager" ? (
                <HomeButton goLink={`/home/manager/${user?.uid}`} />
              ) : item.role == "teacher" ? (
                <HomeButton goLink={`/home/${user?.uid}`} />
              ) : (
                <HomeButton goLink={`/home/students/${user?.uid}`} />
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
                        <InputLabelComponent2>
                          スタッフシフト
                        </InputLabelComponent2>
                        <SelectComponent>
                          <MenuItemComponent
                            clickEvent={() => router.push(`/user/${user.uid}`)}
                            buttonText={"シフト登録"}
                          />

                          <MenuItem>
                            <Button
                              onClick={() =>
                                router.push(`/shift/list/all/${user?.uid}`)
                              }
                            >
                              シフト確認
                            </Button>
                          </MenuItem>
                        </SelectComponent>
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
      </DrawerComponent>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
