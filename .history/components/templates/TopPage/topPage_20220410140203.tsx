import React from "react";
import FirstView from "../../organisms/top/FirstView";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Title_15 from "../../atoms/Text/Title_15";
import { blue } from "@mui/material/colors";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const TopPage: React.FC = () => {
  return (
    <>
      <Box sx={{ mb: 5 }}>
        <FirstView />
      </Box>
      <Box
        sx={{
          bgcolor: blue[500],
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Box mb={3} display="flex" justifyContent="center" mx="auto">
          <Box
            display="flex"
            justifyContent="center"
            alignItems={"center"}
            mx="auto"
            mt={2}
            bgcolor={"white"}
            width={50}
            height={50}
            borderRadius={"50%"}
          >
            <PersonAddAltIcon sx={{ color: blue[500], fontSize: 30 }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              my: "auto",
              bgcolor: "white",
              borderRadius: "10%",
              height: 200,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mx: "auto",
                mt: 2,
              }}
            >
              <Title_15
                fontSize={18}
                fontWeight={600}
                textTitle={"顧客管理"}
                style={{ mb: 2 }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mx: "auto",
                width: "80%",
              }}
            >
              <Title_15
                fontSize={10}
                textTitle={
                  "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
                }
                style={{ mb: 2, textAlign: "left" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default TopPage;
