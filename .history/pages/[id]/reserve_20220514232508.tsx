import React from "react";
import RsvPage from "../../components/templates/Reserves/manager/RsvPage";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
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
  return { props: { times, staffs } };
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
