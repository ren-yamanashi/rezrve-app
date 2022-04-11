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
          mx: "auto",
        }}
      >
        {array &&
          array.map((index) => (
            <>
              <Grid item xs={6} sm={4} lg={4} md={5}>
                <Box
                  sx={{
                    my: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    mx: "auto",
                  }}
                >
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
                    {index.iconNumber == 1 && (
                      <PersonAddAltIcon
                        sx={{ color: blue[500], fontSize: 30 }}
                      />
                    )}
                    {index.iconNumber == 2 && (
                      <PersonAddAltIcon
                        sx={{ color: blue[500], fontSize: 30 }}
                      />
                    )}
                    {index.iconNumber == 3 && (
                      <PersonAddAltIcon
                        sx={{ color: blue[500], fontSize: 30 }}
                      />
                    )}
                    {index.iconNumber == 4 && (
                      <PersonAddAltIcon
                        sx={{ color: blue[500], fontSize: 30 }}
                      />
                    )}
                  </Box>
                  <Grid item xs={6} sm={8} lg={3} md={8}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        my: "auto",
                        mx: "auto",
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
                          textTitle={index.title}
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
                          textTitle={index.text}
                          style={{ mb: 2, textAlign: "left" }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Box>
              </Grid>
            </>
          ))}
      </Box>
    </>
  );
};
export default TopPage;
