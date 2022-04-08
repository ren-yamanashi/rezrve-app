import * as React from "react";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
const AddButton = (props) => {
  return (
    <>
      <Button
        variant="contained"
        onClick={props.click}
        sx={{
          mt: 1,
          mb: 2,
          mr: 1,
          bgcolor: teal[400],
          color: "white",
          "&:hover": { bgcolor: teal[500] },
        }}
      >
        キャンセル
      </Button>
    </>
  );
};
export default AddButton;
