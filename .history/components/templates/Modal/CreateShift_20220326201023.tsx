import * as React from "react";
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
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SnackComponent from "../../atoms/Text/SnackTitle";
const CreateShiftModal = (props) => {
  return (
    <>
      <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Modals >
              <SnackComponent>以下の内容でシフト登録します</SnackComponent>
                
				<Item>
            <Box display="flex">
              <TextComponent_17>講師名 :</TextComponent_17>
			  <TextComponent_17>{props.teacher}</TextComponent_17>
            </Box>
          </Item>
                  <Typography
                    sx={{ fontSize: 20, mr: 1 }}
                    color="black"
                    gutterBottom
                  >
                    講師名 :
                  </Typography>
                  <Typography
                    sx={{ fontSize: 20 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {user && user.displayName}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                  <Typography
                    sx={{ fontSize: 20, my: "auto", mr: 1 }}
                    color="black"
                    gutterBottom
                  >
                    開始時間 :
                  </Typography>
                  <FormControl sx={{ mt: 1, minWidth: 80 }}>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={age}
                      onChange={handleChange}
                      autoWidth
                      label="時間"
                    >
                      <MenuItem value={10}>10:00</MenuItem>
                      <MenuItem value={11}>11:00</MenuItem>
                      <MenuItem value={12}>12:00</MenuItem>
                      <MenuItem value={13}>13:00</MenuItem>
                      <MenuItem value={14}>14:00</MenuItem>
                      <MenuItem value={15}>15:00</MenuItem>
                      <MenuItem value={16}>16:00</MenuItem>
                      <MenuItem value={17}>17:00</MenuItem>
                      <MenuItem value={18}>18:00</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="right" mt={5}>
                  <PrimaryBtn
                    click={(e) => createShift(e, teacher, age, xxx)}
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
                    click={() => setOpen(false)}
                    buttonText={"キャンセル"}
                  />
                </Box>
              </Box>
            </Modals>
          </Modal>
    </>
  );
};
export default CreateShiftModal;