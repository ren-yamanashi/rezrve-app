import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
  createData(10, false, "テスト", "土曜", 1),
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
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {times.map((time) => (
            <TableRow key={time.time}>
              <TableCell>{time.free}</TableCell>
              <TableCell>{time.name}</TableCell>
              <TableCell>{time.week}</TableCell>
              <TableCell>{time.dayOf}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
