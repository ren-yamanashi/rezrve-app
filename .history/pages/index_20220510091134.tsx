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
