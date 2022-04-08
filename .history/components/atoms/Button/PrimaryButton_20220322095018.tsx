import * as React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useUserAuth";

interface ButtonProps {
  children?: React.ReactNode;
}

const PrimaryBtn = (props) => {
  return (
    <>
      <Button variant="contained" onClick={props.click}>
        {props.title}
      </Button>
    </>
  );
};
export default PrimaryBtn;
