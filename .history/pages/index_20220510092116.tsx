import React from "react";
import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
import Top from "../components/templates/TopPage/topPage";

const prisma = new PrismaClient();

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany();
  return { props: { feed } };
};
type PostProps = {
  id: string;
  title: string;
  number: number;
  date: Date;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};
type Props = {
  feed: PostProps[];
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
