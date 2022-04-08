import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
const initialOpen: boolean = false;
const initialStudentNum: string = "";
export const handleState = atom({
  key: "handle",
  default: initialOpen,
});
export const handleState2 = atom({
  key: "handle",
  default: initialOpen,
});
export const handleState3 = atom({
  key: "handle",
  default: initialOpen,
});
export function useHandle() {
  const [onOpen, setonOpen] = useRecoilState(handleState);
  const [onOpen2, setonOpen2] = useRecoilState(handleState2);
  const [onOpen3, setonOpen3] = useRecoilState(handleState3);
  const handleOpen = () => setonOpen(true);
  const handleClose = () => setonOpen(false);
  const handleOpen2 = () => setonOpen2(true);
  const handleClose2 = () => setonOpen2(false);
  const handleOpen3 = () => setonOpen3(true);
  const handleClose3 = () => setonOpen3(false);
  return {
    handleOpen,
    handleClose,
    handleOpen2,
    handleClose2,
    handleOpen3,
    handleClose3,
    onOpen,
    onOpen2,
    onOpen3,
  };
}
