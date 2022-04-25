import React, { useState, FC } from "react";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
interface TitleProps {
  children?: React.ReactNode;
}

const LoginComponent = (props: TitleProps) => {
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h5" fontFamily="Georgia">
        {props.children}
      </Typography>
    </>
  );
};
export default LoginComponent;
