import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Item from "../../atoms/Item";
import Item2 from "../../atoms/Item2";
import Modals from "../../atoms/Modal";
import TextComponent_19 from "../../atoms/Text/Typography";
import TextComponent_17 from "../../atoms/Text/Typography2";
import TitleComponent from "../../atoms/Text/Title";
import TextComponent from "../../atoms/Text/Typography3";
import CancelButton from "../../atoms/Button/CancelButton";
import AddButton from "../../atoms/Button/AddButton";
const GetRsvModal = (props) => {
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.close}
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
              <TextComponent_17>予約状態</TextComponent_17>
              <TextComponent>確定</TextComponent>
            </Box>
          </Item>
          <Box display="flex" justifyContent="right">
            <AddButton click={props.clickEv} />
            <CancelButton click={props.close} />
          </Box>
        </Modals>
      </Modal>
    </>
  );
};
export default GetRsvModal;
