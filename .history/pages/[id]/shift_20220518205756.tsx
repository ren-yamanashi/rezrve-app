import React from "react";
import { GetServerSideProps } from "next";
import ShiftLists from "../../components/templates/ShiftList/manager/shiftList";
import { Box } from "@mui/material";
import prisma from "../../lib/prisma";
import { reserveProps } from "../../models/reserveProps";
import { userProps } from "../../models/userProps";
import { createMedia } from "@artsy/fresnel";
import Title from "../../components/atoms/Text/PrimaryTitle";
import ShiftsAll from "../../components/organisms/manager/ShiftAll";
import Header from "../../components/templates/Header/HeaderNext";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 990,
    xl: 1200,
  },
});

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const shift = await prisma.reserve.findMany({
    where: {
      companyId: String(params.id),
    },
    orderBy: {
      time: "asc",
    },
  });
  const shifts = JSON.parse(JSON.stringify(shift));
  const staffs = await prisma.user.findMany({
    where: { companyId: String(params.id), role: "staff" },
  });
  return { props: { shifts, staffs } };
};
type Props = {
  shifts: reserveProps[];
  staffs: userProps[];
};

const ShiftList: React.FC<Props> = (props) => {
  return (
    <>
      <MediaContextProvider>
        <Media greaterThan="md">
          <Header>
            <Box mt={10}>
              <ShiftsAll shifts={props.shifts} staffs={props.staffs} />
            </Box>
          </Header>
        </Media>
        <Media at="md">
          <Box mt={5} ml={2} mr={2} display="flex">
            <Title>管理者ページは、 スマートフォンでの閲覧はできません</Title>
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

export default ShiftList;
