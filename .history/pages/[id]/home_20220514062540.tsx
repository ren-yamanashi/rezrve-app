import HomePage_Manager from "../../components/templates/Home/store";
import React from "react";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { reserveProps } from "../../models/reserveProps";
import { format } from "date-fns";

const today = format(new Date(), "yyyy-MM-dd");
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const reserves_false = await prisma.reserve.findMany({
    where: {
      companyId: String(params.id),
      reserved: false,
      date: `${today}T03:00:00.000Z`,
    },
  });
  const reserves_true = await prisma.reserve.findMany({
    where: {
      companyId: String(params.id),
      reserved: true,
      date: `${today}T03:00:00.000Z`,
    },
  });
  const reserve = JSON.parse(JSON.stringify(reserves_false));
  const reserved = JSON.parse(JSON.stringify(reserves_true));
  return { props: { reserve, reserved } };
};

type Props = {
  reserve: reserveProps[];
  reserved: reserveProps[];
};
const HomePage: React.FC<Props> = (props) => {
  return (
    <>
      <HomePage_Manager />
    </>
  );
};

export default HomePage;
