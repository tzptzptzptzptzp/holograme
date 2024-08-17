import { useRecoilState } from "recoil";
import { ModalState } from "@/recoil/atoms.recoil";
import { ModalContentType } from "@/types";

export const useModal = () => {
  const [modalState, setModalState] = useRecoilState(ModalState);

  const handleClose = () => {
    setModalState({ ...modalState, content: "", isOpen: false });
  };

  const handleOpen = (content: ModalContentType, isCloseDisabled = false) => {
    setModalState({
      ...modalState,
      content: content,
      isCloseDisabled,
      isOpen: true,
    });
  };

  return {
    content: modalState.content,
    isCloseDisabled: modalState.isCloseDisabled,
    isOpen: modalState.isOpen,
    modalState,
    handleClose,
    handleOpen,
    setModalState,
  };
};
