import React from "react";
import { GetServerSideProps } from "next";
// import my file
import prisma from "../../../lib/prisma";
import RsvPage from "../../../components/templates/Reserves/staff/rsv_page";
import { reserveProps } from "../../../models/reserveProps";
import { timeProps } from "../../../models/timeProps";
import { userProps } from "../../../models/userProps";

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
  const reserve_all = await prisma.reserve.findMany({
    where: {
      companyId: user.companyId,
      staff: user.userName,
    },
    orderBy: {
      time: "asc",
    },
  });
  const reserves_all = JSON.parse(JSON.stringify(reserve_all));
  // 営業時間
  const times = await prisma.time.findMany({
    where: { companyId: user.companyId },
  });
  return {
    props: { reserves_true, reserves_false, reserves_all, user, times },
  };
};
type Props = {
  shifts: reserveProps[];
  times: timeProps;
  user: userProps;
};
const ReservePage = () => {
  return (
    <>
      <RsvPage />
    </>
  );
};

export default ReservePage;
