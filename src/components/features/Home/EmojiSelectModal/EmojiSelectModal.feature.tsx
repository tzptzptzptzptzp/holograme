import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useSetRecoilState } from "recoil";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { useModal } from "@/hooks/useModal.hook";
import { CreateFavoriteState } from "@/recoil/atoms.recoil";

type EmojiType = {
  id: string;
  native: string;
  unified: string;
};

export const EmojiSelectModal = () => {
  const setCreateFavorite = useSetRecoilState(CreateFavoriteState);

  const { handleOpen } = useModal();

  const handleSelect = (emoji: EmojiType) => {
    setCreateFavorite((prev) => ({
      ...prev,
      emojiId: emoji.id,
      emojiNative: emoji.native,
      emojiUnified: emoji.unified,
    }));
    handleOpen("createFavorite");
  };
  return (
    <ModalInner enableButton={false}>
      <Picker data={data} onEmojiSelect={handleSelect} />
    </ModalInner>
  );
};
