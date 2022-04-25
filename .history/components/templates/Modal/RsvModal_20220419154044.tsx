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
import PrimaryBtn from "../../atoms/Button/PrimaryButton";
import { grey, teal } from "@mui/material/colors";
import { useHandle } from "../../../hooks/useHandle";
const RsvModal = (props) => {
  const { onOpen4, handleClose4 } = useHandle();
  return (
    <>
      <Modal
        open={onOpen4}
        onClose={handleClose4}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modals>
          <TitleComponent>以下の内容で登録があります</TitleComponent>
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
            <PrimaryBtn
              style={{
                mt: 1,
                mb: 2,
                mr: 1,
                bgcolor: teal[400],
                color: "white",
                "&:hover": { bgcolor: teal[500] },
              }}
              buttonText={"予約キャンセル"}
              click={props.chancelRsv}
            />
            <PrimaryBtn
              style={{
                mt: 1,
                mb: 2,
                mr: 1,
                bgcolor: grey[500],
                color: "white",
                "&:hover": { bgcolor: grey[600] },
              }}
              buttonText={"閉じる"}
              click={handleClose4}
            />
          </Box>
        </Modals>
      </Modal>
    </>
  );
};
export default RsvModal;
