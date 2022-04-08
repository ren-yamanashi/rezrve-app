import * as React from "react";
import Button from "@mui/material/Button";

interface CardProps {
  children?: React.ReactNode;
}
//タイトルコンポーネントを作成して、中身をpropsとして渡す。
export default function ButtonComponent(props: CardProps) {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: "#3CB371",
        "&:hover": { bgcolor: "#2E8B57" },
        fontSize: 13,
      }}
    >
      {props.children}
    </Button>
  );
}
