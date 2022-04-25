import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Item from "../../atoms/Item/Item";
import Item2 from "../../atoms/Item/Item2";
import Modals from "../../atoms/Modal/Modal";
import TextComponent_17 from "../../atoms/Text/Typography2";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "react-select";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import SnackComponent from "../../atoms/Snack/SnackTitle";
import { grey, teal } from "@mui/material/colors";
import { useHandle } from "../../../hooks/useHandle";
import DateRangePicker from "../../atoms/Date/Date ";
import { useDate } from "../../../hooks/date/useDate";
import { useEventTime } from "../../../hooks/useEventTime";
import { useSelectStore } from "../../../hooks/firebase/user/useSelectStore";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
const CreateShiftModal = (props) => {
  const { onOpen3, handleClose3 } = useHandle();
  const { changeDateValue, dateValue } = useDate();
  const { timeArr } = useEventTime();
  const [time, setTime] = React.useState(0);
  const { selectStore, store } = useSelectStore();
  const { user } = useAuth();
  const options = store.times.map((item) => [
    { value: item, label: `${item}:00` },
  ]);

  const handleChangeStart = (e) => {
    setTime(e.value);
  };
  React.useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user == null) {
      return;
    }
    selectStore(user.uid);
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
              <TextComponent_17>開始時間 :</TextComponent_17>
              <Select options={options} onChange={handleChangeStart} />
            </Box>
          </Item2>
          <Item>
            <Box display="flex">
              <TextComponent_17>講師名 :</TextComponent_17>
              <TextComponent_17>{props.teacher}</TextComponent_17>
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
