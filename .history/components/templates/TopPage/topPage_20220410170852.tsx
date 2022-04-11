import React from "react";
import FirstView from "../../organisms/top/FirstView";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Title_15 from "../../atoms/Text/Title_15";
import { blue } from "@mui/material/colors";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useTeacherList } from "../../../hooks/user/useUserList";
import CardMedia from "@mui/material/CardMedia";
import { bgcolor } from "@mui/system";
const array = [
  {
    title: "顧客管理",
    text: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    iconNumber: 1,
  },
  {
    title: "スタッフ・シフト",
    text: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    iconNumber: 2,
  },
  {
    title: "レスポンシブ対応",
    text: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    iconNumber: 3,
  },
  {
    title: "かんたん操作",
    text: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    iconNumber: 4,
  },
];

const TopPage: React.FC = () => {
  return (
    <>
      <FirstView />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          bgcolor: blue[500],
          my: 5,
        }}
      >
        {array &&
          array.map((index) => (
            <>
              <Box mb={3} display="flex" justifyContent="center" mx="auto">
                <Grid item xs={6} sm={4} lg={4} md={4}>
                  <Box mb={3} display="flex" justifyContent="center" mx="auto">
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
                        textTitle={index.title}
                        style={{ mb: 2 }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </>
          ))}
      </Box>
    </>
  );
};
export default TopPage;
