import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import Link from "next/link";
import Typography from "@mui/material/Typography";

const AlreadyUser = () => {
  return (
    <Box textAlign="center" mt={1}>
      <Typography>
        アカウントをお持ちの方は
        <Button>
          <Link href="/user/login">こちら</Link>
        </Button>
      </Typography>
    </Box>
  );
};

export default AlreadyUser;
