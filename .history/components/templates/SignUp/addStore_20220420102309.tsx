import React, { useState, FC, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Title_15 from "../../atoms/Text/Title_15";

import { useSignUp, useJoin } from "../../../hooks/firebase/user/useUserList";
import Header2 from "../../templates/Header/Header3";
import Already from "../../atoms/Sign/AlreadyUser";
import SignIn from "../../atoms/Sign/Sign_in";
import SignInButton from "../../atoms/Sign/SignInButton";
import { ToastContainer } from "react-toastify";
import Footer from "../Footer/Footer";

const AddStore = () => {
  const theme = createTheme();
  const inputRef = useRef(null);
  const { loginCompony, joinCompony } = useJoin();
  const { loadSingUp } = useSignUp();
  const [data, setData] = useState({
    email: "",
    password: "",
    password2: "",
    id: "",
    error: false,
  });

  const handleChange = () => {
    if (inputRef.current) {
      const ref = inputRef.current;
      if (!ref.validity.valid) {
        setData({ ...data, error: true });
      } else {
        setData({ ...data, error: false });
      }
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5" fontFamily="Georgia">
        店舗新規登録
      </Typography>
    </>
  );
};
export default AddStore;
