import HomePage_Manager from "../../components/templates/Home/store";
import React from "react";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { reserveProps } from "../../models/reserveProps";
import { format } from "date-fns";
const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();
const d = date.getDate();
const today = format(new Date(y, m, d, 12, 0, 0), "yyyy-mm-dd");
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const reserves = await prisma.reserve.findMany({
    where: {
      companyId: String(params.id),
      reserved: false,
      date: `${y}-05-${d}T03:00:00.000Z`,
    },
  });
  const posts = JSON.parse(JSON.stringify(reserves));
  return { props: { posts } };
};

type Props = {
  posts: reserveProps[];
};
const HomePage: React.FC<Props> = (props) => {
  console.log(today);
  console.log(props.posts);
  return (
    <>
      <HomePage_Manager />
    </>
  );
};

export default HomePage;
