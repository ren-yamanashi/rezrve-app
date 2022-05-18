import * as React from "react";
import { GetServerSideProps } from "next";
// import my File
import prisma from "../../lib/prisma";
import HomePage_Students from "../../components/templates/Home/students";
import { reserveProps } from "../../models/reserveProps";
import { timeProps } from "../../models/timeProps";
import { userProps } from "../../models/userProps";
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const staffs = await prisma.user.findMany({
    where: { role: "staff", companyId: String(params.id) },
  });
  const times = await prisma.time.findMany({
    where: { companyId: String(params.id) },
  });
  // 全てのシフト（スケジュール）
  const reserve = await prisma.reserve.findMany({
    where: { companyId: String(params.id), reserved: false },
    orderBy: {
      time: "asc",
    },
  });
  const reserves = JSON.parse(JSON.stringify(reserve));
  return {
    props: { times, staffs, reserves },
  };
};

type Props = {
  times: timeProps;
  staffs: userProps[];
  reserves: reserveProps[];
};
const HomePage_Reserver: React.FC<Props> = (props) => {
  return (
    <>
      <HomePage_Students staffs={props.staffs} reserves={props.reserves} />
    </>
  );
};

export default HomePage_Reserver;
