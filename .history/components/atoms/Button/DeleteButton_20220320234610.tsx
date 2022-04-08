import * as React from "react";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { teal } from "@mui/material/colors";

//タイトルコンポーネントを作成して、中身をpropsとして渡す。
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
