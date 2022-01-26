import React, { useState } from "react";
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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { User } from "../../models/User";
import styles from "./Header.module.scss";

const drawerWidth = 240;

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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState<User>();
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <React.Fragment>
      <div className={styles.root}>
        <header id="header" className={styles.header}>
          <div className={styles.logo}>
            <Link href="/user/login">
              <a className={styles.logo}>Home</a>
            </Link>
          </div>
          <div className={styles.container}>
            <div className={styles.humburger} onClick={() => menuFunction()}>
              <span className={openMenu ? styles.open : undefined}></span>
              <span className={openMenu ? styles.open : undefined}></span>
              <p className={openMenu ? styles.open : undefined}>Menu</p>
            </div>
          </div>
        </header>
        <div
          className={`${styles.drawerMenu} ${
            openMenu ? styles.open : undefined
          }`}
        >
          <ul>
            <div className={styles.close} onClick={() => menuFunction()}>
              <span></span>
              <span></span>
              <p>Close</p>
            </div>
            <li>
              <Link href="/user/login">
                <a>
                  <p className={styles.mainTitle}>ログイン</p>
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/reserve/${user?.uid}`}>
                <a>
                  <p className={styles.mainTitle}>固定予約一覧表</p>
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/user/login`}>
                <a>
                  <p className={styles.mainTitle}>Home</p>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
