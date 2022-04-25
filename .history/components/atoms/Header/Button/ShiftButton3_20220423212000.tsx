import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link_mui from "@mui/material/Link";
import ListIcon from "@mui/icons-material/List";
import { blue } from "@mui/material/colors";
const ShiftButton_Simple = (props) => {
  return (
    <>
      <Link_mui href={props.goLink}>
        <ListItem button key="Home">
          <ListItemIcon>
            <ListIcon sx={{ color: "white", mt: 2 }} />
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

export default ShiftButton_Simple;
