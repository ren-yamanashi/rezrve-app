import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
const initialOpen: boolean = false;
export const handleState = atom({
  key: "handle",
  default: initialOpen,
});
export const handleState2 = atom({
  key: "handle2",
  default: initialOpen,
});
export const handleState3 = atom({
  key: "handle3",
  default: initialOpen,
});
export const handleState4 = atom({
  key: "handle4",
  default: initialOpen,
});
export const handleState5 = atom({
  key: "handle5",
  default: initialOpen,
});
export function useHandle() {
  const [onOpen, setonOpen] = useRecoilState(handleState);
  const [onOpen2, setonOpen2] = useRecoilState(handleState2);
  const [onOpen3, setonOpen3] = useRecoilState(handleState3);
  const [onOpen4, setonOpen4] = useRecoilState(handleState4);
  const [onOpen5, setonOpen5] = useRecoilState(handleState5);
  const handleOpen = () => setonOpen(true);
  const handleClose = () => setonOpen(false);
  const handleOpen2 = () => setonOpen2(true);
  const handleClose2 = () => setonOpen2(false);
  const handleOpen3 = () => setonOpen3(true);
  const handleClose3 = () => setonOpen3(false);
  const handleOpen4 = () => setonOpen4(true);
  const handleClose4 = () => setonOpen4(false);
  const handleOpen5 = () => setonOpen5(true);
  const handleClose5 = () => setonOpen5(false);
  return {
    handleOpen,
    handleClose,
    handleOpen2,
    handleClose2,
    handleOpen3,
    handleClose3,
    handleOpen4,
    handleClose4,
    handleOpen5,
    handleClose5,
    onOpen,
    onOpen2,
    onOpen3,
    onOpen4,
    onOpen5,
  };
}
