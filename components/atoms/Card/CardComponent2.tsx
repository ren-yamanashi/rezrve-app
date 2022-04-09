import * as React from "react";
import CardContent from "@mui/material/CardContent";

interface CardProps {
  children?: React.ReactNode;
}

export default function CardComponent(props: CardProps) {
  return (
    <CardContent
      style={{
        width: "80%",
        height: "50%",
        borderRadius: "7px",
        borderStyle: "solid",
        borderWidth: "2px",
        margin: "auto",
      }}
    >
      {props.children}
    </CardContent>
  );
}
