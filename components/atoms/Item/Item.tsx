import * as React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

interface ItemProps {
  children?: React.ReactNode;
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "#FFFFDD",
}));

export default function ModalComponent(props: ItemProps) {
  return <Item sx={{ my: 2 }}>{props.children}</Item>;
}
