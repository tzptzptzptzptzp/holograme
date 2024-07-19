import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { useModal } from "@/hooks/useModal.hook";
import {
  CreateFavoriteState,
  EditFavoriteState,
  FavoriteModeState,
} from "@/recoil/atoms.recoil";

type EmojiType = {
  id: string;
  native: string;
  unified: string;
};

export const EmojiSelectModal = () => {
  const favoriteMode = useRecoilValue(FavoriteModeState);
  const setCreateFavorite = useSetRecoilState(CreateFavoriteState);
  const setEditFavorite = useSetRecoilState(EditFavoriteState);

  const { handleOpen } = useModal();

  const handleSelect = (emoji: EmojiType) => {
    if (favoriteMode === "create") {
      setCreateFavorite((prev) => ({
        ...prev,
        emojiId: emoji.id,
        emojiNative: emoji.native,
        emojiUnified: emoji.unified,
      }));
      handleOpen("createFavorite");
    } else {
      setEditFavorite((prev) => ({
        ...prev,
        emojiId: emoji.id,
        emojiNative: emoji.native,
        emojiUnified: emoji.unified,
      }));
      handleOpen("editFavorite");
    }
  };
  return (
    <ModalInner enableButton={false}>
      <Picker data={data} onEmojiSelect={handleSelect} />
    </ModalInner>
  );
};
