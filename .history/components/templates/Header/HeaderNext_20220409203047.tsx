import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import { useRouter } from "next/router";
import FormControl from "@mui/material/FormControl";
// import my File
import { useUser } from "../../../hooks/user/useUserList";
import { useAuth } from "../../../hooks/useUserAuth";
import AppBarComponent from "../../atoms/Header/AppBar/AppBar";
import InputLabelComponent from "../../atoms/Header/InputLabel/InputLabel";
import SelectComponent from "../../atoms/Header/Select";
import MenuItemComponent from "../../atoms/Header/MenuItem";
import DrawerComponent from "../../atoms/Header/Drawer/Drawer";
import HomeButton from "../../atoms/Header/Button/HomeButton";
import RsvButton from "../../atoms/Header/Button/RsvButton";
import ShiftButton from "../../atoms/Header/Button/ShiftButton";
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
                  style={{ display: "block", width: "100%" }}
                />
                {user_id &&
                  user_id.map(
                    (item) =>
                      item.role == "manager" && (
                        <MenuItemComponent
                          clickEvent={() =>
                            router.push(`/user/userList/${user?.uid}`)
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
                        clickEvent={() => router.push(`/login/manager`)}
                        buttonText={"ログアウト"}
                        style={{ display: "block", width: "100%" }}
                      />
                    ) : item.role == "teacher" ? (
                      <MenuItemComponent
                        clickEvent={() => router.push(`/login/teacher`)}
                        buttonText={"ログアウト"}
                        style={{ display: "block", width: "100%" }}
                      />
                    ) : (
                      <MenuItemComponent
                        clickEvent={() => router.push(`/login/students`)}
                        buttonText={"ログアウト"}
                        style={{ display: "block", width: "100%" }}
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
                <HomeButton goLink={`/home/teacher/${user?.uid}`} />
              ) : (
                <HomeButton goLink={`/home/students/${user?.uid}`} />
              )
            )}
          {user_id &&
            user_id.map((item) =>
              item.role == "manager" ? (
                <ShiftButton
                  addShift={() => router.push(`/user/userList/${user.uid}`)}
                  seeShift={() => router.push(`/shift/list/all/${user?.uid}`)}
                />
              ) : (
                item.role == "teacher" && (
                  <ShiftButton
                    addShift={() => router.push(`/shift/create/${user.uid}`)}
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