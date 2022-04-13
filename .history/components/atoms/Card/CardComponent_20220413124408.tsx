import * as React from "react";
import CardContent from "@mui/material/CardContent";

interface CardProps {
  children?: React.ReactNode;
}

const CardComponent = (props: CardProps) => {
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
};
export default CardComponent;
