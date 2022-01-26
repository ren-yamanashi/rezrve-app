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
