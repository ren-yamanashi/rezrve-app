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
  const [open,setOpen] = React.useState({open1:false,open2:false,open3:false});
  const [onOpen, setonOpen] = useRecoilState(handleState);
  const [onOpen2, setonOpen2] = useRecoilState(handleState2);
  const [onOpen3, setonOpen3] = useRecoilState(handleState3);
  const [onOpen4, setonOpen4] = useRecoilState(handleState4);
  const [onOpen5, setonOpen5] = useRecoilState(handleState5);
  const [onOpen6, setonOpen6] = useRecoilState(handleState6);
  const [onOpen7, setonOpen7] = useRecoilState(handleState7);
  const modalOpen1 = () => setOpen({...open,open1:true})
  const modalOpen2 = () => setOpen({...open,open2:true})
  const modalOpen3 = () => setOpen({...open,open3:true})
  const modalClose1 = () => setOpen({...open,open1:false})
  const modalClose2 = () => setOpen({...open,open2:false})
  const modalClose3 = () => setOpen({...open,open3:false})
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
    open,
    modalClose1,
    modalClose2,
    modalClose3,
    modalOpen1,
    modalOpen2,
    modalOpen3
  };
};
