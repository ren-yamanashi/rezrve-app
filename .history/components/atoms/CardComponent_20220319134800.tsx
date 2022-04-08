import * as React from "react";
import CardContent from "@mui/material/CardContent";

interface CardProps {
  children?: React.ReactNode;
}
//タイトルコンポーネントを作成して、中身をpropsとして渡す。
export default function CardComponent(props: CardProps) {
  return (
    <CardContent
      style={{
        width: "95%",
        borderRadius: "7px",
        borderStyle: "solid",
        borderWidth: "2px",
        borderColor: "#4689FF",
        margin: "auto",
      }}
    >
      {props.children}
    </CardContent>
  );
}
