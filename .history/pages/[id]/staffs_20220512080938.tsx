import React from "react";
import UsersList from "../../components/organisms/manager/UserList";
import prisma from "../../lib/prisma";
import { GetStaticProps } from "next";
import { useHandle } from "../../hooks/useHandle";
import { useCreateShift } from "../../hooks/firebase/manager/useCreateShift";
import CreateStaff from "../../components/organisms/manager/CreateStaff";
import CreateShiftModal from "../../components/templates/Modal/CreateShift_manager";
import { useSelectReserve } from "../../hooks/useSelectReserve";
import { useSelectUser_query } from "../../hooks/firebase/user/useUserList";
import Header from "../../components/templates/Header/HeaderNext";
import HeaderAtMd from "../../components/templates/Header/Header";
import Title from "../../components/atoms/Text/PrimaryTitle";
import { createMedia } from "@artsy/fresnel";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { userProps } from "../../models/userProps";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.user.findMany();
  const posts = JSON.parse(JSON.stringify(feed));
  return { props: { posts }, paths: [`/[id]/staffs`], fallback: true };
};

type Props = {
  posts: userProps[];
};

const StaffList: React.FC<Props> = (props) => {
  const { createShift } = useCreateShift();
  const { open, handleOpen1, handleClose1 } = useHandle();
  const { user_query } = useSelectUser_query();
  console.log(props.posts);
  const { handleChangeTime, rsvData, selectTeacher } = useSelectReserve();

  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              {props.posts?.map((user) => (
                <Box key={user.id}>
                  <UsersList users={user} />
                </Box>
              ))}
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <Box m={3}>
            {props.posts?.map((user) => (
              <Box key={user.id}>
                <UsersList users={user} />
              </Box>
            ))}
          </Box>
        </Media>
        <Media at="sm">
          <Box mt={5} ml={2} mr={2} display="flex">
            <Title>管理者ページは、 スマートフォンでの閲覧はできません</Title>
          </Box>
        </Media>
      </MediaContextProvider>
      <ToastContainer />
      <CreateShiftModal
        open={open.open1}
        handleClose={handleClose1}
        staffName={rsvData.teacherName}
        time={rsvData.time}
        changeSelect={handleChangeTime}
        createShift={(e) => {
          createShift(
            e,
            rsvData.teacherName,
            rsvData.time,
            rsvData.teacherId,
            user_query?.companyId,
            1
          );
          handleClose1();
        }}
      />
      <CreateStaff />
    </>
  );
};

export default StaffList;
