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
import { useHandle } from "../../../hooks/useHandle";
const SearchStudentModal = (props) => {
  const { setData } = useSelectStudent();
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
          <TitleComponent>予約者を選択してください</TitleComponent>
          <Box display="flex" justifyContent={"center"}>
            <FieldTx
              style={{ mb: 3 }}
              label="名前を入力"
              changeEv={props.changeEvent}
            />
            <Box display="flex" justifyContent={"center"}>
              <PrimaryBtn
                style={{
                  bgcolor: teal[500],
                  fontSize: 12,
                  height: 40,
                  my: "auto",
                  ml: 2,
                }}
                buttonText={"決定"}
                click={() => {
                  handleClose();
                  handleOpen2();
                }}
              />
            </Box>
          </Box>
          <Table size="small" sx={{ margin: "auto" }}>
            <TableHead style={{ backgroundColor: "#FFFFDD" }}>
              <TableRow>
                <TableCell
                  width="50%"
                  sx={{ textAlign: "center", fontSize: 13 }}
                >
                  顧客名
                </TableCell>
                <TableCell
                  width="20%"
                  sx={{ textAlign: "center", fontSize: 13 }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell
                    width="50%"
                    sx={{ textAlign: "center", fontSize: 12 }}
                  >
                    {user.userName}
                  </TableCell>
                  <TableCell
                    width="50%"
                    sx={{ textAlign: "center", fontSize: 12 }}
                  >
                    <PrimaryBtn
                      style={{ bgcolor: teal[500], fontSize: 12 }}
                      buttonText={"選択"}
                      click={() => {
                        setData(user.userName, user.id);
                        handleClose();
                        handleOpen2();
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Modals>
      </Modal>
    </>
  );
};
export default SearchStudentModal;
