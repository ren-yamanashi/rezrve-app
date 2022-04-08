import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link_mui from "@mui/material/Link";
import ListIcon from "@mui/icons-material/List";
import HomeIcon from "@mui/icons-material/Home";
const SelectComponent = (props) => {
  return (
    <>
      <Link_mui href={`/home/manager/${user?.uid}`}>
        <ListItem button key="Home">
          <ListItemIcon>
            <HomeIcon sx={{ color: "#e3f2fd" }} />
          </ListItemIcon>
          <ListItemText
            primary="ホーム"
            sx={{ color: "#e3f2fd", fontSize: "13px" }}
          />
        </ListItem>
      </Link_mui>
    </>
  );
};

export default SelectComponent;
