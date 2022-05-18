import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Item from "../../atoms/Item/Item";
import Item2 from "../../atoms/Item/Item2";
import Modals from "../../atoms/Modal/Modal";
import TextComponent_17 from "../../atoms/Text/Typography2";
import Select from "react-select";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import SnackComponent from "../../atoms/Snack/SnackTitle";
import { grey, teal } from "@mui/material/colors";
import DateRangePicker from "../../atoms/Date/Date ";
import { useDate } from "../../../hooks/date/useDate";
import { useSelectUser_query } from "../../../hooks/firebase/user/useUserList";

const CreateShiftModal = (props) => {
  const { user_query } = useSelectUser_query();
  const { changeDateValue, dateValue } = useDate();
  const options = [];
  user_query?.times.map((time) => {
    options.push({ value: time, label: `${time}:00` });
  });
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modals>
          <SnackComponent>以下の内容でシフト登録します</SnackComponent>
          <Item>
            <DateRangePicker
              value={props.dateValue}
              changeDate={props.changeDateValue}
            />
          </Item>
          <Item2>
            <Box display="flex">
              <TextComponent_17>開始時間</TextComponent_17>
              <Select options={props.options} onChange={props.changeSelect} />
            </Box>
          </Item2>
          <Item>
            <Box display="flex">
              <TextComponent_17>講師名</TextComponent_17>
              <TextComponent_17>{props.staffName}</TextComponent_17>
            </Box>
          </Item>
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
              click={props.handleClose}
              buttonText={"キャンセル"}
            />
          </Box>
        </Modals>
      </Modal>
    </>
  );
};
export default CreateShiftModal;
