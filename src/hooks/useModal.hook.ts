import { useModalStore } from "@/stores/modal.store";
import { ModalContentType } from "@/types";
import { useCallback } from "react";

export const useModal = () => {
  const { modal, setModal, openModal, closeModal } = useModalStore();

  const handleClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleOpen = useCallback(
    (content: ModalContentType, isCloseDisabled = false) => {
      openModal(content, isCloseDisabled);
    },
    [openModal]
  );

  return {
    content: modal.content,
    isCloseDisabled: modal.isCloseDisabled,
    isOpen: modal.isOpen,
    modalState: modal,
    handleClose,
    handleOpen,
    setModalState: setModal,
  };
};
