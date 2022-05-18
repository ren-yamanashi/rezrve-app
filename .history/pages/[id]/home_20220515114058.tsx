import React from "react";
import { GetServerSideProps } from "next";
import { format } from "date-fns";
import { Box } from "@mui/material";
import { createMedia } from "@artsy/fresnel";
// import my file
import YoyakuListToday from "../../components/organisms/manager/YoyakuListToday";
import Header from "../../components/templates/Header/HeaderNext";
import HeaderAtMd from "../../components/templates/Header/Header";
import RsvPage from "../../components/organisms/manager/RsvPage";
import CardComponent from "../../components/atoms/Card/CardComponent";
import Title from "../../components/atoms/Text/PrimaryTitle";
import prisma from "../../lib/prisma";
import { reserveProps } from "../../models/reserveProps";
import { userProps } from "../../models/userProps";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

const today = format(new Date(), "yyyy-MM-dd");
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const reserves_false = await prisma.reserve.findMany({
    where: {
      companyId: String(params.id),
      reserved: false,
    },
    orderBy: {
      time: "asc",
    },
  });
  const reserves_true = await prisma.reserve.findMany({
    where: {
      companyId: String(params.id),
      reserved: true,
      date: `${today}T03:00:00.000Z`,
    },
    orderBy: {
      time: "asc",
    },
  });
  const staff = await prisma.user.findMany({
    where: { companyId: String(params.id), role: "staff" },
  });
  const reserve = JSON.parse(JSON.stringify(reserves_false));
  const reserved = JSON.parse(JSON.stringify(reserves_true));
  return { props: { reserve, reserved, staff } };
};

type Props = {
  reserve: reserveProps[];
  reserved: reserveProps[];
  staff: userProps[];
};
const HomePage: React.FC<Props> = (props) => {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box m={10}>
              <YoyakuListToday reserved={props.reserved} />
              <Box mt={5}>
                <CardComponent>
                  <RsvPage reserve={props.reserve} staff={props.staff} />
                </CardComponent>
              </Box>
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <HeaderAtMd />
          <Box>
            <YoyakuListToday reserved={props.reserved} />
            <Box mt={5}>
              <CardComponent>
                <RsvPage reserve={props.reserve} staff={props.staff} />
              </CardComponent>
            </Box>
          </Box>
        </Media>
        <Media at="sm">
          <Box mt={5} ml={2} mr={2} display="flex">
            <Title>管理者ページは、 スマートフォンでの閲覧はできません</Title>
          </Box>
        </Media>
      </MediaContextProvider>
    </>
  );
};

export default HomePage;
