import { blue, grey, red, teal } from "@mui/material/colors";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import IconButton from "@mui/material/IconButton";
const TableCellComponent5 = (props) => {
  return (
    <>
      <TableCell
        sx={{
          borderStyle: "dashed solid",
          borderWidth: "1px",
          borderColor: grey[400],
          bgcolor: grey[200],
          width: "13%",
        }}
      >
        {props.reserve.map(
          (i) =>
            i.time == props.time && (
              <Box
                display="flex"
                justifyContent="center"
                bgcolor={blue[400]}
                borderRadius={2}
              >
                <Tooltip
                  title={
                    <>
                      <Box>{`講師名 : ${props.teacher}`}</Box>{" "}
                      <Box>{`日付 : ${dayjs(i.date.toDate()).format(
                        "YYYY/MM/DD "
                      )}`}</Box>
                      <Box>{`時間 : ${i.time}:30 ~ ${i.time + 1}:30`}</Box>
                    </>
                  }
                  arrow
                >
                  <IconButton onClick={props.click}>
                    <RadioButtonUncheckedIcon
                      sx={{
                        color: "white",
                        fontSize: 12,
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            )
        )}
      </TableCell>
    </>
  );
};
export default TableCellComponent5;
