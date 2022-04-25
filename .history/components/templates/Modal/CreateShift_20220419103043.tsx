import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Item from "../../atoms/Item/Item";
import Item2 from "../../atoms/Item/Item2";
import Modals from "../../atoms/Modal/Modal";
import TextComponent_17 from "../../atoms/Text/Typography2";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import SnackComponent from "../../atoms/Snack/SnackTitle";
import { grey, teal } from "@mui/material/colors";
import { useHandle } from "../../../hooks/useHandle";
import { useEventTime } from "../../../hooks/useEventTime";
const CreateShiftModal = (props) => {
  const { onOpen3, handleClose3 } = useHandle();
  const { timeArr } = useEventTime();
  return (
    <>
      <Modal
        open={onOpen3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modals>
          <SnackComponent>以下の内容でシフト登録します</SnackComponent>
          <Item>
            <Box display="flex">
              <TextComponent_17>担当者名 :</TextComponent_17>
              <TextComponent_17>{props.teacher}</TextComponent_17>
            </Box>
          </Item>
          <Item2>
            <Box display="flex">
              <TextComponent_17>開始時間 :</TextComponent_17>
              <FormControl sx={{ mt: 1, minWidth: 80 }}>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={props.time}
                  onChange={props.changeSelect}
                  autoWidth
                  label="時間"
                >
                  {timeArr.map((item) => (
                    <>
                      <MenuItem value={10}>{`${item}:00`}</MenuItem>
                    </>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Item2>
          <Box display="flex" justifyContent="right" mt={5}>
            <PrimaryBtn
              click={props.createShift}
              style={{
                mb: 2,
                mr: 1,
                bgcolor: teal[400],
                color: "white",
                "&:hover": { bgcolor: teal[500] },
              }}
              buttonText={"登録"}
            />
            <PrimaryBtn
              style={{
                mb: 2,
                mr: 1,
                bgcolor: grey[500],
                color: "white",
                "&:hover": { bgcolor: grey[600] },
              }}
              click={handleClose3}
              buttonText={"キャンセル"}
            />
          </Box>
        </Modals>
      </Modal>
    </>
  );
};
export default CreateShiftModal;
