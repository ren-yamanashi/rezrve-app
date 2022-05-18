import * as React from "react";
import UsersList from "../../components/organisms/manager/UserList";
import prisma from "../../lib/prisma";
import CreateStaff from "../../components/organisms/manager/CreateStaff";
import Title from "../../components/atoms/Text/PrimaryTitle";
import Header from "../../components/templates/Header/HeaderNext";
import HeaderAtMd from "../../components/templates/Header/Header";
import { createMedia } from "@artsy/fresnel";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { userProps } from "../../models/userProps";
import { timeProps } from "../../models/timeProps";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const posts = await prisma.user.findMany({
    where: { role: "staff", companyId: String(params.id) },
  });
  const times = await prisma.time.findMany({
    where: { companyId: String(params.id) },
  });
  return { props: { times, posts } };
};

type Props = {
  posts: userProps[];
  times: timeProps;
};

const StaffList: React.FC<Props> = (props) => {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <Box>
                <Title>スタッフ一覧</Title>
              </Box>
              <Wrap spacing={"40px"} justify={"center"}>
                {props.posts?.map((user) => (
                  <WrapItem key={user.id}>
                    <UsersList users={user} times={props.times} />
                  </WrapItem>
                ))}
              </Wrap>
              <CreateStaff />
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <Box m={3}>
            <Box>
              <Title>スタッフ一覧</Title>
            </Box>
            <Wrap spacing={"40px"} justify={"center"}>
              {props.posts?.map((user) => (
                <WrapItem key={user.id}>
                  <UsersList users={user} times={props.times} />
                </WrapItem>
              ))}
            </Wrap>
            <CreateStaff />
          </Box>
        </Media>
        <Media at="sm">
          <Box mt={5} ml={2} mr={2} display="flex">
            <Title>管理者ページは、 スマートフォンでの閲覧はできません</Title>
          </Box>
        </Media>
      </MediaContextProvider>
      <ToastContainer />
    </>
  );
};

export default StaffList;
