import * as React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
interface ModalProps {
  children?: React.ReactNode;
}

//Modalのスタイル
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
//タイトルコンポーネントを作成して、中身をpropsとして渡す。
export default function ModalComponent(props: ModalProps, modal) {
  return (
    <Modal
      open={modal == true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{props.children}</Box>
    </Modal>
  );
}
