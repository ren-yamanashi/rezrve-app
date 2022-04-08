import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { teal } from "@mui/material/colors";

export default function DeleteButton() {
  return (
    <DeleteIcon
      sx={{
        fontSize: 30,
        color: teal[500],
        mt: 3,
        mb: 2,
      }}
    />
  );
}
