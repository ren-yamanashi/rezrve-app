import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
const initialOpen: boolean = false;
const initialStudentNum: string = "";
export const studentState = atom({
  key: "student",
  default: initialOpen,
});
export const studentNumState = atom({
  key: "studentNumber",
  default: initialStudentNum,
});
export function useSelectStudent() {
  const [onOpen, setonOpen] = useRecoilState(studentState);
  const [studentNum, setStudentNum] = useRecoilState(studentNumState);
  const handleOpen = () => setonOpen(true);
  const handleClose = () => setonOpen(false);
  return { handleOpen, handleClose, onOpen };
}
