import React from "react";
import RsvPage from "../../components/templates/Reserves/manager/RsvPage";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { reserveProps } from "../../models/reserveProps";
import { timeProps } from "../../models/timeProps";
import { userProps } from "../../models/userProps";
import { format } from "date-fns";

const today = format(new Date(), "yyyy-MM-dd");
const weekend = format(
  new Date().setDate(new Date().getDate() + 7),
  "yyyy-MM-dd"
);
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const staffs = await prisma.user.findMany({
    where: { role: "staff", companyId: String(params.id) },
  });
  const times = await prisma.time.findMany({
    where: { companyId: String(params.id) },
  });
  // 全ての予約（カレンダー）
  const reserve_all = await prisma.reserve.findMany({
    where: { companyId: String(params.id), reserved: true },
  });
  const reserves_all = JSON.parse(JSON.stringify(reserve_all));
  // 1週間の予約
  const reserve_week = await prisma.reserve.findMany({
    where: {
      reserved: true,
      companyId: String(params.id),
      // date: {
      //   gte: `${today}T03:00:00.000Z`,
      //   lt: `${weekend}T03:00:00.000Z`,
      // },
    },
  });
  const reserves_week = JSON.parse(JSON.stringify(reserve_week));
  return { props: { times, staffs, reserves_all, reserves_week } };
};

type Props = {
  reserves_all: reserveProps[];
  reserves_week: reserveProps[];
  staffs: userProps[];
  times: timeProps;
};
const ReserveList: React.FC<Props> = (props) => {
  console.log(props.reserves_week);
  return (
    <>
      <RsvPage
        reserves_all={props.reserves_all}
        reserves_week={props.reserves_week}
        staffs={props.staffs}
        times={props.times}
      />
    </>
  );
};

export default ReserveList;
