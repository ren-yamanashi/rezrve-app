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
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modals>
          <TitleComponent
            title={"予約等得詳細"}
            message={"予約者情報を入力してください"}
          />
          <Box display="row" justifyContent={"center"}>
            <FieldTx label="名前" changeEv={props.changeEvent} />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={props.changeEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="電話番号"
              name="phone"
              autoComplete="phone"
              autoFocus
              onChange={props.changePhoneNumber}
            />
            <PrimaryBtn
              style={{
                bgcolor: teal[400],
                "&:hover": { bgcolor: teal[500] },
                fontSize: 12,
                height: 40,
                textAlign: "right",
                mt: 2,
                width: "100%",
              }}
              buttonText={"決定"}
              click={props.loadOpen}
            />
          </Box>
        </Modals>
      </Modal>
    </>
  );
};
export default SetReserverDataModal;
