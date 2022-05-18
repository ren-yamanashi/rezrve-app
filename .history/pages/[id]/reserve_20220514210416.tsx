import React from "react";
import RsvPage from "../../components/templates/Reserves/manager/RsvPage";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { reserveProps } from "../../models/reserveProps";
import { timeProps } from "../../models/timeProps";
import { userProps } from "../../models/userProps";
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
  reserves: reserveProps[];
  posts: userProps[];
  times: timeProps;
};
const ReserveList = () => {
  return (
    <>
      <RsvPage />
    </>
  );
};

export default ReserveList;
