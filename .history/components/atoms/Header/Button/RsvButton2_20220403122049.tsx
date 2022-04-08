import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link_mui from "@mui/material/Link";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { blue } from "@mui/material/colors";
const RsvButton = (props) => {
  return (
    <>
      <Link_mui href={props.goLink}>
        <ListItem button key="Home">
          <ListItemIcon>
            <DateRangeIcon sx={{ color: blue[500], mt: 1 }} />
          </ListItemIcon>
          <ListItemText
            primary="予約確認 / 登録"
            sx={{ color: blue[500], mt: 2, fontSize: "13px" }}
          />
        </ListItem>
      </Link_mui>
    </>
  );
};

export default RsvButton;
