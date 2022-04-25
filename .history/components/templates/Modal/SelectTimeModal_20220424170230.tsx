import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Modals from "../../atoms/Modal/Modal";
import { teal, grey } from "@mui/material/colors";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import { useHandle } from "../../../hooks/useHandle";
import { useSelectTimeValue } from "../../../hooks/useSelectTime";
import { useSelectUser_query } from "../../../hooks/firebase/user/useUserList";
import { useAuth } from "../../../hooks/firebase/useUserAuth";

const SelectTimeModal = (props) => {
  const { setSortTime, timeValue } = useSelectTimeValue();
  const { handleClose6, onOpen6 } = useHandle();
  const { user_query, loadUser_query } = useSelectUser_query();
  const { user } = useAuth();
  React.useEffect(() => {
    if (!process.browser) {
      return;
    }
    if (user == null) {
      return;
    }
    loadUser_query(user?.uid);
  }, [process.browser, user]);
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
              {user_query?.times.map((item) => (
                <>
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    checked={timeValue == item}
                    onChange={() => setSortTime(item)}
                    label={`${item}:00`}
                  />
                </>
              ))}
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
