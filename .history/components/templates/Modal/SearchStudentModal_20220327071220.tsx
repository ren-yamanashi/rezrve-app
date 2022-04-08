import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Item from "../../atoms/Item";
import Item2 from "../../atoms/Item2";
import Modals from "../../atoms/Modal";
import TextComponent_19 from "../../atoms/Text/Typography";
import TextComponent_17 from "../../atoms/Text/Typography2";
import TitleComponent from "../../atoms/Text/Title";
import TextComponent from "../../atoms/Text/Typography3";
import CancelButton from "../../atoms/Button/CancelButton";
import AddButton from "../../atoms/Button/AddButton";
import SearchIcon from "@mui/icons-material/Search";
import FieldTx from "../../atoms/Text/TextField";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Users } from "../../../models/Users";
import { useAuth } from "../../../hooks/useUserAuth";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";
import { teal } from "@mui/material/colors";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
interface ChildrenProps {
  children?: React.ReactNode;
}

const SearchStudentModal = (
  props,
  open,
  close,
  changeEvent,
  searchStudent,
  users,
  selectStudent
) => {
  const db = getFirestore();
  const { user } = useAuth();
  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modals>
          <TitleComponent>予約者を選択してください</TitleComponent>
          <Box display="flex">
            <FieldTx
              style={{ mb: 3 }}
              label="生徒名を入力"
              changeEv={changeEvent}
            />
            <IconButton onClick={searchStudent}>
              <SearchIcon fontSize="large" />
            </IconButton>
          </Box>
          <Table size="small" sx={{ margin: "auto" }}>
            <TableHead style={{ backgroundColor: "#FFFFDD" }}>
              <TableRow>
                <TableCell
                  width="50%"
                  sx={{ textAlign: "center", fontSize: 13 }}
                >
                  生徒名
                </TableCell>
                <TableCell
                  width="20%"
                  sx={{ textAlign: "center", fontSize: 13 }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((user) => (
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
                        click={selectStudent}
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
