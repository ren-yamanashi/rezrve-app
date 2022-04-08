import * as React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useUserAuth";

interface ButtonProps {
  children?: React.ReactNode;
}

const click = (e, props) => {
  e.preventDefault();
  console.log(props, e);
};
class Btn extends React.Component {
  render() {
    return (
      <Button
        variant="contained"
        sx={{
          bgcolor: "#3CB371",
          "&:hover": { bgcolor: "#2E8B57" },
          fontSize: 13,
        }}
        onClick={(e) => click(e, this.props)}
      >
        テスト
      </Button>
    );
  }
}
