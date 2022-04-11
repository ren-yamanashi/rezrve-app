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
    url: "https://source.unsplash.com/random",
  },
  {
    title: "スタッフ・シフト",
    text: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    iconNumber: 2,
    url: "https://source.unsplash.com/random",
  },
  {
    title: "レスポンシブ対応",
    text: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    iconNumber: 3,
    url: "https://source.unsplash.com/random",
  },
  {
    title: "かんたん操作",
    text: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
    iconNumber: 4,
    url: "https://source.unsplash.com/random",
  },
];

const TopPage: React.FC = () => {
  const { usersList, deleteTeacher } = useTeacherList();
  return (
    <>
      <FirstView />
      <Box
        sx={{ display: "flex", flexWrap: "wrap", bgcolor: blue[500], my: 5 }}
      >
        {array.map((index) => (
          <>
            <Box
              sx={{
                my: 3,
                display: "flex",
                justifyContent: "center",
                mx: "auto",
              }}
            >
              <Grid item xs={6} sm={4} lg={4} md={5}>
                <Box mb={3} display="flex" justifyContent="center" mx="auto">
                  <CardContent
                    style={{
                      borderRadius: "7px",
                      borderStyle: "solid",
                      backgroundColor: "white",
                      borderWidth: "2px",
                      borderColor: "white",
                      margin: "auto",
                      height: 250,
                    }}
                  >
                    <Grid item xs={6} sm={8} lg={3} md={8}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          flexDirection: "column",
                          my: "auto",
                        }}
                      >
                        <Title_15
                          fontSize={15}
                          color={"primary"}
                          fontWeight={600}
                          textTitle={index.title}
                          style={{ mb: 2 }}
                        />
                        <CardMedia
                          component="img"
                          sx={{
                            width: 200,
                            height: 120,
                            borderRadius: "10%",
                            justifyContent: "center",
                            textAlign: "center",
                            alignItems: "center",
                          }}
                          image={index.url}
                          alt="Icon"
                        />
                      </Box>
                    </Grid>
                  </CardContent>
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
