import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { teal } from "@mui/material/colors";

const DeleteShiftButton = (props) => {
  return (
    <Tooltip title="シフトを閉じる" arrow>
      <IconButton onClick={props.onClickEvent}>
        <DeleteIcon
          sx={{
            fontSize: 30,
            color: teal[500],
          }}
        />
      </IconButton>
    </Tooltip>
  );
};
export default DeleteShiftButton;
