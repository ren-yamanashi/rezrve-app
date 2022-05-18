import React from "react";
import { GetServerSideProps } from "next";
import { format } from "date-fns";
// import my file
import prisma from "../../../lib/prisma";
import RsvPage from "../../../components/templates/Reserves/staff/rsv_page";
import { reserveProps } from "../../../models/reserveProps";
import { timeProps } from "../../../models/timeProps";
import { userProps } from "../../../models/userProps";

const today = format(new Date(), "yyyy-MM-dd");
const weekend = format(
  new Date().setDate(new Date().getDate() + 7),
  "yyyy-MM-dd"
);
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: { id: String(params.id) },
  });
  // 予約取得
  const reserve_true = await prisma.reserve.findMany({
    where: {
      reserved: true,
      companyId: user.companyId,
      staff: user.userName,
    },
    orderBy: {
      time: "asc",
    },
  });
  const reserves_true = JSON.parse(JSON.stringify(reserve_true));
  // シフト取得
  const reserve_false = await prisma.reserve.findMany({
    where: {
      reserved: false,
      companyId: user.companyId,
      staff: user.userName,
    },
    orderBy: {
      time: "asc",
    },
  });
  const reserves_false = JSON.parse(JSON.stringify(reserve_false));
  // シフト全件取得
  const reserve = await prisma.reserve.findMany({
    where: {
      companyId: user.companyId,
      staff: user.userName,
    },
    orderBy: {
      time: "asc",
    },
  });
  const reserves = JSON.parse(JSON.stringify(reserve));
  // 1週間の予約
  const reserve_week = await prisma.reserve.findMany({
    where: {
      companyId: user.companyId,
      staff: user.userName,
      date: { gte: `${today}T03:00:00.000Z`, lt: `${weekend}T03:00:00.000Z` },
    },
  });
  const reserves_week = JSON.parse(JSON.stringify(reserve_week));
  // 営業時間
  const times = await prisma.time.findMany({
    where: { companyId: user.companyId },
  });
  return {
    props: {
      reserves_true,
      reserves_false,
      reserves,
      user,
      times,
      reserves_week,
    },
  };
};
type Props = {
  reserves_true: reserveProps[];
  reserves_false: reserveProps[];
  reserves: reserveProps[];
  reserves_week: reserveProps[];
  shifts: reserveProps[];
  times: timeProps;
  user: userProps;
};
const ReservePage: React.FC<Props> = (props) => {
  return (
    <>
      <RsvPage
        reserves_week={props.reserves_week}
        reserves_false={props.reserves_false}
        reserves_true={props.reserves_true}
        times={props.times}
        user={props.user}
        reserves={props.reserves}
      />
    </>
  );
};

export default ReservePage;