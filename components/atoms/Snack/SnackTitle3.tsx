import * as React from "react";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { teal } from "@mui/material/colors";

const SnackComponent3 = () => {
  return (
    <>
      <Stack spacing={2} sx={{ maxWidth: 600, mb: 3, mx: "auto" }}>
        <SnackbarContent
          sx={{
            bgcolor: teal[400],
            justifyContent: "center",
            boxShadow: "none",
          }}
          message={"検索方法を指定して予約をする"}
        />
      </Stack>
    </>
  );
};
export default SnackComponent3;
