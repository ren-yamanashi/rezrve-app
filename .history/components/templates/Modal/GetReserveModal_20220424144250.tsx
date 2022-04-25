import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Item from "../../atoms/Item/Item";
import Item2 from "../../atoms/Item/Item2";
import Modals from "../../atoms/Modal/Modal";
import TextComponent_19 from "../../atoms/Text/Typography";
import TextComponent_17 from "../../atoms/Text/Typography2";
import TitleComponent from "../../atoms/Text/Title";
import TextComponent from "../../atoms/Text/Typography3";
import CancelButton from "../../atoms/Button/CancelButton";
import AddButton from "../../atoms/Button/AddButton";
import { useHandle } from "../../../hooks/useHandle";

//OK
const GetRsvModal = (props) => {
  const { onOpen2, handleClose2 } = useHandle();
  return (
    <>
      <Modal
        open={onOpen2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modals>
          <TitleComponent>以下の内容で予約登録します</TitleComponent>
          <Item>
            <Box display="flex">
              <TextComponent_19>予約情報</TextComponent_19>
            </Box>
          </Item>
          <Item2>
            <Box display="flex">
              <TextComponent_17>予約日時</TextComponent_17>
              <TextComponent>{props.date}</TextComponent>
            </Box>
          </Item2>
          <Item>
            <Box display="flex">
              <TextComponent_17>担当者</TextComponent_17>
              <TextComponent>{props.teacher}</TextComponent>
            </Box>
          </Item>
          <Item2>
            <Box display="flex">
              <TextComponent_17>お客様名</TextComponent_17>
              <TextComponent>{props.student}</TextComponent>
            </Box>
          </Item2>
          <Item>
            <Box display="flex">
              <TextComponent_17>アドレス</TextComponent_17>
              <TextComponent>{props.email}</TextComponent>
            </Box>
          </Item>
          <Box display="flex" justifyContent="right">
            <AddButton click={props.clickEv} />
            <CancelButton click={handleClose2} />
          </Box>
        </Modals>
      </Modal>
    </>
  );
};
export default GetRsvModal;
