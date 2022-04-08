import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import AppBar from "../atoms/Header/AppBar/AppBar2";
import DrawerHeader from "../atoms/Header/Drawer/DrawerHeader";
const drawerWidth = 240;

/**========
 * main スタイルのカスタマイズ
 *=========*/
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

export default function Header2() {
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
