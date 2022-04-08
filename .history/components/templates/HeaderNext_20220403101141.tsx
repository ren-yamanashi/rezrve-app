import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListIcon from "@mui/icons-material/List";
import { useRouter } from "next/router";
import FormControl from "@mui/material/FormControl";
// import my File
import { useUser } from "../../hooks/user/useUserList";
import { useAuth } from "../../hooks/useUserAuth";
import AppBarComponent from "../atoms/Header/AppBar/AppBar";
import InputLabelComponent from "../atoms/Header/InputLabel";
import InputLabelComponent2 from "../atoms/Header/InputLabel_white";
import SelectComponent from "../atoms/Header/Select";
import MenuItemComponent from "../atoms/Header/MenuItem";
import DrawerComponent from "../atoms/Header/Drawer";
import HomeButton from "../atoms/Header/HomeButton";
import RsvButton from "../atoms/Header/RsvButton";

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header(props: HeaderProps) {
  const { user_id } = useUser();
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
                {user_id &&
                  user_id.map(
                    (item) =>
                      item.role == "manager" && (
                        <MenuItemComponent
                          clickEvent={() => router.push(`/user/${user?.uid}`)}
                          buttonText={"講師一覧"}
                        />
                      )
                  )}
                {user_id &&
                  user_id.map((item) =>
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
          {user_id &&
            user_id.map((item) =>
              item.role == "manager" ? (
                <HomeButton goLink={`/home/manager/${user?.uid}`} />
              ) : item.role == "teacher" ? (
                <HomeButton goLink={`/home/${user?.uid}`} />
              ) : (
                <HomeButton goLink={`/home/students/${user?.uid}`} />
              )
            )}
          {user_id &&
            user_id.map((item) =>
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
                          <MenuItemComponent
                            clickEvent={() =>
                              router.push(`/shift/list/all/${user?.uid}`)
                            }
                            buttonText={"シフト確認"}
                          />
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
                          <InputLabelComponent2>
                            シフト管理
                          </InputLabelComponent2>
                          <SelectComponent>
                            <MenuItemComponent
                              clickEvent={() =>
                                router.push(`/user/edit/${user.uid}`)
                              }
                              buttonText={"シフト登録"}
                            />
                            <MenuItemComponent
                              clickEvent={() =>
                                router.push(`/shift/list/${user?.uid}`)
                              }
                              buttonText={"シフト確認"}
                            />
                          </SelectComponent>
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
                <RsvButton goLink={`/reserve/manager/${user.uid}`} />
              ) : (
                item.role == "teacher" && (
                  <RsvButton goLink={`/reserve/${user.uid}`} />
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
