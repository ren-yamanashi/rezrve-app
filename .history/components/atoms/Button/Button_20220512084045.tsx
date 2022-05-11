import * as React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useUserAuth";
import { blue } from "@mui/material/colors";

interface ButtonProps {
  children?: React.ReactNode;
}

// 予約一覧画面へ遷移
const ButtonComponent = (props: ButtonProps) => {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: blue[400],
        "&:hover": { bgcolor: blue[300] },
        fontSize: 13,
      }}
      onClick={() => router.push("/staff/reserve/")}
    >
      {props.children}
    </Button>
  );
};
export default ButtonComponent;
