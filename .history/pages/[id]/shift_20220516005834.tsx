import React from "react";
import { GetServerSideProps } from "next";
import ShiftLists from "../../components/templates/ShiftList/manager/shiftList";
import prisma from "../../lib/prisma";
import { reserveProps } from "../../models/reserveProps";

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

const ShiftList: React.FC<Props> = (props) => {
  return (
    <>
      <ShiftLists shifts={props.shifts} />
    </>
  );
};

export default ShiftList;
