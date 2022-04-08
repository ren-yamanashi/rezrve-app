import { blue, grey, red, teal } from "@mui/material/colors";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
const TableCellComponent4 = (props) => {
  const day_arr = ["日", "月", "火", "水", "木", "金", "土"];
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
        {rsv &&
          rsv.map(
            (i) =>
              i.time == t && (
                <Box
                  display="flex"
                  justifyContent="center"
                  bgcolor={blue[400]}
                  borderRadius={2}
                >
                  <Tooltip
                    title={
                      <>
                        <Box>{`講師名 : ${u && u.userName}`}</Box>{" "}
                        <Box>{`日付 : ${dayjs(i.date.toDate()).format(
                          "YYYY/MM/DD "
                        )}`}</Box>
                        <Box>{`時間 : ${i.time}:30 ~ ${i.time + 1}:30`}</Box>
                      </>
                    }
                    arrow
                  >
                    <IconButton
                      onClick={() => {
                        handleOpen();
                        setI(i.id);
                        setTest(
                          `${dayjs(i.date.toDate()).format("M/D ")} ${
                            i.time
                          }:30 ~ ${i.time + 1}:30`
                        );
                      }}
                    >
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
export default TableCellComponent4;
