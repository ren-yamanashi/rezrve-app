import React from "react";
import { GetServerSideProps } from "next";
// import my file
import prisma from "../../../lib/prisma";
import ShiftList_staff from "../../../components/templates/ShiftList/staff/shiftList";
import { reserveProps } from "../../../models/reserveProps";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const shift = await prisma.reserve.findMany({
    where: {
      companyId: String(params.id),
    },
    orderBy: {
      time: "asc",
    },
  });
  const shifts = JSON.parse(JSON.stringify(shift));
  return { props: { shifts } };
};
type Props = {
  shifts: reserveProps[];
};

const Staff_ShiftList: React.FC<Props> = (props) => {
  console.log(props.shifts);
  return (
    <>
      <ShiftList_staff shifts={props.shifts} />
    </>
  );
};

export default Staff_ShiftList;
