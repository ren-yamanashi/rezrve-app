import React from "react";
import prisma from "../lib/prisma";
import { GetStaticProps } from "next";
import Top from "../components/templates/TopPage/topPage";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed } };
};
const TopPage = () => {
  return (
    <>
      <Top />
    </>
  );
};
export default TopPage;
