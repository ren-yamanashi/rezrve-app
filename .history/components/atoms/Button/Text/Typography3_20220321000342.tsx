import * as React from "react";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

interface TypographyProps {
  children?: React.ReactNode;
}
//タイトルコンポーネントを作成して、中身をpropsとして渡す。
export default function TextComponent(props: TypographyProps) {
  return (
    <Typography
      variant="h5"
      component="div"
      ml={5}
      color={grey[600]}
      textAlign="left"
      fontSize={17}
    >
      {props.children}
    </Typography>
  );
}
