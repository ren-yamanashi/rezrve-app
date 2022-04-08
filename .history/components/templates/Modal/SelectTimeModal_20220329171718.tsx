import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Item from "../../atoms/Item";
import Item2 from "../../atoms/Item2";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
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
import { teal, grey } from "@mui/material/colors";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import { useSelectStudent } from "../../../hooks/teacher/getReserves/useSelectStudent";
import { useHandle } from "../../../hooks/handle/useHandle";
import { useReserves_student } from "../../../hooks/teacher/reserves/useReserves";
import { useSelectTimeValue } from "../../../hooks/student/selectTime/useSelectTime";
const SelectTimeModal = (props) => {
  const db = getFirestore();
  const { setSortTime, timeValue } = useSelectTimeValue();
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
                checked={timeValue == 10}
                onChange={() => setSortTime(10)}
                label="10:00"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                checked={timeValue == 11}
                onChange={() => setSortTime(11)}
                label="11:00"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                checked={timeValue == 12}
                onChange={() => setSortTime(12)}
                label="12:00"
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                checked={timeValue == 13}
                onChange={() => setSortTime(13)}
                label="13:00"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                checked={timeValue == 14}
                onChange={() => setSortTime(14)}
                label="14:00"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                checked={timeValue == 15}
                onChange={() => setSortTime(15)}
                label="15:00"
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                checked={timeValue == 16}
                onChange={() => setSortTime(16)}
                label="16:00"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                checked={timeValue == 17}
                onChange={() => setSortTime(17)}
                label="17:00"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                checked={timeValue == 18}
                onChange={() => setSortTime(18)}
                label="18:00"
              />
            </RadioGroup>
          </FormControl>
          <Box display="flex" justifyContent="right">
            <PrimaryBtn
              style={{
                mt: 1,
                mb: 2,
                mr: 1,
                bgcolor: teal[400],
                color: "white",
                "&:hover": { bgcolor: teal[500] },
              }}
              buttonText={"決定"}
              click={props.clickSelect}
            />
            <PrimaryBtn
              style={{
                mt: 1,
                mb: 2,
                mr: 1,
                bgcolor: grey[500],
                color: "white",
                "&:hover": { bgcolor: grey[600] },
              }}
              buttonText={"閉じる"}
              click={handleClose6}
            />
          </Box>
        </Modals>
      </Modal>
    </>
  );
};
export default SelectTimeModal;
