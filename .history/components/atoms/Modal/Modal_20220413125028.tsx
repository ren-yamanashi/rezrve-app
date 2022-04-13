import * as React from "react";
import Box from "@mui/material/Box";
interface ModalProps {
  children?: React.ReactNode;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ModalComponent = (props: ModalProps) => {
  return <Box sx={style}>{props.children}</Box>;
};
export default ModalComponent;
