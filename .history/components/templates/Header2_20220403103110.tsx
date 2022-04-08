import React from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useAuth } from "../../hooks/useUserAuth";
import Main from "../atoms/Header/Main";
import DrawerHeader from "../atoms/Header/Drawer/DrawerHeader";
import AppBar from "../atoms/Header/AppBar/AppBar2";

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
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ color: "white" }}
              >
                {user && user.displayName}
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
              >
                <MenuItem>
                  <Button
                    onClick={() => router.push(`/home/students/${user?.uid}`)}
                  >
                    ホーム
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    onClick={() =>
                      router.push(`/user/profile/student/${user?.uid}`)
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
        </Toolbar>
      </AppBar>
      <Main>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
