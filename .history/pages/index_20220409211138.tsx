import React, { useState, FC } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
// import My File
import Already from "../components/templates/Sign/AlreadyUser";
import Header2 from "../components/templates/Header/Header3";
import SignInComponent from "../components/templates/Sign/Sign_in";
import { useSignUp } from "../hooks/user/useUserList";
import { ToastContainer } from "react-toastify";
import SignInButton from "../components/templates/Sign/SignInButton";

const SignUpPage: FC = () => {
  const theme = createTheme();
  const { loadSingUp } = useSignUp();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return <>予約管理サイト</>;
};
export default SignUpPage;
