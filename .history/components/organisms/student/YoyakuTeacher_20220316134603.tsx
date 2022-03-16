import {
  collection,
  getFirestore,
  query,
  getDocs,
  deleteDoc,
  doc,
  where,
  Timestamp,
  orderBy,
  startAt,
  endAt,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FilterListIcon from "@mui/icons-material/FilterList";
import RadioGroup from "@mui/material/RadioGroup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import DatePicker from "@mui/lab/DatePicker";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { browser } from "process";
import Link_mui from "@mui/material/Link";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { TextField } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Typography from "@mui/material/Typography";
import { blue, teal } from "@mui/material/colors";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { createMedia } from "@artsy/fresnel";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { Users } from "../../../models/Users";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import { ja } from "date-fns/locale";

//Modalのスタイル
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    xs: 0,
    sm: 365,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

//ユーザーリストの作成　名前に管理者があればユーザーの削除が可能。 メアドに @bee が入っていればシフトの登録が可能
export default function UsersList() {
  const db = getFirestore();
  const [users, setUsers] = useState<Users[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  /**========
   * Firebaseからユーザーを取得
   *========*/
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    async function loadUser() {
      const q = query(collection(db, "users"), where("role", "==", "teacher"));
      const snapshot = await getDocs(q);
      //users一覧の展開
      const gotUsers = snapshot.docs.map((doc) => {
        const user = doc.data() as Users;
        user.id = doc.id;
        return user;
      });
      setUsers(gotUsers);
    }
    loadUser();
  }, [process, browser, user]);
  return (
    <>
      <React.Fragment>
        <MediaContextProvider>
          <Media greaterThan="sm">
            <Box
              display="flex"
              flexWrap="wrap"
              mb={3}
              justifyContent="center"
              mx="auto"
            >
              {users.map((index) => (
                <>
                  <Grid item xs={12} sm={5} lg={3} md={3}>
                    <Box mb={3} display="flex" mx={2}>
                      <CardContent
                        style={{
                          borderRadius: "7px",
                          borderStyle: "solid",
                          borderWidth: "2px",
                          margin: "auto",
                          width: 200,
                          height: 250,
                        }}
                      >
                        <Grid item xs={12} sm={14} lg={10} md={10}>
                          <CardMedia
                            component="img"
                            sx={{
                              width: 150,
                              height: 120,
                              borderRadius: "10%",
                            }}
                            image={index.url}
                            alt="Icon"
                          />
                        </Grid>
                        <Box display="flex" margin="auto">
                          <Typography
                            sx={{ fontSize: 15, mt: 2, mb: 1, mx: "auto" }}
                          >
                            {`講師名 : ${index.userName}`}
                          </Typography>
                        </Box>
                        <Box display="flex" margin="auto">
                          <Button
                            onClick={() =>
                              router.push(`/reserve/teachers/${index.id}`)
                            }
                            variant="contained"
                            sx={{
                              bgcolor: teal[500],
                              "&:hover": { bgcolor: "#2E8B57" },
                              fontSize: 12,
                              width: 140,
                              margin: "auto",
                            }}
                          >
                            選択
                          </Button>
                        </Box>
                      </CardContent>
                    </Box>
                  </Grid>
                </>
              ))}
            </Box>
          </Media>
          {/* スマホレスポンシブ */}
          <Media at="sm">
            <Box
              display="flex"
              flexWrap="wrap"
              mb={3}
              justifyContent="center"
              mx="auto"
            >
              {users.map((index) => (
                <>
                  <Box mb={3} display="flex" mx={2}>
                    <CardContent
                      style={{
                        borderRadius: "7px",
                        borderStyle: "solid",
                        borderWidth: "2px",
                        margin: "auto",
                        minWidth: 120,
                        width: 150,
                        height: 220,
                      }}
                    >
                      <Box display="flex" justifyContent="center" mx="auto">
                        <CardMedia
                          component="img"
                          sx={{
                            minWidth: 100,
                            width: 130,
                            height: 100,
                            borderRadius: "10%",
                            justifyContent: "center",
                          }}
                          image={index.url}
                          alt="Icon"
                        />
                      </Box>
                      <Box display="flex" margin="auto">
                        <Typography
                          sx={{ fontSize: 12, mt: 2, mb: 1, mx: "auto" }}
                        >
                          {`講師名 : ${index.userName}`}
                        </Typography>
                      </Box>
                      <Box display="flex" margin="auto">
                        <Button
                          onClick={() =>
                            router.push(`/reserve/teachers/${index.id}`)
                          }
                          variant="contained"
                          sx={{
                            bgcolor: teal[500],
                            "&:hover": { bgcolor: "#2E8B57" },
                            fontSize: 12,
                            width: 140,
                            margin: "auto",
                          }}
                        >
                          選択
                        </Button>
                      </Box>
                    </CardContent>
                  </Box>
                </>
              ))}
            </Box>
          </Media>
          {/* スマホレスポンシブ */}
          <Media at="xs">
            <Box
              display="flex"
              flexWrap="wrap"
              mb={3}
              justifyContent="center"
              mx="auto"
            >
              {users.map((index) => (
                <>
                  <Box mb={3} display="flex" mx={2}>
                    <CardContent
                      style={{
                        borderRadius: "7px",
                        borderStyle: "solid",
                        borderWidth: "2px",
                        margin: "auto",
                        width: 125,
                        height: 180,
                      }}
                    >
                      <Box display="flex" justifyContent="center" mx="auto">
                        <CardMedia
                          component="img"
                          sx={{
                            width: 100,
                            height: 60,
                            borderRadius: "10%",
                            justifyContent: "center",
                          }}
                          image={index.url}
                          alt="Icon"
                        />
                      </Box>
                      <Box display="flex" margin="auto">
                        <Typography
                          sx={{ fontSize: 12, mt: 2, mb: 1, mx: "auto" }}
                        >
                          {`講師名 : ${index.userName}`}
                        </Typography>
                      </Box>
                      <Box display="flex" margin="auto">
                        <Button
                          onClick={() =>
                            router.push(`/reserve/teachers/${index.id}`)
                          }
                          type="submit"
                          variant="contained"
                          sx={{
                            bgcolor: teal[500],
                            "&:hover": { bgcolor: "#2E8B57" },
                            fontSize: 8,
                            width: 150,
                            margin: "auto",
                          }}
                        >
                          選択
                        </Button>
                      </Box>
                    </CardContent>
                  </Box>
                </>
              ))}
            </Box>
          </Media>
        </MediaContextProvider>
      </React.Fragment>
      <ToastContainer />
    </>
  );
}
