import * as React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useUserAuth";

interface ButtonProps {
  children?: React.ReactNode;
}

/**===========
 * @param props 画面遷移がある　予約一覧へ推移
 *=========*/
export default function ButtonComponent(props) {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: "#3CB371",
        "&:hover": { bgcolor: "#2E8B57" },
        fontSize: 13,
      }}
    >
      {props.children}
    </Button>
  );
}
