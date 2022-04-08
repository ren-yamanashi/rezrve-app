import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";

const SignInButton = () => {
  return (
    <>
      <Box textAlign="center">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 4,
            width: "30%",
            alignItems: "center",
            fontFamily: "Georgia",
          }}
        >
          Sign In
        </Button>
      </Box>
    </>
  );
};

export default SignInButton;
