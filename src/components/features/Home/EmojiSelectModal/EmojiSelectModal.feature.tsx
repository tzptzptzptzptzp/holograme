import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { useCreateFavorite } from "@/hooks/useCreateFavorite.hook";
import { useModal } from "@/hooks/useModal.hook";
import {
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
  const { updateCreateFavorite } = useCreateFavorite();
  const setEditFavorite = useSetRecoilState(EditFavoriteState);

  const { handleOpen } = useModal();

  const handleSelect = (emoji: EmojiType) => {
    if (favoriteMode === "create") {
      updateCreateFavorite({
        emojiId: emoji.id,
        emojiNative: emoji.native,
        emojiUnified: emoji.unified,
      });
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
    <ModalInner className="min-w-0" enableButton={false}>
      <Picker data={data} onEmojiSelect={handleSelect} />
    </ModalInner>
  );
};
