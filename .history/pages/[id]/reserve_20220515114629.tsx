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
  const staff = await prisma.user.findMany({
    where: { role: "staff", companyId: String(params.id) },
  });
  const times = await prisma.time.findMany({
    where: { companyId: String(params.id) },
  });
  // 全ての予約（カレンダー）
  const reserve_all = await prisma.reserve.findMany({
    where: { companyId: String(params.id), reserved: true },
    orderBy: {
      time: "asc",
    },
  });
  const reserves_all = JSON.parse(JSON.stringify(reserve_all));
  // 全てのシフト（予約登録）
  const shift_all = await prisma.reserve.findMany({
    where: {
      companyId: String(params.id),
      reserved: false,
      date: { gte: `${today}T03:00:00.000Z` },
    },
    orderBy: {
      time: "asc",
    },
  });
  const shifts_all = JSON.parse(JSON.stringify(shift_all));
  // 1週間の予約
  const reserve_week = await prisma.reserve.findMany({
    where: {
      companyId: String(params.id),
      reserved: true,
      date: {
        gte: `${today}T03:00:00.000Z`,
        lt: `${weekend}T03:00:00.000Z`,
      },
    },
    orderBy: {
      time: "asc",
    },
  });
  const reserves_week = JSON.parse(JSON.stringify(reserve_week));
  return { props: { times, staff, reserves_all, shifts_all, reserves_week } };
};

type Props = {
  reserves_all: reserveProps[];
  reserves_week: reserveProps[];
  shifts_all: reserveProps[];
  staff: userProps[];
  times: timeProps;
};
const ReserveList: React.FC<Props> = (props) => {
  return (
    <>
      <RsvPage
        reserves_all={props.reserves_all}
        reserves_week={props.reserves_week}
        shifts_all={props.shifts_all}
        staff={props.staff}
        times={props.times}
      />
    </>
  );
};

export default ReserveList;
