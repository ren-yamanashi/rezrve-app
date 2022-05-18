import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Modals from "../../atoms/Modal/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { teal } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
// import my File
import TitleComponent from "../../atoms/Text/Title";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";

//OK
const SelectTeacherModal = (props) => {
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
            title={"担当者ごとの予約を見る"}
            message={"担当者を指定してください"}
          />
          <Table size="small" sx={{ margin: "auto" }}>
            <TableHead style={{ backgroundColor: "#FFFFDD" }}>
              <TableRow>
                <TableCell
                  width="50%"
                  sx={{ textAlign: "center", fontSize: 13 }}
                >
                  担当者名
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
                        src={user.staffImageUrl}
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
                      click={() => window.open(`/src/${user.id}`)}
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
export default SelectTeacherModal;
