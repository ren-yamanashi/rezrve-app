import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import AppBar from "../../atoms/Header/AppBar/AppBar2";
import DrawerHeader from "../../atoms/Header/Drawer/DrawerHeader";
import Main from "../../atoms/Header/Main";

export default function Header_SinglePage() {
  return (
    <Box sx={{ display: "flex", bgcolor: "white" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <>
            <a href="#top">
              <Typography
                variant="h6"
                noWrap
                sx={{ flexGrow: 1, fontFamily: "Comic Sans MS", fontSize: 20 }}
                component="div"
              >
                REZRVE
              </Typography>
            </a>
          </>
        </Toolbar>
      </AppBar>
      <Main>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
