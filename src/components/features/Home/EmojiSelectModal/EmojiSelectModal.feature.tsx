import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { useCreateFavorite } from "@/hooks/useCreateFavorite.hook";
import { useEditFavorite } from "@/hooks/useEditFavorite.hook";
import { useFavoriteMode } from "@/hooks/useFavoriteMode.hook";
import { useModal } from "@/hooks/useModal.hook";

type EmojiType = {
  id: string;
  native: string;
  unified: string;
};

export const EmojiSelectModal = () => {
  const { mode } = useFavoriteMode();
  const { updateCreateFavorite } = useCreateFavorite();
  const { updateEditFavorite } = useEditFavorite();

  const { handleOpen } = useModal();

  const handleSelect = (emoji: EmojiType) => {
    if (mode === "create") {
      updateCreateFavorite({
        emojiId: emoji.id,
        emojiNative: emoji.native,
        emojiUnified: emoji.unified,
      });
      handleOpen("createFavorite");
    } else {
      updateEditFavorite({
        emojiId: emoji.id,
        emojiNative: emoji.native,
        emojiUnified: emoji.unified,
      });
      handleOpen("editFavorite");
    }
  };
  return (
    <ModalInner className="min-w-0" enableButton={false}>
      <Picker data={data} onEmojiSelect={handleSelect} />
    </ModalInner>
  );
};
