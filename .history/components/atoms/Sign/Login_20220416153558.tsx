import React, { useState, FC } from "react";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";

const LoginComponent = (props?) => {
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h5" fontFamily="Georgia">
        Login
      </Typography>
    </>
  );
};
export default LoginComponent;
