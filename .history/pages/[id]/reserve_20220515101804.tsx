import React from "react";
import RsvPage from "../../components/templates/Reserves/manager/RsvPage";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { reserveProps } from "../../models/reserveProps";
import { timeProps } from "../../models/timeProps";
import { userProps } from "../../models/userProps";
import { format } from "date-fns";


const today = format(new Date(), "yyyy-MM-dd");
const weekend = format(new Date().setDate(7),"yyyy-MM-dd")
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const staffs = await prisma.user.findMany({
    where: { role: "staff", companyId: String(params.id) },
  });
  const times = await prisma.time.findMany({
    where: { companyId: String(params.id) },
  });
  const reserve_all = await prisma.reserve.findMany({
    where: { companyId: String(params.id) },
  });
  const reserves_all = JSON.parse(JSON.stringify(reserve_all));
  const reserve_week = await prisma.reserve.findMany({
    where:{
      companyId:String(params.id),
      date:{gte:}}
  })
  return { props: { times, staffs,reserves_all } };
};

type Props = {
  reserves: reserveProps[];
  staffs: userProps[];
  times: timeProps;
};
const ReserveList: React.FC<Props> = (props) => {
  return (
    <>
      <RsvPage
        reserve={props.reserves}
        staffs={props.staffs}
        times={props.times}
      />
    </>
  );
};

export default ReserveList;
