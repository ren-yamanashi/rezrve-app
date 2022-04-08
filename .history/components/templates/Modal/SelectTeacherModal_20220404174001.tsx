import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Modals from "../../atoms/Modal";
import TitleComponent from "../../atoms/Text/Title";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { teal } from "@mui/material/colors";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import { useHandle } from "../../../hooks/handle/useHandle";
import { useReserves_teacher } from "../../../hooks/manager/useReserves";
import { useSelectTeacher } from "../../../hooks/manager/shift/useShift";
import { useDate } from "../../../hooks/date/useDate";
const SelectTeacherModal = (props) => {
  const { loadSelectTeacher } = useSelectTeacher();
  const { newDateTime } = useDate();
  const { handleClose7, onOpen7 } = useHandle();
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
                        loadSelectTeacher(user.userName, newDateTime);
                        handleClose7();
                        props?.load;
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
