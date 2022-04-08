import Box from "@mui/material/Box";
import RectangleIcon from "@mui/icons-material/Rectangle";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { blue, grey, red, teal } from "@mui/material/colors";
const GetRsv_OK_Cancel = (props) => {
  return (
    <>
      <Box maxWidth={500} display="flex" mx="auto">
        <Box display="flex">
          <Box
            ml={4}
            width={40}
            height={30}
            display="flex"
            justifyContent="center"
            bgcolor={teal[500]}
          >
            <RectangleIcon
              sx={{
                color: teal[500],
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
            予約済み
          </Typography>
          <Box
            ml={3}
            width={40}
            height={30}
            display="flex"
            justifyContent="center"
            borderColor={"black"}
            border={0.1}
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
            ml={3}
            width={40}
            height={30}
            display="flex"
            justifyContent="center"
            bgcolor={grey[400]}
          >
            <RectangleIcon
              sx={{
                color: grey[400],
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
