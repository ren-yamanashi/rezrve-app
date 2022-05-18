import HomePage_Manager from "../../components/templates/Home/store";
import React from "react";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  const today = new Date(y, m, d, 12, 0, 0);
  const reserves = await prisma.reserve.findMany({
    where: { companyId: String(params.id), reserved: false, date: today },
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
