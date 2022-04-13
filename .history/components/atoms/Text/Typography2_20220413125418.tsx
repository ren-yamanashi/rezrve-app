import * as React from "react";
import Typography from "@mui/material/Typography";

interface TypographyProps {
  children?: React.ReactNode;
}

const TextComponent_17 = (props: TypographyProps) => {
  return (
    <Typography
      variant="h5"
      component="div"
      ml={1}
      color="black"
      textAlign="left"
      fontSize={17}
      width={120}
      fontWeight={400}
    >
      {props.children}
    </Typography>
  );
};

export default TextComponent_17;
