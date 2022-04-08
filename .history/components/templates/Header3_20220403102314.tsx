import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import AppBar from "../atoms/Header/AppBar/AppBar2";
import DrawerHeader from "../atoms/Header/Drawer/DrawerHeader";
import Main from "../atoms/Header/Main";
const drawerWidth = 240;

export default function Header_SinglePage() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <>
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 1, fontFamily: "Comic Sans MS", fontSize: 20 }}
              component="div"
            >
              Reserve App ver.0.5
            </Typography>
          </>
        </Toolbar>
      </AppBar>
      <Main>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
