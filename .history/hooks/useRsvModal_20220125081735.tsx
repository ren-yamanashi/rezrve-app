import ReactModal from "react-modal";
import { useModal, ModalProvider } from "react-modal-hook";
import React from "react";

const UseRsvModal = () => {
  const [showModal, hideModal] = useModal(() => (
    <>
      <ReactModal isOpen>
        <p>Modal content</p>
        <button onClick={hideModal}>Hide modal</button>
      </ReactModal>
    </>
  ));
  return <button onClick={showModal}>Show modal</button>;
};

const Hoge = () => {
  return (
    <ModalProvider>
      <UseRsvModal />
    </ModalProvider>
  );
};

export default Hoge;
