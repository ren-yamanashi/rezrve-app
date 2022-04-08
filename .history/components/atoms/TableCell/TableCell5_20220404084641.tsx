import { blue, grey } from "@mui/material/colors";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useSetData_teachersRsv } from "../../../hooks/student/teachersRsv/useSetData";
import { useHandle } from "../../../hooks/handle/useHandle";
const TableCellComponent5 = (props) => {
  const { setData } = useSetData_teachersRsv();
  const { handleOpen2 } = useHandle();
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
                bgcolor={i.reserved == false ? blue[500] : grey[600]}
                borderRadius={2}
              >
                <Tooltip
                  title={
                    <>
                      <Box>{`講師名 : ${props.teacher}`}</Box>{" "}
                      <Box>{`日付 : ${dayjs(i.date.toDate()).format(
                        "YYYY/MM/DD "
                      )}`}</Box>
                      <Box>{`時間 : ${i.time}:00~`}</Box>
                    </>
                  }
                  arrow
                >
                  <IconButton
                    onClick={() => {
                      handleOpen2();
                      setData(
                        i.id,
                        `${dayjs(i.date.toDate()).format("M/D ")} ${
                          i.time
                        }:00~`,
                        i.time
                      );
                    }}
                  >
                    {i.reserved == false ? (
                      <RadioButtonUncheckedIcon
                        sx={{
                          color: "white",
                          fontSize: 12,
                        }}
                      />
                    ) : (
                      <CloseIcon
                        sx={{
                          color: "white",
                          fontSize: 12,
                        }}
                      />
                    )}
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
