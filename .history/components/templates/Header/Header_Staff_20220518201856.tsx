import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import { useRouter } from "next/router";
import FormControl from "@mui/material/FormControl";
// import my File
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useSignOut } from "../../../hooks/firebase/user/useSign";
import { Query } from "../../../models/router_query";
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
  const { user } = useAuth();
  const router = useRouter();
  const query = router.query as Query;
  const { loadSingOut } = useSignOut();
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarComponent>
          <Toolbar>
            <>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 150, color: "#0288d1" }}
              >
                <InputLabelComponent>
                  {!user ? "テスト" : user.userName}
                </InputLabelComponent>
                <SelectComponent>
                  <MenuItemComponent
                    clickEvent={() =>
                      loadSingOut().then(() => router.push("/login/staff/"))
                    }
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
            <HomeButton goLink={`/staff/${query?.id}/home/`} />
            <ShiftButton goLink={`/staff/${query?.uid}/shift/`} />
            <RsvButton goLink={`/staff/${query?.uid}/reserve/`} />
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
