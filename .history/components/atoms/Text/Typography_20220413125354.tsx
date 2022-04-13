import * as React from "react";
import Typography from "@mui/material/Typography";

interface TypographyProps {
  children?: React.ReactNode;
}

const TextComponent_19 = (props: TypographyProps) => {
  return (
    <Typography
      variant="h5"
      component="div"
      color="black"
      textAlign="center"
      mx="auto"
      fontSize={19}
      width={90}
      fontWeight={500}
    >
      {props.children}
    </Typography>
  );
};

export default TextComponent_19;
