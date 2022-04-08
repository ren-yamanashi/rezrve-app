import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";
import { blue } from "@mui/material/colors";
import Box from "@mui/material/Box";
interface TypographyProps {
  children?: React.ReactNode;
}
//タイトルコンポーネントを作成して、中身をpropsとして渡す。
export default function TitleComponent(props: TypographyProps) {
  return (
    <>
      <Stack spacing={2} sx={{ width: "100%", my: 3, mx: "auto" }}>
        <SnackbarContent
          sx={{
            bgcolor: blue[400],
            justifyContent: "center",
            boxShadow: "none",
            fontWeight: 600,
          }}
          message={"講師選択"}
        />
      </Stack>
      <Box display="flex">
        <Typography
          variant="h5"
          component="div"
          color="black"
          textAlign="center"
          mx="auto"
          fontSize={17}
          fontWeight={400}
          mb={3}
        >
          {props.children}
        </Typography>
      </Box>
    </>
  );
}
