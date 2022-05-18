import HomePage_Manager from "../../components/templates/Home/store";
import React from "react";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const reserves = await prisma.reserve.findMany({
    where: { companyId: String(params.id) },
  });
  const posts = JSON.parse(JSON.stringify(reserves));
  return { props: { posts } };
};

const HomePage = () => {
  return (
    <>
      <HomePage_Manager />
    </>
  );
};

export default HomePage;
