import HomePage_Manager from "../../components/templates/Home/store";
import React from "react";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const reserves = await prisma.reserve.findMany({
    where: { companyId: String(params.id) },
  });
  return { props: { reserves } };
};

const HomePage = () => {
  return (
    <>
      <HomePage_Manager />
    </>
  );
};

export default HomePage;
