import {
  collection,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  startAt,
  endAt,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { browser } from "process";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import FilterListIcon from "@mui/icons-material/FilterList";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Checkbox, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import SearchIcon from "@mui/icons-material/Search";
import {
  Wrap,
  WrapItem,
  Spinner,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import Header from "../../templates/Header";
import { useSelectRsv } from "../../../hooks/useSelectRsv";

export default function SelectDay() {
  const { onSelectRsv, selectedRsv } = useSelectRsv();
  const [freeLists, setFreeLists] = useState<FreeList[]>([]);
  const [reserves, setReserves] = useState<FreeList[]>([]);
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
  //日付を修正
  const [day, setDay] = React.useState(new Date());
  let y = day.getFullYear();
  let m = 1 + day.getMonth();
  let d = day.getDate();
  let date = `${y}/${m}/${d}`;
  /**========
   * Firebaseからデータを取得
   *========*/
  const loadRsv = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("reserved", "==", true),
      where("date", "==", date)
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
  };
  //10時
  const loadRsv10 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("reserved", "==", true),
      where("date", "==", date),
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
  };
  //11時
  const loadRsv11 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("reserved", "==", true),
      where("date", "==", date),
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
  };
  //12時
  const loadRsv12 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("reserved", "==", true),
      where("date", "==", date),
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
  };
  //13時
  const loadRsv13 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("reserved", "==", true),
      where("date", "==", date),
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
  };
  //14時
  const loadRsv14 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("reserved", "==", true),
      where("date", "==", date),
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
  };
  //15時
  const loadRsv15 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("reserved", "==", true),
      where("date", "==", date),
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
  };
  //16時
  const loadRsv16 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("reserved", "==", true),
      where("date", "==", date),
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
  };
  //17時
  const loadRsv17 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("reserved", "==", true),
      where("date", "==", date),
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
  };
  //18時
  const loadRsv18 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("senderUid", "==", user.uid),
      where("reserved", "==", true),
      where("date", "==", date),
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
  };
  return (
    <>
      <Header />
      <React.Fragment>
        <Box ml={3}>
          <Title>予約カレンダー</Title>
        </Box>
        <Box ml={5} display="flex" alignItems="center" mt={5}>
          <Box width="10vw">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="日付を選択"
                  value={day}
                  minDate={new Date("2017-01-01")}
                  onChange={(newValue) => {
                    setDay(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Box>
          <IconButton
            onClick={() => {
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
            }}
          >
            <SearchIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box display="flex">
          <Grid container>
            <Grid item xs={2} md={1.3}>
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
                {freeLists10.map((item) => (
                  <ListItem key={item.id}>
                    <Button variant="contained" fullWidth>
                      <Box>
                        <ListItemText primary={item.teacher} />
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
                    <Button variant="contained">
                      <ListItemText
                        primary={`${item.teacher}-${item.student}:${item.course}`}
                      />
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
                      <ListItemText
                        primary={`${item.teacher}-${item.student}:${item.course}`}
                      />
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
                      <ListItemText
                        primary={`${item.teacher}-${item.student}:${item.course}`}
                      />
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
                      <ListItemText
                        primary={`${item.teacher}-${item.student}:${item.course}`}
                      />
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
                      <ListItemText
                        primary={`${item.teacher}-${item.student}:${item.course}`}
                      />
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
                      <ListItemText
                        primary={`${item.teacher}-${item.student}:${item.course}`}
                      />
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
                      <ListItemText
                        primary={`${item.teacher}-${item.student}:${item.course}`}
                      />
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
                      <ListItemText
                        primary={`${item.teacher}-${item.student}:${item.course}`}
                      />
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    </>
  );
}
