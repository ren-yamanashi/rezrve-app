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
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Alert from "@mui/material/Alert";
import SearchIcon from "@mui/icons-material/Search";
import "moment/locale/ja"; // 日本語ローカライズ
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import TextField from "@mui/material/TextField";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import Header from "../../templates/Header";
import { useRouter } from "next/router";
import { browser } from "process";

//スケジュール表の作成　※シフト提出者のIDがユーザーIDと一致する情報のみ取り出して表示
export default function SelectDay() {
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
  const [value, setValue] = useState<Date | null>(null);
  const [test, setTest] = useState<string>("");
  const [err, setErr] = useState(false);
  //今日の日付に時刻 12:00　を設定する
  const day = new Date(value);
  const y = day.getFullYear();
  const m = day.getMonth();
  const d = day.getDate();
  let xxx = new Date(y, m, d, 12, 0, 0);
  const { user } = useAuth();
  const router = useRouter();
  //日付をTimeStamp型にして返す
  const timestamp = (datetimeStr: any) => {
    return Timestamp.fromDate(new Date(datetimeStr));
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
      setTest(u.displayName);
      console.log(test);
      const db = getFirestore();
      const q = query(
        collection(db, "FreeSpace"),
        where("senderUid", "==", user.uid),
        where("reserved", "==", true),
        where("date", "==", timestamp(xxx))
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setErr(true);
      }
      //FreeList一覧の展開
      const gotFreeList = snapshot.docs.map((doc) => {
        const free = doc.data() as FreeList;
        free.id = doc.id;
        return free;
      });
      setFreeLists(gotFreeList);
    }
    load();
  }, [process, browser, user]);
  /**========
   * Firebaseからデータを取得
   *========*/
  const loadRsv = async () => {
    setErr(false);
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("reserved", "==", true),
      where("date", "==", timestamp(xxx))
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      setErr(true);
    }
    //FreeList一覧の展開
    const gotFreeList = snapshot.docs.map((doc) => {
      const free = doc.data() as FreeList;
      free.id = doc.id;
      return free;
    });
    setFreeLists(gotFreeList);
  };
  return (
    <>
      <React.Fragment>
        <Box ml={3}>
          <Title>予約スケジュール</Title>
          {test.indexOf("管理者") !== -1 && (
            <Box ml={3}>
              <Button onClick={() => router.push(`/calender/all/${user.uid}`)}>
                スケジュール一覧を見る
              </Button>
            </Box>
          )}
        </Box>
        <Box
          ml={5}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Box mr={5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="日付を選択"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <IconButton onClick={() => loadRsv()}>
              <SearchIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
        {err == true ? (
          <Box textAlign="center">
            <Grid xs={12} sm={15}>
              <Alert variant="filled" severity="info" sx={{ m: 3 }}>
                予約が見つかりませんでした
              </Alert>
            </Grid>
          </Box>
        ) : (
          <Box display="flex">
            <Grid container>
              <Grid item xs={12} sm={12} lg={4} md={4}>
                <Typography
                  sx={{ mt: 4, mb: 2 }}
                  variant="h6"
                  component="div"
                  ml={10}
                >
                  10:30
                </Typography>
                <Divider />
                <List>
                  {freeLists.map((item) => (
                    <ListItem key={item.id}>
                      {item.time == 10 && (
                        <CardContent
                          style={{
                            width: "80%",
                            backgroundColor: "#4688DD",
                            borderRadius: "7px",
                            borderStyle: "solid",
                            borderWidth: "2px",
                            borderColor: "white",
                            margin: "auto",
                          }}
                        >
                          <Box>
                            <Box display="flex">
                              <ListItemText
                                primary={item.teacher}
                                sx={{ color: "white" }}
                              />
                              <IconButton
                                onClick={() =>
                                  router.push(`/reserve/edit/${item.id}`)
                                }
                              >
                                <EditIcon
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </IconButton>
                            </Box>
                            <ListItemText
                              primary={`${item.student}:${item.course}`}
                              sx={{ color: "white" }}
                            />
                          </Box>
                        </CardContent>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} md={4}>
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
                  {freeLists.map((item) => (
                    <ListItem key={item.id}>
                      {item.time == 11 && (
                        <CardContent
                          style={{
                            width: "80%",
                            backgroundColor: "#4688DD",
                            borderRadius: "7px",
                            borderStyle: "solid",
                            borderWidth: "2px",
                            borderColor: "white",
                            margin: "auto",
                          }}
                        >
                          <Box>
                            <Box display="flex">
                              <ListItemText
                                primary={item.teacher}
                                sx={{ color: "white" }}
                              />
                              <IconButton
                                onClick={() =>
                                  router.push(`/reserve/edit/${item.id}`)
                                }
                              >
                                <EditIcon
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </IconButton>
                            </Box>
                            <ListItemText
                              sx={{ color: "white" }}
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </CardContent>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} md={4}>
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
                  {freeLists.map((item) => (
                    <ListItem key={item.id}>
                      {item.time == 12 && (
                        <CardContent
                          style={{
                            width: "80%",
                            backgroundColor: "#4688DD",
                            borderRadius: "7px",
                            borderStyle: "solid",
                            borderWidth: "2px",
                            borderColor: "white",
                            margin: "auto",
                          }}
                        >
                          <Box>
                            <Box display="flex">
                              <ListItemText
                                primary={item.teacher}
                                sx={{ color: "white" }}
                              />
                              <IconButton
                                onClick={() =>
                                  router.push(`/reserve/edit/${item.id}`)
                                }
                              >
                                <EditIcon
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </IconButton>
                            </Box>
                            <ListItemText
                              sx={{ color: "white" }}
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </CardContent>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} md={4}>
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
                  {freeLists.map((item) => (
                    <ListItem key={item.id}>
                      {item.time == 13 && (
                        <CardContent
                          style={{
                            width: "80%",
                            backgroundColor: "#4688DD",
                            borderRadius: "7px",
                            borderStyle: "solid",
                            borderWidth: "2px",
                            borderColor: "white",
                            margin: "auto",
                          }}
                        >
                          <Box>
                            <Box display="flex">
                              <ListItemText
                                primary={item.teacher}
                                sx={{ color: "white" }}
                              />
                              <IconButton
                                onClick={() =>
                                  router.push(`/reserve/edit/${item.id}`)
                                }
                              >
                                <EditIcon
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </IconButton>
                            </Box>
                            <ListItemText
                              sx={{ color: "white" }}
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </CardContent>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} md={4}>
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
                  {freeLists.map((item) => (
                    <ListItem key={item.id}>
                      {item.time == 14 && (
                        <CardContent
                          style={{
                            width: "80%",
                            backgroundColor: "#4688DD",
                            borderRadius: "7px",
                            borderStyle: "solid",
                            borderWidth: "2px",
                            borderColor: "white",
                            margin: "auto",
                          }}
                        >
                          <Box>
                            <Box display="flex">
                              <ListItemText
                                primary={item.teacher}
                                sx={{ color: "white" }}
                              />
                              <IconButton
                                onClick={() =>
                                  router.push(`/reserve/edit/${item.id}`)
                                }
                              >
                                <EditIcon
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </IconButton>
                            </Box>
                            <ListItemText
                              sx={{ color: "white" }}
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </CardContent>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} md={4}>
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
                  {freeLists.map((item) => (
                    <ListItem key={item.id}>
                      {item.time == 15 && (
                        <CardContent
                          style={{
                            width: "80%",
                            backgroundColor: "#4688DD",
                            borderRadius: "7px",
                            borderStyle: "solid",
                            borderWidth: "2px",
                            borderColor: "white",
                            margin: "auto",
                          }}
                        >
                          <Box>
                            <Box display="flex">
                              <ListItemText
                                primary={item.teacher}
                                sx={{ color: "white" }}
                              />
                              <IconButton
                                onClick={() =>
                                  router.push(`/reserve/edit/${item.id}`)
                                }
                              >
                                <EditIcon
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </IconButton>
                            </Box>
                            <ListItemText
                              sx={{ color: "white" }}
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </CardContent>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} md={4}>
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
                  {freeLists.map((item) => (
                    <ListItem key={item.id}>
                      {item.time == 16 && (
                        <CardContent
                          style={{
                            width: "80%",
                            backgroundColor: "#4688DD",
                            borderRadius: "7px",
                            borderStyle: "solid",
                            borderWidth: "2px",
                            borderColor: "white",
                            margin: "auto",
                          }}
                        >
                          <Box>
                            <Box display="flex">
                              <ListItemText
                                primary={item.teacher}
                                sx={{ color: "white" }}
                              />
                              <IconButton
                                onClick={() =>
                                  router.push(`/reserve/edit/${item.id}`)
                                }
                              >
                                <EditIcon
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </IconButton>
                            </Box>
                            <ListItemText
                              sx={{ color: "white" }}
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </CardContent>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} md={4}>
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
                  {freeLists.map((item) => (
                    <ListItem key={item.id}>
                      {item.time == 17 && (
                        <CardContent
                          style={{
                            width: "80%",
                            backgroundColor: "#4688DD",
                            borderRadius: "7px",
                            borderStyle: "solid",
                            borderWidth: "2px",
                            borderColor: "white",
                            margin: "auto",
                          }}
                        >
                          <Box>
                            <Box display="flex">
                              <ListItemText
                                primary={item.teacher}
                                sx={{ color: "white" }}
                              />
                              <IconButton
                                onClick={() =>
                                  router.push(`/reserve/edit/${item.id}`)
                                }
                              >
                                <EditIcon
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </IconButton>
                            </Box>
                            <ListItemText
                              sx={{ color: "white" }}
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </CardContent>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} md={4}>
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
                  {freeLists.map((item) => (
                    <ListItem key={item.id}>
                      {item.time == 18 && (
                        <CardContent
                          style={{
                            width: "80%",
                            backgroundColor: "#4688DD",
                            borderRadius: "7px",
                            borderStyle: "solid",
                            borderWidth: "2px",
                            borderColor: "white",
                            margin: "auto",
                          }}
                        >
                          <Box>
                            <Box display="flex">
                              <ListItemText
                                primary={item.teacher}
                                sx={{ color: "white" }}
                              />
                              <IconButton
                                onClick={() =>
                                  router.push(`/reserve/edit/${item.id}`)
                                }
                              >
                                <EditIcon
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </IconButton>
                            </Box>
                            <ListItemText
                              sx={{ color: "white" }}
                              primary={`${item.student}:${item.course}`}
                            />
                          </Box>
                        </CardContent>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        )}
      </React.Fragment>
    </>
  );
}
