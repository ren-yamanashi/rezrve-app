import React, { useEffect, useState } from "react";
import Link from "next/link";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Link_mui from "@mui/material/Link";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";

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
 * @returns Header　コンポーネントの作成
 *=============*/
export default function Header() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            メニュー
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link_mui href="/user/login">
            <ListItem button key="Sign out">
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="ログアウト" />
            </ListItem>
          </Link_mui>
          <Link_mui href={`/user/${user?.uid}`}>
            <ListItem button key="AddReserve">
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="講師一覧" />
            </ListItem>
          </Link_mui>
          <Link_mui href={`/user/edit/${user?.uid}`}>
            <ListItem button key="AddReserve">
              <ListItemIcon>
                <PersonAddAltIcon />
              </ListItemIcon>
              <ListItemText primary="ユーザー情報" />
            </ListItem>
          </Link_mui>
          <Divider />
          <Link_mui href={`/shift/add/${user?.uid}`}>
            <ListItem button key="CreateShift">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="シフト登録" />
            </ListItem>
          </Link_mui>

          <Divider />
          <Link_mui href={`/reserve/${user?.uid}`}>
            <ListItem button key="Home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="ホーム" />
            </ListItem>
          </Link_mui>
          <Link_mui href={`/calender/${user?.uid}`}>
            <ListItem button key="Schedule">
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary="スケジュール" />
            </ListItem>
          </Link_mui>
          <Link_mui href={`/calender2/${user?.uid}`}>
            <ListItem button key="Calender">
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText primary="カレンダー" />
            </ListItem>
          </Link_mui>
          <Link_mui href={`/shift/${user?.uid}`}>
            <ListItem button key="AddReserve">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="予約登録" />
            </ListItem>
          </Link_mui>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
