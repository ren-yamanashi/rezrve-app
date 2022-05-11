import React from "react";
import UsersList from "../../components/templates/User/userList";
import prisma from "../../lib/prisma";
import { GetStaticProps } from "next";
import { useHandle } from "../../hooks/useHandle";
import { useCreateShift } from "../../hooks/firebase/manager/useCreateShift";
import CreateStaff from "../../components/organisms/manager/CreateStaff";
import CreateShiftModal from "../../components/templates/Modal/CreateShift_manager";
import { useSelectReserve } from "../../hooks/useSelectReserve";
import { useSelectUser_query } from "../../hooks/firebase/user/useUserList";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.user.findMany();
  return { props: { feed } };
};

const StaffList = () => {
  const { createShift } = useCreateShift();
  const { open, handleOpen1, handleClose1 } = useHandle();
  const { user_query } = useSelectUser_query();
  const { handleChangeTime, rsvData, selectTeacher } = useSelectReserve();

  return (
    <>
      <UsersList />
      <CreateShiftModal
        open={open.open1}
        handleClose={handleClose1}
        staffName={rsvData.teacherName}
        time={rsvData.time}
        changeSelect={handleChangeTime}
        createShift={(e) => {
          createShift(
            e,
            rsvData.teacherName,
            rsvData.time,
            rsvData.teacherId,
            user_query?.companyId,
            1
          );
          handleClose1();
        }}
      />
      <CreateStaff />
    </>
  );
};

export default StaffList;
