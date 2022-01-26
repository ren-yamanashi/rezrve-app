import { memo, VFC, useState, useEffect, ChangeEvent } from "react";
import {
  Stack,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/react";

import { FreeList } from "../../../models/FreeList";

type Props = {
  rsv: FreeList | null;
  isOpen: boolean;
  onClose: () => void;
};

export function RsvModal(props: Props) {
  const { rsv, isOpen, onClose } = props;
  const [student, setStudent] = useState("");
  const [teacher, setTeacher] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState<number>();

  useEffect(() => {
    setStudent(rsv?.student ?? "");
    setTeacher(rsv?.teacher ?? "");
    setDate(rsv?.date ?? "");
    setTime(rsv?.time ?? null);
  }, [rsv]);

  const onChangeStudent = (e: ChangeEvent<HTMLInputElement>) => {
    setStudent(e.target.value);
  };
  const onChangeTeacher = (e: ChangeEvent<HTMLInputElement>) => {
    setTeacher(e.target.value);
  };
  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) =>
    setDate(e.target.value);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>予約詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx="4">
          <FormControl>
            <FormLabel>生徒名</FormLabel>
            <Input value={student} onChange={onChangeStudent} />
          </FormControl>
          <FormControl>
            <FormLabel>講師名</FormLabel>
            <Input value={teacher} onChange={onChangeTeacher} />
          </FormControl>
          <FormControl>
            <FormLabel>予約日</FormLabel>
            <Input value={date} onChange={onChangeDate} />
          </FormControl>
          <FormControl>
            <FormLabel>時間</FormLabel>
            <Input value={time} />
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
