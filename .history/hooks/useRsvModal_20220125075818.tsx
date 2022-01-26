import ReactModal from "react-modal";
import { useModal } from "react-hooks-use-modal";
import React from "react";

const modalStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "60px 100px",
  borderRadius: "10px",
};

export function useRsvModal() {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
  });
}
