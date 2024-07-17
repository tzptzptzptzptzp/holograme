import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";

export const EmojiSelectModal = () => {
  return (
    <ModalInner enableButton={false}>
      <Picker data={data} onEmojiSelect={console.log} />
    </ModalInner>
  );
};
