import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { blue, teal } from "@mui/material/colors";
import Box from "@mui/material/Box";

//タイトルコンポーネントを作成して、中身をpropsとして渡す。
const SnackComponent3 = (props) => {
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
