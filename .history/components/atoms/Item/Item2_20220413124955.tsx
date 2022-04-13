import * as React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

interface ItemProps {
  children?: React.ReactNode;
}

const Item2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ModalComponent = (props: ItemProps) => {
  return <Item2 sx={{ my: 2 }}>{props.children}</Item2>;
};

export default ModalComponent;
