import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
const initialOpen: boolean = false;
const initialStudentNum: string = "";
export const handleState = atom({
  key: "handle",
  default: initialOpen,
});

export function useHandle() {
  const [onOpen, setonOpen] = useRecoilState(handleState);
  const handleOpen = () => setonOpen(true);
  const handleClose = () => setonOpen(false);
  return { handleOpen, handleClose, onOpen };
}
