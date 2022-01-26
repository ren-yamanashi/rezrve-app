import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { browser } from "process";
import { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link_mui from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { ReserveList } from "../../models/ReserveList";

export default function Reservers() {
  const [reserve, setReserve] = useState<ReserveList[]>([]);
  const { user } = useAuth();
  const theme = createTheme();

  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    /**========
     * Firebaseからデータを取得
     *========*/
    async function loadReseves() {
      const db = getFirestore();
      const q = query(collection(db, "ReserveList"));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //ReserveList一覧の展開
      const gotReserves = snapshot.docs.map((doc) => {
        const reserve = doc.data() as ReserveList;
        return reserve;
      });
      setReserve(gotReserves);
    }
    loadReseves();
  }, [process, browser, user]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Typography component="h1" variant="h5">
          固定予約一覧
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
