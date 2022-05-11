import React from "react";
import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
import Top from "../components/templates/TopPage/topPage";

const prisma = new PrismaClient();

const TopPage: React.FC = () => {
  return (
    <>
      <Top />
    </>
  );
};
export default TopPage;
