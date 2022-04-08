import * as React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useUserAuth";

interface ButtonProps {
  children?: React.ReactNode;
}

const Btn = (props) => {
  return (
    <>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#3CB371",
          "&:hover": { bgcolor: "#2E8B57" },
          fontSize: 13,
        }}
        onClick={props.click}
      >
        テスト
      </Button>
    </>
  );
};
export default Btn;
