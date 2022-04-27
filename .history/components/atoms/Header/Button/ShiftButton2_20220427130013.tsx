import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListIcon from "@mui/icons-material/List";
import ListItemText from "@mui/material/ListItemText";
import Link_mui from "@mui/material/Link";
import { blue } from "@mui/material/colors";

const ShiftButton_Blue = (props) => {
  return (
    <>
      <Link_mui href={props.goLink}>
        <ListItem button key="Add">
          <ListItemIcon>
            <ListIcon sx={{ color: blue[500], mt: 2 }} />
          </ListItemIcon>
          <ListItemText
            primary="シフト"
            sx={{ color: "white", fontSize: "13px", mt: 2 }}
          />
        </ListItem>
      </Link_mui>
    </>
  );
};

export default ShiftButton_Blue;
