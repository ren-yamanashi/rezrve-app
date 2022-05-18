import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Item from "../../atoms/Item/Item";
import Item2 from "../../atoms/Item/Item2";
import Modals from "../../atoms/Modal/Modal";
import TextComponent_17 from "../../atoms/Text/Typography2";
import Select from "react-select";
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import SnackComponent from "../../atoms/Snack/SnackTitle";
import { grey, teal } from "@mui/material/colors";
import DateRangePicker from "../../atoms/Date/Date ";
import { useDate } from "../../../hooks/date/useDate";
import { useSelectUser_query } from "../../../hooks/firebase/user/useUserList";
import { useSelectReserve } from "../../../hooks/useSelectReserve";
import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";

type Props = {
  posts: any[];
  open: boolean;
  close: any;
  createShift: void;
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const posts = await prisma.time.findMany({
    where: { companyId: String(params.id) },
  });
  return { props: { posts } };
};

const CreateShiftModal: React.FC<Props> = (props) => {
  const { user_query } = useSelectUser_query();
  const { changeDateValue, dateValue } = useDate();
  const { handleChangeTime, rsvData, selectTeacher } = useSelectReserve();
  const options = [];
  props.posts.map((time) => {
    options.push({ value: time, label: `${time}:00` });
  });
  console.log(props.posts);
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modals>
          <SnackComponent>以下の内容でシフト登録します</SnackComponent>
          <Item>
            <DateRangePicker
              value={dateValue}
              changeDate={(newDate) => changeDateValue(newDate)}
            />
          </Item>
          <Item2>
            <Box display="flex">
              <TextComponent_17>開始時間</TextComponent_17>
              <Select options={options} onChange={handleChangeTime} />
            </Box>
          </Item2>
          <Item>
            <Box display="flex">
              <TextComponent_17>講師名</TextComponent_17>
              <TextComponent_17>{rsvData.teacherName}</TextComponent_17>
            </Box>
          </Item>
          <Box display="flex" justifyContent="right" mt={5}>
            <PrimaryBtn
              click={props.createShift}
              style={{
                mb: 2,
                mr: 1,
                bgcolor: teal[400],
                color: "white",
                "&:hover": { bgcolor: teal[500] },
              }}
              buttonText={"登録"}
            />
            <PrimaryBtn
              style={{
                mb: 2,
                mr: 1,
                bgcolor: grey[500],
                color: "white",
                "&:hover": { bgcolor: grey[600] },
              }}
              click={close}
              buttonText={"キャンセル"}
            />
          </Box>
        </Modals>
      </Modal>
    </>
  );
};
export default CreateShiftModal;
