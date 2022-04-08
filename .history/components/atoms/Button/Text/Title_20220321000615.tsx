import * as React from "react";
import Typography from "@mui/material/Typography";

interface TypographyProps {
  children?: React.ReactNode;
}
//タイトルコンポーネントを作成して、中身をpropsとして渡す。
export default function TitleComponent(props: TypographyProps) {
  return (
    <Typography
      variant="h5"
      component="div"
      color="black"
      textAlign="center"
      mx="auto"
      fontSize={17}
      fontWeight={400}
      mb={3}
    >
      {props.children}
    </Typography>
  );
}
