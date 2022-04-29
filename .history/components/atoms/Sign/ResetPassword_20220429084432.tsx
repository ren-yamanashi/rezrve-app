import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import { useResetPassword } from "../../../hooks/firebase/user/useSign";

const ResetPass = (props) => {
  const { loadResetPassword } = useResetPassword();
  return (
    <Box textAlign="center" mt={1}>
      <Button onClick={(event) => loadResetPassword(event, props.FromAddress)}>
        パスワード再発行 / 変更
      </Button>
    </Box>
  );
};

export default ResetPass;
