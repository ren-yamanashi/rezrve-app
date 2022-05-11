import React from "react";
import UsersList from "../../components/templates/User/userList";
import prisma from "../../lib/prisma";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.user.findMany();
  return { props: { feed } };
};

const StaffList = () => {
  return (
    <>
      <UsersList />
    </>
  );
};

export default StaffList;
