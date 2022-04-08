import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import AppBarComponent from "../atoms/Header/AppBar";
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
/**========
 * メニューバーの型定義
 *=========*/
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
/**========
 * MuiAppBar スタイルのカスタマイズ
 *=========*/
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));
/**========
 * div スタイルのカスタマイズ
 *=========*/
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));
/**===============
 * @returns Header2　コンポーネントの作成 これはログイン/サインインページで使用する
 *=============*/
export default function Header2() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarComponent>
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
      </AppBarComponent>
      <Main>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
