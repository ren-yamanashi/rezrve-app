import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Modals from "../../atoms/Modal/Modal";
import TitleComponent from "../../atoms/Text/Title";
import FieldTx from "../../atoms/Text/TextField";
import { teal } from "@mui/material/colors";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import TextField from "@mui/material/TextField";
import { useHandle } from "../../../hooks/useHandle";

//OK
const SetReserverDataModal = (props) => {
  const { handleClose, handleOpen2, onOpen } = useHandle();
  return (
    <>
      <Modal
        open={onOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modals>
          <TitleComponent>予約者情報を入力してください</TitleComponent>
          <Box display="row" justifyContent={"center"}>
            <FieldTx label="Name" changeEv={props.changeEvent} />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={props.changeEmail}
            />
            <PrimaryBtn
              style={{
                bgcolor: teal[400],
                fontSize: 12,
                height: 40,
                textAlign: "right",
                mt: 2,
                width: "100%",
              }}
              buttonText={"決定"}
              click={() => {
                handleClose();
                handleOpen2();
              }}
            />
          </Box>
        </Modals>
      </Modal>
    </>
  );
};
export default SetReserverDataModal;
