import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  runTransaction,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  useState,
  useEffect,
  FormEvent,
  useCallback,
  memo,
  VFC,
} from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Modal from "react-modal";
//内部インポート
import { useAuth } from "../../../hooks/useUserAuth";
import { ReserveList } from "../../../models/ReserveList";
import Header from "../../templates/Header";
import { FreeList } from "../../../models/FreeList";

// スタイリング
const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "500px",
    height: "300px",
    transform: "translate(-50%, -50%)",
  },
};

type Props = {
  reserve: FreeList | null;
  isOpen: boolean;
  onClose: () => void;
};

export const EditRsv: VFC<Props> = (props) => {
  const { reserve, isOpen, onClose } = props;
};
