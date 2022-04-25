import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Modals from "../../atoms/Modal/Modal";
import TitleComponent from "../../atoms/Text/Title";
import SearchIcon from "@mui/icons-material/Search";
import FieldTx from "../../atoms/Text/TextField";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { teal } from "@mui/material/colors";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import { useSelectStudent } from "../../../hooks/useSelectStudent";
import TextField from "@mui/material/TextField";
import { useHandle } from "../../../hooks/useHandle";
const SearchStudentModal = (props) => {
  const [email, setEmail] = React.useState<string>("");
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
            <FieldTx
              style={{ mb: 1 }}
              label="Name"
              changeEv={props.changeEvent}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box display={"flex"} justifyContent={"right"}>
              <PrimaryBtn
                style={{
                  bgcolor: teal[400],
                  fontSize: 12,
                  height: 40,
                  textAlign: "right",
                  mr: 5,
                  width: 100,
                }}
                buttonText={"決定"}
                click={() => {
                  handleClose();
                  handleOpen2();
                }}
              />
            </Box>
          </Box>
        </Modals>
      </Modal>
    </>
  );
};
export default SearchStudentModal;
