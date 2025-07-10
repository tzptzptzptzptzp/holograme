import { create } from "zustand";
import { ModalContentType } from "@/types";

// モーダル状態の型定義
export interface ModalState {
  content: ModalContentType;
  isCloseDisabled: boolean;
  isOpen: boolean;
}

// モーダルストアの型定義
interface ModalStore {
  // 状態
  modal: ModalState;

  // アクション
  setModal: (modal: Partial<ModalState>) => void;
  openModal: (content: ModalContentType, isCloseDisabled?: boolean) => void;
  closeModal: () => void;
}

// デフォルト値
const defaultModalState: ModalState = {
  content: "",
  isCloseDisabled: false,
  isOpen: false,
};

// Zustandストアの作成
export const useModalStore = create<ModalStore>()((set) => ({
  // 初期状態
  modal: defaultModalState,

  // アクション
  setModal: (newState) =>
    set((state) => ({
      modal: { ...state.modal, ...newState },
    })),

  openModal: (content, isCloseDisabled = false) =>
    set((state) => ({
      modal: {
        ...state.modal,
        content,
        isCloseDisabled,
        isOpen: true,
      },
    })),

  closeModal: () =>
    set((state) => ({
      modal: {
        ...state.modal,
        content: "",
        isOpen: false,
      },
    })),
}));
