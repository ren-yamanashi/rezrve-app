import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";

const LoginButton = () => {
  return (
    <>
      <Box textAlign="center">
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            mb: 4,
            width: "30%",
            alignItems: "center",
            fontFamily: "Georgia",
          }}
        >
          Login
        </Button>
      </Box>
    </>
  );
};

export default LoginButton;
