import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { grey, teal } from "@mui/material/colors";
// import my file
import Modals from "../../atoms/Modal/Modal";
import TitleComponent from "../../atoms/Text/Title";
import FieldTx from "../../atoms/Text/TextField";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";

//OK
const SetReserverDataModal = (props) => {
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
              label="電話番号(ハイフンなし)"
              name="phone"
              autoComplete="phone"
              autoFocus
              onChange={props.changePhoneNumber}
            />
            <PrimaryBtn
              style={{
                bgcolor: teal[400],
                "&:hover": { bgcolor: teal[600] },
                fontSize: 12,
                height: 40,
                textAlign: "right",
                mt: 2,
                width: "100%",
              }}
              buttonText={"決定"}
              click={props.loadOpen}
            />
            <PrimaryBtn
              style={{
                bgcolor: grey[600],
                "&:hover": { bgcolor: grey[400] },
                fontSize: 12,
                height: 40,
                textAlign: "right",
                mt: 2,
                width: "100%",
              }}
              buttonText={"キャンセル"}
              click={props.handleClose}
            />
          </Box>
        </Modals>
      </Modal>
    </>
  );
};
export default SetReserverDataModal;
