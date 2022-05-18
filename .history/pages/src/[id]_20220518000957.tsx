import React from "react";
import { GetServerSideProps } from "next";
// import myFile
import prisma from "../../lib/prisma";
import Rsv_Teacher from "../../components/templates/Reserves/staff/rsv_staff";
import { reserveProps } from "../../models/reserveProps";
import { timeProps } from "../../models/timeProps";
import { userProps } from "../../models/userProps";
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: { id: String(params.id) },
  });
  const times = await prisma.time.findMany({
    where: { companyId: user.companyId },
  });
  // 全てのシフト（スケジュール）
  const reserve = await prisma.reserve.findMany({
    where: { staff: user.userName },
    orderBy: {
      time: "asc",
    },
  });
  const reserves = JSON.parse(JSON.stringify(reserve));

  return {
    props: { times, user, reserves },
  };
};

type Props = {
  times: timeProps;
  user: userProps;
  reserves: reserveProps[];
};
const AddPage: React.FC<Props> = (props) => {
  return (
    <>
      <Rsv_Teacher
        reserves={props.reserves}
        times={props.times}
        user={props.user}
      />
    </>
  );
};

export default AddPage;
