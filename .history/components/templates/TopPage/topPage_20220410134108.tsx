import React from "react";
import FirstView from "../../organisms/top/FirstView";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const TopPage: React.FC = () => {
  return (
    <>
      <Box sx={{ mb: 5 }}>
        <FirstView />
      </Box>
      <Box sx={{ bgcolor: blue[500], width: "100%" }}>
        <Box display="flex" flexWrap="wrap">
          <Box mb={3} display="flex" justifyContent="center" mx="auto">
            <Grid item xs={6} sm={4} lg={4} md={5}>
              <Box
                display="flex"
                justifyContent="center"
                textAlign={"center"}
                alignItems={"center"}
                mx="auto"
                bgcolor={"white"}
                width={50}
                height={50}
                borderRadius={"50%"}
              >
                <PersonAddAltIcon />
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default TopPage;
