import React from "react";
import { GetServerSideProps } from "next";
import ShiftLists from "../../components/templates/ShiftList/manager/shiftList";
import prisma from "../../lib/prisma";
import { reserveProps } from "../../models/reserveProps";
import { userProps } from "../../models/userProps";

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
  const staffs = await prisma.user.findMany({
    where: { companyId: String(params.id) },
  });
  return { props: { shifts, staffs } };
};
type Props = {
  shifts: reserveProps[];
  staffs: userProps[];
};

const ShiftList: React.FC<Props> = (props) => {
  return (
    <>
      <ShiftLists shifts={props.shifts} staffs={props.staffs} />
    </>
  );
};

export default ShiftList;
