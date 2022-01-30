import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import Header from "../../templates/Header";
import { useRouter } from "next/router";
import { browser } from "process";

export default function SelectToday() {
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [freeLists10, setFreeLists10] = useState<FreeList[]>([]);
  const [freeLists11, setFreeLists11] = useState<FreeList[]>([]);
  const [freeLists12, setFreeLists12] = useState<FreeList[]>([]);
  const [freeLists13, setFreeLists13] = useState<FreeList[]>([]);
  const [freeLists14, setFreeLists14] = useState<FreeList[]>([]);
  const [freeLists15, setFreeLists15] = useState<FreeList[]>([]);
  const [freeLists16, setFreeLists16] = useState<FreeList[]>([]);
  const [freeLists17, setFreeLists17] = useState<FreeList[]>([]);
  const [freeLists18, setFreeLists18] = useState<FreeList[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  const [date, setDate] = useState<moment.Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<boolean>(false);
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
  };
  const day = new Date();
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  /**========
   * Firebaseからデータを取得
   *========*/
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user === null) {
      return;
    }
    async function loadRsv() {
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("reserved", "==", true),
        where("date", "==", timestamp(xxx))
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return;
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists(gotFreeList);
    }
    //10時
    async function loadRsv10() {
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("reserved", "==", true),
        where("date", "==", timestamp(xxx)),
        where("time", "==", 10)
      );
      const snapshot = await getDocs(q);
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists10(gotFreeList);
    }
    //11時
    async function loadRsv11() {
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("reserved", "==", true),
        where("date", "==", timestamp(xxx)),
        where("time", "==", 11)
      );
      const snapshot = await getDocs(q);
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists11(gotFreeList);
    }
    //12時
    async function loadRsv12() {
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("reserved", "==", true),
        where("date", "==", timestamp(xxx)),
        where("time", "==", 12)
      );
      const snapshot = await getDocs(q);
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists12(gotFreeList);
    }
    //13時
    async function loadRsv13() {
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("reserved", "==", true),
        where("date", "==", timestamp(xxx)),
        where("time", "==", 13)
      );
      const snapshot = await getDocs(q);
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists13(gotFreeList);
    }
    //14時
    async function loadRsv14() {
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("reserved", "==", true),
        where("date", "==", timestamp(xxx)),
        where("time", "==", 14)
      );
      const snapshot = await getDocs(q);
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists14(gotFreeList);
    }
    //15時
    async function loadRsv15() {
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("reserved", "==", true),
        where("date", "==", timestamp(xxx)),
        where("time", "==", 15)
      );
      const snapshot = await getDocs(q);
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists15(gotFreeList);
    }
    //16時
    async function loadRsv16() {
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("reserved", "==", true),
        where("date", "==", timestamp(xxx)),
        where("time", "==", 16)
      );
      const snapshot = await getDocs(q);
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists16(gotFreeList);
    }
    //17時
    async function loadRsv17() {
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("reserved", "==", true),
        where("date", "==", timestamp(xxx)),
        where("time", "==", 17)
      );
      const snapshot = await getDocs(q);
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists17(gotFreeList);
    }
    //18時
    async function loadRsv18() {
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("reserved", "==", true),
        where("date", "==", timestamp(xxx)),
        where("time", "==", 18)
      );
      const snapshot = await getDocs(q);
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists18(gotFreeList);
    }
    loadRsv(),
      loadRsv10(),
      loadRsv11(),
      loadRsv12(),
      loadRsv13(),
      loadRsv14(),
      loadRsv15(),
      loadRsv16(),
      loadRsv17(),
      loadRsv18();
  }, [process, browser, user]);
  return (
    <>
      <React.Fragment>
        <Card sx={{ minWidth: 275, marginTop: 2, marginBottom: 7 }}>
          <CardContent
            style={{
              width: "80%",
              borderRadius: "7px",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#4689FF",
              margin: "auto",
            }}
          >
            <Box ml={3}>
              <Title>今日のスケジュール</Title>
            </Box>
            <Box display="flex">
              <Grid container>
                <Grid item xs={2} md={1.3}>
                  <Typography
                    sx={{ mt: 4, mb: 2, fontWeight: 600 }}
                    variant="h6"
                    component="div"
                    ml={10}
                  >
                    10:30
                  </Typography>
                  <Divider />
                  <List>
                    {freeLists10.map((item) => (
                      <ListItem key={item.id}>
                        <Button variant="contained" fullWidth>
                          <Box>
                            <Box display="flex">
                              <ListItemText primary={item.teacher} />
                            </Box>
                            <ListItemText
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={2} md={1.3}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    ml={10}
                  >
                    11:30
                  </Typography>
                  <Divider />
                  <List>
                    {freeLists11.map((item) => (
                      <ListItem key={item.id}>
                        <Button variant="contained" fullWidth>
                          <Box>
                            <Box display="flex">
                              <ListItemText primary={item.teacher} />
                            </Box>
                            <ListItemText
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={2} md={1.3}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    ml={10}
                  >
                    12:30
                  </Typography>
                  <Divider />
                  <List>
                    {freeLists12.map((item) => (
                      <ListItem key={item.id}>
                        <Button variant="contained" fullWidth>
                          <Box>
                            <Box display="flex">
                              <ListItemText primary={item.teacher} />
                            </Box>
                            <ListItemText
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={2} md={1.3}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    ml={10}
                  >
                    13:30
                  </Typography>
                  <Divider />
                  <List>
                    {freeLists13.map((item) => (
                      <ListItem key={item.id}>
                        <Button variant="contained" fullWidth>
                          <Box>
                            <Box display="flex">
                              <ListItemText primary={item.teacher} />
                            </Box>
                            <ListItemText
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={2} md={1.3}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    ml={10}
                  >
                    14:30
                  </Typography>
                  <Divider />
                  <List>
                    {freeLists14.map((item) => (
                      <ListItem key={item.id}>
                        <Button variant="contained" fullWidth>
                          <Box>
                            <Box display="flex">
                              <ListItemText primary={item.teacher} />
                            </Box>
                            <ListItemText
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={2} md={1.3}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    ml={10}
                  >
                    15:30
                  </Typography>
                  <Divider />
                  <List>
                    {freeLists15.map((item) => (
                      <ListItem key={item.id}>
                        <Button variant="contained" fullWidth>
                          <Box>
                            <Box display="flex">
                              <ListItemText primary={item.teacher} />
                            </Box>
                            <ListItemText
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={2} md={1.3}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    ml={10}
                  >
                    16:30
                  </Typography>
                  <Divider />
                  <List>
                    {freeLists16.map((item) => (
                      <ListItem key={item.id}>
                        <Button variant="contained" fullWidth>
                          <Box>
                            <Box display="flex">
                              <ListItemText primary={item.teacher} />
                            </Box>
                            <ListItemText
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={2} md={1.3}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    ml={10}
                  >
                    17:30
                  </Typography>
                  <Divider />
                  <List>
                    {freeLists17.map((item) => (
                      <ListItem key={item.id}>
                        <Button variant="contained" fullWidth>
                          <Box>
                            <Box display="flex">
                              <ListItemText primary={item.teacher} />
                            </Box>
                            <ListItemText
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={2} md={1.3}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                    ml={10}
                  >
                    18:30
                  </Typography>
                  <Divider />
                  <List>
                    {freeLists18.map((item) => (
                      <ListItem key={item.id}>
                        <Button variant="contained" fullWidth>
                          <Box>
                            <Box display="flex">
                              <ListItemText primary={item.teacher} />
                            </Box>
                            <ListItemText
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </React.Fragment>
    </>
  );
}
