import React from "react";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useUserAuth";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

const Footer = () => {
  const { user } = useAuth();
  return (
    <>
      <Box sx={{ py: 4, ml: "0px", bgcolor: grey[200] }}>
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
