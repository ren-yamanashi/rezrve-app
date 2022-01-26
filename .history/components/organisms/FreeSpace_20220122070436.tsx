import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../atoms/Title";

function createData(
  time10: number,
  time11: number,
  time12: number,
  time13: number,
  time14: number,
  time15: number,
  time16: number,
  time17: number,
  time18: number,
  time19: number,
  time20: number,
  free: boolean,
  name: string,
  week: string,
  dayOf: number
) {
  return {
    time10,
    time11,
    time12,
    time13,
    time14,
    time15,
    time16,
    time17,
    time18,
    time19,
    time20,
    free,
    name,
    week,
    dayOf,
  };
}

const times = [createData()];

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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
