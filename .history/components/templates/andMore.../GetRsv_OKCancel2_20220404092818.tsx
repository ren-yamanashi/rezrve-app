import Box from "@mui/material/Box";
import RectangleIcon from "@mui/icons-material/Rectangle";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { blue, grey, red, teal } from "@mui/material/colors";
const GetRsv_OK_Cancel = (props) => {
  return (
    <>
      <Box maxWidth={300} display="flex" mx="auto">
        <Box mt={3} display="flex">
          <Box
            ml={4}
            width={30}
            height={30}
            display="flex"
            justifyContent="center"
            borderRadius={2}
            borderColor={"black"}
            border={2}
            bgcolor={"white"}
          >
            <RectangleIcon
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
            ml={8}
            width={30}
            height={30}
            display="flex"
            justifyContent="center"
            borderRadius={2}
            bgcolor={grey[600]}
          >
            <RectangleIcon
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
            予約不可
          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default GetRsv_OK_Cancel;
