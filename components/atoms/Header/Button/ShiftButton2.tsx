import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListIcon from "@mui/icons-material/List";
import FormControl from "@mui/material/FormControl";
import InputLabelComponent3 from "../InputLabel/InputLabel_blue";
import SelectComponent from "../Select";
import MenuItemComponent from "../MenuItem";
import { blue } from "@mui/material/colors";

const ShiftButton_Blue = (props) => {
  return (
    <>
      <ListItem button key="Add">
        <ListItemIcon>
          <ListIcon sx={{ color: blue[500], mt: 2 }} />
        </ListItemIcon>
        <>
          <FormControl
            variant="standard"
            sx={{
              minWidth: 120,
              textAlign: "center",
              color: "white",
            }}
          >
            <InputLabelComponent3>スタッフシフト</InputLabelComponent3>
            <SelectComponent>
              <MenuItemComponent
                clickEvent={props.addShift}
                buttonText={"シフト登録"}
              />
              <MenuItemComponent
                clickEvent={props.seeShift}
                buttonText={"シフト確認"}
              />
            </SelectComponent>
          </FormControl>
        </>
      </ListItem>
    </>
  );
};

export default ShiftButton_Blue;
