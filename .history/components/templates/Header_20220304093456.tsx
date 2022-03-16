import React, { useEffect, useState } from "react";
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
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Link_mui from "@mui/material/Link";
import GroupIcon from "@mui/icons-material/Group";
import ListIcon from "@mui/icons-material/List";
import ChatIcon from "@mui/icons-material/Chat";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useRouter } from "next/router";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { blue } from "@mui/material/colors";
import { browser } from "process";
import { Users } from "../../models/Users";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const drawerWidth = 210;

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
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
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
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  justifyContent: "flex-end",
}));
/**===============
 * @returns Header　コンポーネントの作成
 *=============*/
export default function Header() {
  const [u, setU] = useState<Users[]>([]);
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [test, setTest] = useState<string>("");
  const [test2, setTest2] = useState<string>("");
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    async function load() {
      const u = user;
      const db = getFirestore();
      setTest(u.displayName);
      setTest2(u.email);
      const q = query(collection(db, "users"), where("id", "==", user.uid));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //ReserveList一覧の展開
      const gotUsers = snapshot.docs.map((doc) => {
        const user = doc.data() as Users;
        user.id = doc.id;
        return user;
      });
      setU(gotUsers);
    }
    load();
  }, [process, browser, user]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              fontFamily: "Comic Sans MS",
              fontSize: 25,
              ml: 5,
            }}
            component="div"
          >
            Next Reserve App
          </Typography>
          <>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120, color: "#0288d1" }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                {test}
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
              >
                <MenuItem>
                  <Button
                    onClick={() => router.push(`/user/profile/${user?.uid}`)}
                  >
                    アカウントを編集
                  </Button>
                </MenuItem>
                {u.map(
                  (item) =>
                    item.role == "manager" && (
                      <MenuItem>
                        <Button
                          onClick={() => router.push(`/user/${user?.uid}`)}
                        >
                          講師一覧
                        </Button>
                      </MenuItem>
                    )
                )}
                {u.map((item) =>
                  item.role == "manager" ? (
                    <MenuItem>
                      <Button
                        onClick={() => router.push(`/user/login/manager`)}
                      >
                        ログアウト
                      </Button>
                    </MenuItem>
                  ) : item.role == "teacher" ? (
                    <MenuItem>
                      <Button
                        onClick={() => router.push(`/user/login/teacher`)}
                      >
                        ログアウト
                      </Button>
                    </MenuItem>
                  ) : (
                    <MenuItem>
                      <Button onClick={() => router.push(`/user/login`)}>
                        ログアウト
                      </Button>
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon sx={{ color: blue[500] }} />
            ) : (
              <ChevronRightIcon sx={{ color: blue[500] }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <List>
            <Link_mui href="/user/login">
              <ListItem button key="Sign out">
                <ListItemIcon>
                  <LogoutIcon sx={{ color: blue[500] }} />
                </ListItemIcon>
                <ListItemText primary="ログアウト" />
              </ListItem>
            </Link_mui>
            <>
              <Link_mui href={`/home/students/${user?.uid}`}>
                <ListItem button key="Home">
                  <ListItemIcon>
                    <HomeIcon sx={{ color: blue[500] }} />
                  </ListItemIcon>
                  <ListItemText primary="ホーム" />
                </ListItem>
              </Link_mui>
              <>
                <Link_mui href={`/reserve/students/list/${user?.uid}`}>
                  <ListItem button key="List">
                    <ListItemIcon>
                      <ListIcon sx={{ color: blue[500] }} />
                    </ListItemIcon>
                    <ListItemText primary="予約確認" />
                  </ListItem>
                </Link_mui>
              </>
              <>
                <ListItem button key="List">
                  <ListItemIcon>
                    <AddIcon sx={{ color: blue[500], mt: 2 }} />
                  </ListItemIcon>
                  <>
                    <FormControl
                      variant="standard"
                      sx={{
                        minWidth: 100,
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      <InputLabel
                        id="demo-simple-select-standard-label"
                        sx={{ color: blue[600] }}
                      >
                        予約登録
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                      >
                        <MenuItem>
                          <Button
                            onClick={() =>
                              router.push(`/shift/students/teacher/${user.uid}`)
                            }
                          >
                            講師名で絞り込み
                          </Button>
                        </MenuItem>
                        <MenuItem>
                          <Button
                            onClick={() =>
                              router.push(`/shift/students/${user.uid}`)
                            }
                          >
                            日付で絞り込み
                          </Button>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </>
                </ListItem>
              </>
              <Link_mui href={`/user/profile/${user?.uid}`}>
                <ListItem button key="profile">
                  <ListItemIcon>
                    <PersonIcon sx={{ color: blue[500] }} />
                  </ListItemIcon>
                  <ListItemText primary="プロフィール" />
                </ListItem>
              </Link_mui>
            </>
            <Link_mui href={`/chat/${user?.uid}`}>
              <ListItem button key="Chat">
                <ListItemIcon>
                  <ChatIcon sx={{ color: blue[500] }} />
                </ListItemIcon>
                <ListItemText primary="みんなの声" />
              </ListItem>
            </Link_mui>
            <Divider />
          </List>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
