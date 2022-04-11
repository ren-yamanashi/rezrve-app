import React from "react";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useUserAuth";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Title_15 from "../../atoms/Text/Title_15";
import Link from "next/link";

const Footer = () => {
  const { user } = useAuth();
  return (
    <>
      <Box sx={{ py: 4, ml: "0px", bgcolor: grey[50] }}>
        <Link href={"top"}>
          <Title_15
            fontSize={15}
            textTitle={"利用規約"}
            style={{
              my: "auto",
              ml: 10,
            }}
          />
        </Link>
        <>
          <a href="#top">
            <Typography
              variant="h6"
              noWrap
              sx={{
                flexGrow: 1,
                fontFamily: "Comic Sans MS",
                fontSize: 15,
                ml: user && user ? 10 : 0,
              }}
              component="div"
            >
              © 2022 REZRVE.
            </Typography>
          </a>
        </>
      </Box>
    </>
  );
};

export default Footer;
