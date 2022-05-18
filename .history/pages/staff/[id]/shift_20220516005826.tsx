import React from "react";
import { GetServerSideProps } from "next";
// import my file
import prisma from "../../../lib/prisma";
import ShiftList_staff from "../../../components/templates/ShiftList/staff/shiftList";
import { reserveProps } from "../../../models/reserveProps";
import { timeProps } from "../../../models/timeProps";
import { userProps } from "../../../models/userProps";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: { id: String(params.id) },
  });
  const shift = await prisma.reserve.findMany({
    where: {
      id: String(params.id),
    },
    orderBy: {
      time: "asc",
    },
  });
  const shifts = JSON.parse(JSON.stringify(shift));
  const times = await prisma.time.findMany({
    where: { companyId: user.companyId },
  });
  return { props: { shifts, user, times } };
};
type Props = {
  shifts: reserveProps[];
  times: timeProps;
  user: userProps[];
};

const Staff_ShiftList: React.FC<Props> = (props) => {
  return (
    <>
      <ShiftList_staff
        shifts={props.shifts}
        times={props.times}
        user={props.user}
      />
    </>
  );
};

export default Staff_ShiftList;
