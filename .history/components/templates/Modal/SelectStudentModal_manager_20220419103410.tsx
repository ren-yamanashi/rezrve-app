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
import { ToastContainer } from "react-toastify";
import { teal } from "@mui/material/colors";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import { useHandle } from "../../../hooks/useHandle";
import { useReserves_student } from "../../../hooks/firebase/manager/useReserves";
import { useStudentsList } from "../../../hooks/firebase/user/useUserList";

const SelectStudentModal = () => {
  const [sortStudent, setSortStudent] = React.useState<string>("");
  const { handleClose5, onOpen5 } = useHandle();
  const { loadRsvStudent } = useReserves_student();
  const { studentsList, loadSearchStudentsList } = useStudentsList();
  return (
    <>
      <Modal
        open={onOpen5}
        onClose={handleClose5}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modals>
          <TitleComponent>予約者を選択してください</TitleComponent>
          <Box display="flex">
            <FieldTx
              style={{ mb: 3 }}
              label="名前を入力"
              changeEv={(e) => setSortStudent(e.target.value)}
            />
            <IconButton onClick={() => loadSearchStudentsList(sortStudent)}>
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
                  顧客名
                </TableCell>
                <TableCell
                  width="20%"
                  sx={{ textAlign: "center", fontSize: 13 }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsList &&
                studentsList.map((user) => (
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
                          loadRsvStudent(user.userName);
                          handleClose5();
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Modals>
      </Modal>
      <ToastContainer />
    </>
  );
};
export default SelectStudentModal;
