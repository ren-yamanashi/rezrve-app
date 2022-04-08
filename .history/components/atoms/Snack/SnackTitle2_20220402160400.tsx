import * as React from "react";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { blue } from "@mui/material/colors";

//タイトルコンポーネントを作成して、中身をpropsとして渡す。
const SnackComponent2 = (props) => {
  return (
    <>
      <Stack spacing={2} sx={{ width: "100%", mt: 2, mx: "auto" }}>
        <SnackbarContent
          sx={{
            bgcolor: blue[400],
            justifyContent: "center",
            boxShadow: "none",
            fontWeight: 600,
          }}
          message={props.snackText}
        />
      </Stack>
    </>
  );
};
export default SnackComponent2;
