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
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Link_mui from "@mui/material/Link";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Checkbox, TextField } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
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
              loadRsv(), loadRsv11();
            }}
            variant="contained"
            sx={{ mt: 3, mb: 2, ml: 3 }}
          >
            決定
          </Button>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>10:30</TableCell>
              <TableCell>11:30</TableCell>
              <TableCell>12:30</TableCell>
              <TableCell>13:30</TableCell>
              <TableCell>14:30</TableCell>
              <TableCell>15:30</TableCell>
              <TableCell>16:30</TableCell>
              <TableCell>17:30</TableCell>
              <TableCell>18:30</TableCell>
              <TableCell>19:30</TableCell>
              <TableCell>20:30</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {freeLists.map((freeList) => (
              <TableRow key={freeList.id}>
                <TableCell>{freeList.time == 10 && freeList.student}</TableCell>
                <TableCell>{freeList.time == 11 && freeList.student}</TableCell>
                <TableCell>{freeList.time == 12 && freeList.student}</TableCell>
                <TableCell>{freeList.time == 13 && freeList.student}</TableCell>
                <TableCell>{freeList.time == 14 && freeList.student}</TableCell>
                <TableCell>{freeList.time == 15 && freeList.student}</TableCell>
                <TableCell>{freeList.time == 16 && freeList.student}</TableCell>
                <TableCell>{freeList.time == 17 && freeList.student}</TableCell>
                <TableCell>{freeList.time == 18 && freeList.student}</TableCell>
                <TableCell>{freeList.time == 19 && freeList.student}</TableCell>
                <TableCell>{freeList.time == 20 && freeList.student}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    </>
  );
}
