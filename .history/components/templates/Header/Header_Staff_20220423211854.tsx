import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import { useRouter } from "next/router";
import FormControl from "@mui/material/FormControl";
// import my File
import { useUser } from "../../../hooks/firebase/user/useUserList";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import CreateShiftModal from "../Modal/CreateShift_manager";
import AppBarComponent from "../../atoms/Header/AppBar/AppBar";
import InputLabelComponent from "../../atoms/Header/InputLabel/InputLabel";
import SelectComponent from "../../atoms/Header/Select";
import MenuItemComponent from "../../atoms/Header/MenuItem";
import DrawerComponent from "../../atoms/Header/Drawer/Drawer";
import HomeButton from "../../atoms/Header/Button/HomeButton";
import RsvButton from "../../atoms/Header/Button/RsvButton";
import ShiftButton from "../../atoms/Header/Button/ShiftButton3";
interface HeaderProps {
  children?: React.ReactNode;
}

const MainHeader_Staff = (props: HeaderProps) => {
  const { user_id } = useUser();
  const { user } = useAuth();
  const router = useRouter();
  return (
    <>
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
                    buttonText={"アカウント情報編集"}
                    style={{ display: "block", width: "100%" }}
                  />
                  <MenuItemComponent
                    clickEvent={() => router.push(`/login/staff`)}
                    buttonText={"ログアウト"}
                    style={{ display: "block", width: "100%" }}
                  />
                </SelectComponent>
              </FormControl>
            </>
          </Toolbar>
        </AppBarComponent>
        <DrawerComponent>
          <Toolbar />
          <List>
            <HomeButton goLink={"/staff/home/"} />
            <ShiftButton goLink={"/staff/shift/"} />
            <RsvButton goLink={"/staff/reserve/"} />
          </List>
        </DrawerComponent>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          {props.children}
        </Box>
      </Box>
    </>
  );
};

export default MainHeader_Staff;
