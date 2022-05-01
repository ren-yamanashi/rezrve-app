import { atom, useRecoilState } from "recoil";
import * as React from "react";
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
export const handleState6 = atom({
  key: "handle6",
  default: initialOpen,
});
export const handleState7 = atom({
  key: "handle6",
  default: initialOpen,
});
export const useHandle = () => {
  const [onOpen, setonOpen] = React.useState<boolean>(false);
  const [onOpen2, setonOpen2] =  React.useState<boolean>(false);
  const [onOpen3, setonOpen3] =  React.useState<boolean>(false);
  const [onOpen4, setonOpen4] =  React.useState<boolean>(false);
  const [onOpen5, setonOpen5] =  React.useState<boolean>(false);
  const [onOpen6, setonOpen6] =  React.useState<boolean>(false);
  const [onOpen7, setonOpen7] =  React.useState<boolean>(false);
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
  const handleOpen6 = () => setonOpen6(true);
  const handleClose6 = () => setonOpen6(false);
  const handleOpen7 = () => setonOpen7(true);
  const handleClose7 = () => setonOpen7(false);
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
    handleOpen6,
    handleClose6,
    handleOpen7,
    handleClose7,
    onOpen,
    onOpen2,
    onOpen3,
    onOpen4,
    onOpen5,
    onOpen6,
    onOpen7,
  };
};
