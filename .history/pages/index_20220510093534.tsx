import React from "react";
import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
import Top from "../components/templates/TopPage/topPage";

const prisma = new PrismaClient();

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.user.findMany();
  return { props: { feed } };
};
type Props = {
  feed: [];
};
const TopPage: React.FC<Props> = (props) => {
  props.feed.map((item) => console.log(item));
  return (
    <>
      <Top />
    </>
  );
};
export default TopPage;
