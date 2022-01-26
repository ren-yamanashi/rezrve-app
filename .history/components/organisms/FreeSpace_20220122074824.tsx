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
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
//内部インポート
import { useAuth } from "../../hooks/useUserAuth";
import { ReserveList } from "../../models/ReserveList";
import Title from "../atoms/Title";

function createData(
  time: number,
  free: boolean,
  name: string,
  week: string,
  dayOf: number
) {
  return {
    time,
    free,
    name,
    week,
    dayOf,
  };
}

const times = [
  createData(10, true, "テスト", "土曜", 1),
  createData(11, false, "テスト2", "土曜", 1),
  createData(12, false, "テスト2", "土曜", 1),
];

export default function FreeSpace() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>講師名</TableCell>
            <TableCell>曜日</TableCell>
            <TableCell>週目</TableCell>
            <TableCell>時間</TableCell>
            <TableCell>予約済み?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {times.map((time) => (
            <TableRow key={time.time}>
              <TableCell>{time.name}</TableCell>
              <TableCell>{time.week}</TableCell>
              <TableCell>{time.dayOf}</TableCell>
              <TableCell>{time.time}</TableCell>
              <TableCell>{time.free}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
