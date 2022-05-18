import * as React from "react";
import { GetServerSideProps } from "next";
import { format } from "date-fns";
// import my file
import HomePageTeacher from "../../../components/templates/Home/staff";
import prisma from "../../../lib/prisma";
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
  // シフト全件取得
  const reserve = await prisma.reserve.findMany({
    where: { companyId: String(user.companyId) },
    orderBy: {
      time: "asc",
    },
  });
  const reserves = JSON.parse(JSON.stringify(reserve));
  // 営業時間
  const times = await prisma.time.findMany({
    where: { companyId: user.companyId },
  });
  const staffs = await prisma.user.findMany({
    where: { role: "staff", companyId: String(user.companyId) },
  });
  return {
    props: { reserves_true, reserves, user, times, staffs },
  };
};
type Props = {
  reserves_true: reserveProps[];
  reserves: reserveProps[];
  reserves_week: reserveProps[];
  shifts: reserveProps[];
  times: timeProps;
  user: userProps;
  staffs: userProps[];
};
const HomePage_Staff: React.FC<Props> = (props) => {
  console.log(props.reserves);
  return (
    <>
      <HomePageTeacher
        times={props.times}
        user={props.user}
        reserves_true={props.reserves_true}
        reserves={props.reserves}
        staffs={props.staffs}
      />
    </>
  );
};

export default HomePage_Staff;
