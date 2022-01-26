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
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
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
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { FreeList } from "../../../models/FreeList";
import Title from "../../atoms/Title";
import Header from "../../templates/Header";

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
  const [freeLists19, setFreeLists19] = useState<FreeList[]>([]);
  const [freeLists20, setFreeLists20] = useState<FreeList[]>([]);
  const [day, setDay] = useState<string>("");
  const { user } = useAuth();
  /**========
   * Firebaseからデータを取得
   *========*/
  const loadRsv = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", true),
      where("dayOfWeek", "==", day)
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
      where("reserved", "==", true),
      where("dayOfWeek", "==", day),
      where("time", "==", 10)
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
    setFreeLists10(gotFreeList);
  };
  //11時
  const loadRsv11 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", true),
      where("dayOfWeek", "==", day),
      where("time", "==", 11)
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
    setFreeLists11(gotFreeList);
  };
  //12時
  const loadRsv12 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", true),
      where("dayOfWeek", "==", day),
      where("time", "==", 12)
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
    setFreeLists12(gotFreeList);
  };
  //13時
  const loadRsv13 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", true),
      where("dayOfWeek", "==", day),
      where("time", "==", 13)
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
    setFreeLists13(gotFreeList);
  };
  //11時
  const loadRsv14 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", true),
      where("dayOfWeek", "==", day),
      where("time", "==", 14)
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
    setFreeLists14(gotFreeList);
  };
  //11時
  const loadRsv15 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", true),
      where("dayOfWeek", "==", day),
      where("time", "==", 15)
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
    setFreeLists15(gotFreeList);
  };
  //11時
  const loadRsv16 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", true),
      where("dayOfWeek", "==", day),
      where("time", "==", 16)
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
    setFreeLists16(gotFreeList);
  };
  //11時
  const loadRsv17 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", true),
      where("dayOfWeek", "==", day),
      where("time", "==", 17)
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
    setFreeLists17(gotFreeList);
  };
  //11時
  const loadRsv18 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", true),
      where("dayOfWeek", "==", day),
      where("time", "==", 18)
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
    setFreeLists18(gotFreeList);
  };
  //11時
  const loadRsv19 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", true),
      where("dayOfWeek", "==", day),
      where("time", "==", 19)
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
    setFreeLists19(gotFreeList);
  };
  //11時
  const loadRsv20 = async () => {
    const db = getFirestore();
    const q = query(
      collection(db, "FreeSpace"),
      where("reserved", "==", true),
      where("dayOfWeek", "==", day),
      where("time", "==", 20)
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
    setFreeLists20(gotFreeList);
  };

  return (
    <>
      <Header />
      <React.Fragment>
        <Box ml={3}>
          <Title>予約カレンダー</Title>
        </Box>
        <Box ml={5}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">曜日</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                checked={day === "月曜"}
                onChange={() => {
                  setDay("月曜");
                }}
                label="月曜"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                checked={day === "火曜"}
                onChange={() => {
                  setDay("火曜");
                }}
                label="火曜"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                checked={day === "水曜"}
                onChange={() => {
                  setDay("水曜");
                }}
                label="水曜"
              />
              <FormControlLabel
                value="disabled"
                control={<Radio />}
                checked={day === "木曜"}
                onChange={() => {
                  setDay("木曜");
                }}
                label="木曜"
              />
              <FormControlLabel
                value="disabled"
                control={<Radio />}
                checked={day === "金曜"}
                onChange={() => {
                  setDay("金曜");
                }}
                label="金曜"
              />
              <FormControlLabel
                value="disabled"
                control={<Radio />}
                checked={day === "土曜"}
                onChange={() => {
                  setDay("土曜");
                }}
                label="土曜"
              />
              <FormControlLabel
                value="disabled"
                control={<Radio />}
                checked={day === "日曜"}
                onChange={() => {
                  setDay("日曜");
                }}
                label="日曜"
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
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
                loadRsv18(),
                loadRsv19(),
                loadRsv20();
            }}
            variant="contained"
            sx={{ mt: 3, mb: 2, ml: 3 }}
          >
            決定
          </Button>
        </Box>
        <Box display="flex">
          <Grid container>
            <Grid item xs={1} md={1.1}>
              <Typography
                sx={{ mt: 4, mb: 2 }}
                variant="h6"
                component="div"
                ml={5}
              >
                10:30
              </Typography>
              <List>
                {freeLists10.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={`${item.teacher}-${item.student}`} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={1} md={1.1}>
              <Typography
                sx={{ mt: 4, mb: 2 }}
                variant="h6"
                component="div"
                ml={5}
              >
                11:30
              </Typography>
              <List>
                {freeLists11.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={`${item.teacher}-${item.student}`} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={1} md={1.1}>
              <Typography
                sx={{ mt: 4, mb: 2 }}
                variant="h6"
                component="div"
                ml={5}
              >
                12:30
              </Typography>
              <List>
                {freeLists12.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={`${item.teacher}-${item.student}`} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={1} md={1.1}>
              <Typography
                sx={{ mt: 4, mb: 2 }}
                variant="h6"
                component="div"
                ml={5}
              >
                13:30
              </Typography>
              <List>
                {freeLists13.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={`${item.teacher}-${item.student}`} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={1} md={1.1}>
              <Typography
                sx={{ mt: 4, mb: 2 }}
                variant="h6"
                component="div"
                ml={5}
              >
                14:30
              </Typography>
              <List>
                {freeLists14.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={`${item.teacher}-${item.student}`} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={1} md={1.1}>
              <Typography
                sx={{ mt: 4, mb: 2 }}
                variant="h6"
                component="div"
                ml={5}
              >
                15:30
              </Typography>
              <List>
                {freeLists15.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={`${item.teacher}-${item.student}`} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={1} md={1.1}>
              <Typography
                sx={{ mt: 4, mb: 2 }}
                variant="h6"
                component="div"
                ml={5}
              >
                16:30
              </Typography>
              <List>
                {freeLists16.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={`${item.teacher}-${item.student}`} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={1} md={1.1}>
              <Typography
                sx={{ mt: 4, mb: 2 }}
                variant="h6"
                component="div"
                ml={5}
              >
                17:30
              </Typography>
              <List>
                {freeLists18.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={`${item.teacher}-${item.student}`} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={1} md={1.1}>
              <Typography
                sx={{ mt: 4, mb: 2 }}
                variant="h6"
                component="div"
                ml={5}
              >
                18:30
              </Typography>
              <List>
                {freeLists19.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={`${item.teacher}-${item.student}`} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={1} md={1}>
              <Typography
                sx={{ mt: 4, mb: 2 }}
                variant="h6"
                component="div"
                ml={5}
              >
                19:30
              </Typography>
              <List>
                {freeLists20.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={`${item.teacher}-${item.student}`} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={1} md={1}>
              <Typography
                sx={{ mt: 4, mb: 2 }}
                variant="h6"
                component="div"
                ml={5}
              >
                20:30
              </Typography>
              <List>
                {freeLists17.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText primary={`${item.teacher}-${item.student}`} />
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
