import * as React from "react";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
const CancelButton = (props) => {
  return (
    <>
      <Button
        variant="contained"
        onClick={props.click}
        sx={{
          mt: 1,
          mb: 2,
          mr: 1,
          bgcolor: grey[500],
          color: "white",
          "&:hover": { bgcolor: grey[600] },
        }}
      >
        キャンセル
      </Button>
    </>
  );
};
export default CancelButton;
