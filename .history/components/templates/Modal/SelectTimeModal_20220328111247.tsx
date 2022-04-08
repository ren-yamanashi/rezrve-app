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
import { useReserves_student } from "../../../hooks/teacher/reserves/useReserves";
const SelectTimeModal = (props) => {
  const db = getFirestore();
  const { user } = useAuth();
  const { setData } = useSelectStudent();
  const { handleOpen6, handleClose6, onOpen6 } = useHandle();
  const { loadRsvStudent } = useReserves_student();
  return (
    <>
      <Modal
        open={onOpen6}
        onClose={handleClose6}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modals>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                checked={sortTime == 10}
                onChange={() => setSortTime(10)}
                label="10:00"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                checked={sortTime == 11}
                onChange={() => setSortTime(11)}
                label="11:00"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                checked={sortTime == 12}
                onChange={() => setSortTime(12)}
                label="12:00"
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                checked={sortTime == 13}
                onChange={() => setSortTime(13)}
                label="13:00"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                checked={sortTime == 14}
                onChange={() => setSortTime(14)}
                label="14:00"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                checked={sortTime == 15}
                onChange={() => setSortTime(15)}
                label="15:00"
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                checked={sortTime == 16}
                onChange={() => setSortTime(16)}
                label="16:00"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                checked={sortTime == 17}
                onChange={() => setSortTime(17)}
                label="17:00"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                checked={sortTime == 18}
                onChange={() => setSortTime(18)}
                label="18:00"
              />
            </RadioGroup>
          </FormControl>
        </Modals>
      </Modal>
    </>
  );
};
export default SelectTimeModal;
