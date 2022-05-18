import React from "react";
import { GetServerSideProps } from "next";
import { format } from "date-fns";
import ShiftLists from "../../components/templates/ShiftList/manager/shiftList";
import prisma from "../../lib/prisma";
import { reserveProps } from "../../models/reserveProps";

const today = format(new Date(), "yyyy-MM-dd");
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const shift = await prisma.reserve.findMany({
    where: {
      companyId: String(params.id),
      date: `${today}T03:00:00.000Z`,
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
      <ShiftLists />
    </>
  );
};

export default ShiftList;
