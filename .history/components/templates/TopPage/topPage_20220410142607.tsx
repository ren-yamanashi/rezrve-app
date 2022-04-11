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
const array = [
  {
    title: "顧客管理",
    text: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    title: "スタッフ・シフト",
    text: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    title: "レスポンシブ対応",
    text: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
  {
    title: "かんたん操作",
    text: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
  },
];

const TopPage: React.FC = () => {
  const { usersList, deleteTeacher } = useTeacherList();
  return (
    <>
      <Box sx={{ mb: 5 }}>
        <FirstView />
      </Box>
      <Box display="flex" flexWrap="wrap" bgcolor={blue[500]} width="100%">
        {array &&
          array.map((index) => (
            <>
              <Box my={3} display="flex" justifyContent="center" mx="auto">
                <Grid item xs={4} sm={4} lg={8} md={4}>
                  <Box mb={3} display="flex" justifyContent="center" mx="auto">
                    <Grid item xs={6} sm={8} lg={8} md={8}>
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
                        <PersonAddAltIcon
                          sx={{ color: blue[500], fontSize: 30 }}
                        />
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
              </Box>
            </>
          ))}
      </Box>
    </>
  );
};
export default TopPage;
