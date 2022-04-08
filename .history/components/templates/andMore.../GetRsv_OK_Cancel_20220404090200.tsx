import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { blue, grey, red, teal } from "@mui/material/colors";
const GetRsv_OK_Cancel = (props) => {
  return (
    <>
      <Box maxWidth={300} display="flex" mx="auto">
        <Box mt={3} display="flex">
          <Box
            ml={3}
            width={30}
            height={30}
            display="flex"
            justifyContent="center"
            borderRadius={2}
            bgcolor={blue[500]}
          >
            <RadioButtonUncheckedIcon
              sx={{
                color: "white",
                fontSize: 12,
                my: "auto",
              }}
            />
          </Box>
          <Typography
            fontSize={12}
            component="div"
            sx={{ ml: 1.5, my: "auto" }}
          >
            予約可
          </Typography>
          <Box
            ml={6}
            width={30}
            height={30}
            display="flex"
            justifyContent="center"
            borderRadius={2}
            bgcolor={blue[500]}
          >
            <RadioButtonUncheckedIcon
              sx={{
                color: "white",
                fontSize: 12,
                my: "auto",
              }}
            />
          </Box>
          <Typography
            fontSize={12}
            component="div"
            sx={{ ml: 1.5, my: "auto" }}
          >
            予約可
          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default GetRsv_OK_Cancel;
