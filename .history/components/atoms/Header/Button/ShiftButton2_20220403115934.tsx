import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link_mui from "@mui/material/Link";
import ListIcon from "@mui/icons-material/List";
import FormControl from "@mui/material/FormControl";
import InputLabelComponent3 from "../InputLabel/InputLabel_blue";
import SelectComponent from "../Select";
import MenuItemComponent from "../MenuItem";

const ShiftButton_Blue = (props) => {
  return (
    <>
      <ListItem button key="Add">
        <ListItemIcon>
          <ListIcon sx={{ color: "#e3f2fd", mt: 2 }} />
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
