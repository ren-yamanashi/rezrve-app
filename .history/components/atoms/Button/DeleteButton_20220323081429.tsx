import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { teal } from "@mui/material/colors";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";

const DeleteShiftButton = (props) => {
  const db = getFirestore();
  return (
    <Tooltip title="シフトを閉じる" arrow>
      <IconButton
        onClick={async () => {
          try {
            await deleteDoc(doc(db, "FreeSpace", props.id));
          } catch (error) {
            console.log(error);
          }
          props.event;
        }}
      >
        <DeleteIcon
          sx={{
            fontSize: 30,
            color: teal[500],
            mt: 3,
            mb: 2,
          }}
        />
      </IconButton>
    </Tooltip>
  );
};
