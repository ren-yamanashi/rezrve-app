import React from "react";
import Top from "../components/templates/TopPage/topPage";
import prisma from "../lib/prisma";
import { GetStaticProps } from "next";
import { userProps } from "../models/UserProps";
export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.user.findMany();
  const posts = JSON.parse(JSON.stringify(feed));
  return { props: { posts } };
};

type Props = {
  posts: userProps[];
};

const TopPage: React.FC<Props> = (props) => {
  console.log(props.posts);
  return (
    <>
      <Top />
    </>
  );
};
export default TopPage;
