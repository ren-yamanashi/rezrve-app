import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { blue, grey, red, teal } from "@mui/material/colors";
const GetRsv_OK_Cancel = (props) => {
  return (
    <>
      <Box maxWidth={300} display="flex" mx="auto">
        <Box justifyContent="left">
          <Box mt={3} display="flex">
            <Box ml={3} display="flex">
              <Button
                sx={{
                  bgcolor: blue[400],
                  height: "15px",
                  mr: 1,
                  "&:hover": { bgcolor: blue[300] },
                }}
              />
              <Typography fontSize={12} component="div">
                予約可
              </Typography>
            </Box>
            <Box ml={3} display="flex">
              <Button
                sx={{
                  bgcolor: grey[300],
                  height: "15px",
                  mr: 1,
                  "&:hover": { bgcolor: grey[200] },
                }}
              />
              <Typography fontSize={12} component="div">
                予約不可
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default GetRsv_OK_Cancel;
