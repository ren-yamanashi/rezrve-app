import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { teal } from "@mui/material/colors";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";

const EditButton = (props) => {
  return (
    <Tooltip title={props.tooltipText} arrow>
      <IconButton onClick={props.onClickEvent}>
        <EditIcon
          sx={{
            fontSize: 20,
            color: teal[500],
          }}
        />
      </IconButton>
    </Tooltip>
  );
};
export default EditButton;
