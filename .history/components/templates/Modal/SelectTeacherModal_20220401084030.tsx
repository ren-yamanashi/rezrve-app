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
import { getFirestore } from "firebase/firestore";
import { teal } from "@mui/material/colors";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import { useSelectStudent } from "../../../hooks/teacher/getReserves/useSelectStudent";
import { useHandle } from "../../../hooks/handle/useHandle";
import { useReserves_teacher } from "../../../hooks/manager/useReserves";
const SelectTeacherModal = (props) => {
  const db = getFirestore();
  const { user } = useAuth();
  const { setData } = useSelectStudent();
  const { handleOpen7, handleClose7, onOpen7 } = useHandle();
  const { loadRsvTeacher } = useReserves_teacher();
  return (
    <>
      <Modal
        open={onOpen7}
        onClose={handleClose7}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modals>
          <TitleComponent>講師を選択してください</TitleComponent>
          <Table size="small" sx={{ margin: "auto" }}>
            <TableHead style={{ backgroundColor: "#FFFFDD" }}>
              <TableRow>
                <TableCell
                  width="50%"
                  sx={{ textAlign: "center", fontSize: 13 }}
                >
                  講師名
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
                    <Box display="flex">
                      <Box
                        component="img"
                        sx={{
                          height: 40,
                          width: 40,
                          borderRadius: "50%",
                        }}
                        alt={user.userName}
                        src={user.url}
                      />
                      <Box
                        sx={{
                          textAlign: "center",
                          my: "auto",
                          ml: 1,
                          fontSize: "11px",
                        }}
                      >
                        {user.userName}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    width="50%"
                    sx={{ textAlign: "center", fontSize: 12 }}
                  >
                    <PrimaryBtn
                      style={{ bgcolor: teal[500], fontSize: 12 }}
                      buttonText={"選択"}
                      click={() => {
                        loadRsvTeacher(user.userName);
                        handleClose7();
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
export default SelectTeacherModal;
