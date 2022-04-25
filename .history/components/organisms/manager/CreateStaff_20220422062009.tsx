import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { blue, teal } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
//import my File
import { useHandle } from "../../../hooks/useHandle";
import Title from "../../atoms/Text/PrimaryTitle";
import { Tooltip } from "@mui/material";
import { useTeacherList } from "../../../hooks/firebase/user/useUserList";
import { useCreateShift } from "../../../hooks/firebase/manager/useCreateShift";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import CreateShiftModal from "../../templates/Modal/CreateShift_manager";

const CreateStaff = () => {
  return (
    <React.Fragment>
      <>
        <Box mb={3} display="flex" justifyContent="center" mx="auto">
          <Grid item xs={6} sm={4} lg={4} md={5}>
            <Box mb={3} display="flex" justifyContent="center" mx="auto">
              <CardContent
                style={{
                  borderRadius: "7px",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  margin: "auto",
                  height: 250,
                }}
              >
                追加
              </CardContent>
            </Box>
          </Grid>
        </Box>
      </>
    </React.Fragment>
  );
};

export default CreateStaff;
