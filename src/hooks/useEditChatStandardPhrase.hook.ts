import { useEditChatStandardPhraseStore } from "@/stores/editChatStandardPhrase.store";

export const useEditChatStandardPhrase = () => {
  const {
    editChatStandardPhrase,
    setEditChatStandardPhrase,
    resetEditChatStandardPhrase,
  } = useEditChatStandardPhraseStore();

  return {
    editChatStandardPhrase,
    setEditChatStandardPhrase,
    resetEditChatStandardPhrase,
  };
};
