import * as React from "react";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

interface TypographyProps {
  children?: React.ReactNode;
}
//タイトルコンポーネントを作成して、中身をpropsとして渡す。
export default function PrimaryText(props: TypographyProps, props2) {
  return (
    <Typography
      variant="h5"
      component="div"
      sx={props2.style}
      color={props2.color}
      fontSize={props2.size}
    >
      {props.children}
    </Typography>
  );
}
