import { useRecoilState } from "recoil";
import { ModalState } from "@/recoil/atoms.recoil";
import { ModalContentType } from "@/types";

export const useModal = () => {
  const [modalState, setModalState] = useRecoilState(ModalState);

  const handleClose = () => {
    setModalState({ ...modalState, content: "", isOpen: false });
  };

  const handleOpen = (content: ModalContentType) => {
    setModalState({ ...modalState, content: content, isOpen: true });
  };

  return {
    content: modalState.content,
    isOpen: modalState.isOpen,
    modalState,
    handleClose,
    handleOpen,
    setModalState,
  };
};
