import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { blue } from "@mui/material/colors";
import { GetServerSideProps } from "next";

// import myFile
import Title_15 from "../../atoms/Text/Title_15";
import { UploadImage } from "../../../hooks/firebase/user/useUpload";
import { useAuth } from "../../../hooks/firebase/useUserAuth";
import { Query } from "../../../models/router_query";
import Header2 from "../../templates/Header/Header3";
import prisma from "../../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const prismaUser = await prisma.user.findUnique({
    where: {
      id: String(params?.id),
    },
  });
  return {
    props: prismaUser,
  };
};
type Users = {
  id: string;
  userName: string;
};

const AddStore: React.FC<Users> = (props) => {
  const theme = createTheme();
  const router = useRouter();
  const query = router.query as Query;
  const { user } = useAuth();
  const inputRef = React.useRef(null);
  const [time, setTime] = React.useState({ start: 0, end: 0 });
  const { file, handleChange, url, uploadStoreImage, changeDisplayName } =
    UploadImage();
  const [data, setData] = React.useState({
    id: user?.uid,
    name: "",
    address: "",
    error: false,
  });
  const options = [
    { value: 1, label: "1:00" },
    { value: 2, label: "2:00" },
    { value: 3, label: "3:00" },
    { value: 4, label: "4:00" },
    { value: 5, label: "5:00" },
    { value: 6, label: "6:00" },
    { value: 7, label: "7:00" },
    { value: 8, label: "8:00" },
    { value: 9, label: "9:00" },
    { value: 10, label: "10:00" },
    { value: 11, label: "11:00" },
    { value: 12, label: "12:00" },
    { value: 13, label: "13:00" },
    { value: 14, label: "14:00" },
    { value: 15, label: "15:00" },
    { value: 16, label: "16:00" },
    { value: 17, label: "17:00" },
    { value: 18, label: "18:00" },
    { value: 19, label: "19:00" },
    { value: 20, label: "20:00" },
    { value: 21, label: "21:00" },
    { value: 22, label: "22:00" },
    { value: 23, label: "23:00" },
    { value: 24, label: "24:00" },
  ];
  const handleChangeStart = (e) => {
    setTime({ ...time, start: e.value });
  };
  const handleChangeEnd = (e) => {
    setTime({ ...time, end: e.value });
  };
  const timeArr = [];
  for (let index = time.start; index <= time.end; index++) {
    timeArr.push(index);
  }
  async function updateUser(id: string): Promise<void> {
    await fetch(`/api/public/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  return (
    <>
      <Header2 />
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" fontFamily="Georgia">
              店舗詳細登録
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => {
                try {
                  changeDisplayName(
                    e,
                    query.id,
                    data.name,
                    data.address,
                    url,
                    timeArr
                  );
                  router.push(`/${user.displayName}/home/`);
                  updateUser(props.id);
                } catch (error) {
                  console.error(error);
                }
              }}
              sx={{ mt: 1 }}
            >
              <Box display={"flex"} width={500}>
                <Box
                  width={"40%"}
                  display={"flow-root"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Title_15 fontSize={15} textTitle={"店舗名"} />
                </Box>
                <Box width={"60%"}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="店舗名"
                    id="outlined-basic"
                    helperText={inputRef?.current?.validationMessage}
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                  />
                </Box>
              </Box>
              <Box display={"flex"} width={500} mb={2}>
                <Box
                  width={"40%"}
                  display={"flow-root"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Title_15 fontSize={15} textTitle={"店舗住所"} />
                </Box>
                <Box width={"60%"}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="住所"
                    id="outlined-basic"
                    autoComplete="Address"
                    helperText={inputRef?.current?.validationMessage}
                    onChange={(e) => {
                      setData({ ...data, address: e.target.value });
                    }}
                  />
                </Box>
              </Box>
              <Box display={"flex"} width={500} mb={3}>
                <Box
                  width={"40%"}
                  display={"flow-root"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Box display={"flow-root"}>
                    <Title_15 fontSize={15} textTitle={"営業時間"} />
                    <Title_15
                      fontSize={10}
                      textTitle={"※1時間単位での予約となります"}
                    />
                  </Box>
                </Box>
                <Box width={"60%"} display={"flex"}>
                  <Box display={"flex"} justifyContent={"center"} my={"auto"}>
                    <Select options={options} onChange={handleChangeStart} />
                    <Title_15
                      fontSize={15}
                      textTitle={"〜"}
                      style={{ mx: 2, my: "auto" }}
                    />
                    <Select options={options} onChange={handleChangeEnd} />
                  </Box>
                </Box>
              </Box>
              <Box display={"flex"} width={500} mb={3}>
                <Box
                  width={"40%"}
                  display={"flow-root"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Box display={"flow-root"}>
                    <Title_15 fontSize={15} textTitle={"店舗画像"} />
                    <Title_15
                      fontSize={10}
                      textTitle={"※アイコンとして表示されます"}
                    />
                  </Box>
                </Box>
                <Box width={"60%"}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Button variant="contained" sx={{ mt: 2, mx: "auto" }}>
                      {file == undefined ? "画像を選択" : file?.name}
                      <Input
                        sx={{
                          opacity: 0,
                          appearance: "none",
                          position: "absolute",
                        }}
                        type="file"
                        onChange={handleChange}
                      />
                    </Button>
                  </Box>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Button
                      onClick={(e) => uploadStoreImage(e)}
                      sx={{ fontSize: 12 }}
                    >
                      ダウンロード
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box display={"flex"} width={500} mb={3}>
                <Box
                  width={"40%"}
                  display={"flow-root"}
                  my={"auto"}
                  justifyContent={"center"}
                >
                  <Box display={"flow-root"}>
                    <Title_15 fontSize={15} textTitle={"お客様用URL"} />
                    <Title_15
                      fontSize={10}
                      textTitle={
                        "※ホームページ等に貼り付けてご利用下さい。お客様に表示されます"
                      }
                    />
                  </Box>
                </Box>
                <Box width={"60%"}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Title_15
                      fontSize={15}
                      style={{
                        color: blue[600],
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      textTitle={`https://next-reserve-app.vercel.app/${query?.id}/reserver/`}
                    />
                  </Box>
                </Box>
              </Box>
              <Box textAlign="center">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 5,
                    mb: 4,
                    alignItems: "center",
                    fontFamily: "Georgia",
                  }}
                >
                  登録
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
};
export default AddStore;
