import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListIcon from "@mui/icons-material/List";
import FormControl from "@mui/material/FormControl";
import InputLabelComponent2 from "../InputLabel/InputLabel_white";
import SelectComponent from "../Select";
import MenuItemComponent from "../MenuItem";

const ShiftButton = (props) => {
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
            <InputLabelComponent2>スタッフシフト</InputLabelComponent2>
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

export default ShiftButton;
