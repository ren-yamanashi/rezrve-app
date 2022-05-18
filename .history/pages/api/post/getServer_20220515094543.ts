import React from "react";
import prisma from "../../../lib/prisma";
import { GetServerSideProps } from "next";
import { reserveProps } from "../../../models/reserveProps";
import { timeProps } from "../../../models/timeProps";
import { userProps } from "../../../models/userProps";
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const staffs = await prisma.user.findMany({
    where: { role: "staff", companyId: String(params.id) },
  });
  const times = await prisma.time.findMany({
    where: { companyId: String(params.id) },
  });
  return { props: { times, staffs } };
};

export type Props = {
	staffs:userProps[];
	times:timeProps;
	reserves:reserveProps[];
}