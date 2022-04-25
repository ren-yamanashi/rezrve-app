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
import { useHandle } from "../../../hooks/useHandle";
import DateRangePicker from "../../atoms/Date/Date ";
import { useDate } from "../../../hooks/date/useDate";
import { useSelectStore } from "../../../hooks/firebase/user/useSelectStore";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { useSelectUser_query } from "../../../hooks/firebase/user/useUserList";
const CreateShiftModal = (props) => {
  const { onOpen3, handleClose3 } = useHandle();
  const { loadUser_query, user_query } = useSelectUser_query();
  const { changeDateValue, dateValue } = useDate();
  const { user } = useAuth();

  // const options = [
  //   { value: 1, label: "1:00" },
  //   { value: 2, label: "2:00" },
  //   { value: 3, label: "3:00" },
  //   { value: 4, label: "4:00" },
  //   { value: 5, label: "5:00" },
  //   { value: 6, label: "6:00" },
  //   { value: 7, label: "7:00" },
  //   { value: 8, label: "8:00" },
  //   { value: 9, label: "9:00" },
  //   { value: 10, label: "10:00" },
  //   { value: 11, label: "11:00" },
  //   { value: 12, label: "12:00" },
  //   { value: 13, label: "13:00" },
  //   { value: 14, label: "14:00" },
  //   { value: 15, label: "15:00" },
  //   { value: 16, label: "16:00" },
  //   { value: 17, label: "17:00" },
  //   { value: 18, label: "18:00" },
  //   { value: 19, label: "19:00" },
  //   { value: 20, label: "20:00" },
  //   { value: 21, label: "21:00" },
  //   { value: 22, label: "22:00" },
  //   { value: 23, label: "23:00" },
  //   { value: 24, label: "24:00" },
  // ];
  const options = [];
  React.useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user == null) {
      return;
    }
    loadUser_query(user.uid);
    user_query?.times.map((time) => {
      options.push({ value: time, label: `${time}:00` });
    });
  }, [process.browser, user]);
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
            <DateRangePicker
              value={dateValue}
              changeDate={(newDate) => changeDateValue(newDate)}
            />
          </Item>
          <Item2>
            <Box display="flex">
              <TextComponent_17>開始時間</TextComponent_17>
              <Select options={options} onChange={props.changeSelect} />
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
