import React from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import { useAuth } from "../../hooks/useUserAuth";
import Main from "../atoms/Header/Main";
import DrawerHeader from "../atoms/Header/Drawer/DrawerHeader";
import AppBar from "../atoms/Header/AppBar/AppBar2";
import InputLabelComponent2 from "../atoms/Header/InputLabel/InputLabel_white";
import SelectComponent from "../atoms/Header/Select";
import MenuItemComponent from "../atoms/Header/MenuItem";
export default function Header2() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <>
            <FormControl
              variant="standard"
              sx={{ mb: 1, minWidth: 120, color: "#0288d1" }}
            >
              <InputLabelComponent2>
                {user && user.displayName}
              </InputLabelComponent2>
              <SelectComponent>
                <MenuItemComponent
                  clickEvent={() => router.push(`/home/students/${user?.uid}`)}
                  buttonText={"ホーム"}
                  style={{ display: "block", width: "100%" }}
                />
                <MenuItemComponent
                  clickEvent={() =>
                    router.push(`/user/profile/student/${user?.uid}`)
                  }
                  buttonText={"アカウントを編集"}
                  style={{ display: "block", width: "100%" }}
                />
                <MenuItemComponent
                  clickEvent={() => router.push(`/user/login`)}
                  buttonText={"ログアウト"}
                  style={{ display: "block", width: "100%" }}
                />
              </SelectComponent>
            </FormControl>
          </>
        </Toolbar>
      </AppBar>
      <Main>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
