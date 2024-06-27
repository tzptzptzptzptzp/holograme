import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { ErrorMessage } from "@/components/forms/ErrorMessage/ErrorMessage.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useDeleteChat } from "@/hooks/api/useDeleteChat.hook";
import { useGetChat } from "@/hooks/api/useGetChat.hook";
import { useModal } from "@/hooks/useModal.hook";
import { ChatMessageState } from "@/recoil/atoms.recoil";

export const DeleteChatModal = () => {
  const mutate = useDeleteChat();
  const { refetch } = useGetChat();

  const chatRoom = useRecoilValue(ChatMessageState);

  const { handleClose } = useModal();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { id: chatRoom.roomId },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.CHAT_DELETE.SUCCESS);
          refetch();
          handleClose();
        },
      }
    );
  };

  return (
    <ModalInner
      buttonText="削除"
      form
      onSubmit={(e) => onSubmit(e)}
      title={textsConfig.FORM.CHAT.TITLE.DELETE}
    >
      <div className="flex flex-col items-center justify-center min-w-[250px]">
        <ErrorMessage>
          {chatRoom.name + textsConfig.FORM.CHAT.DELETE.ALERT[0]}
        </ErrorMessage>
        <ErrorMessage>{textsConfig.FORM.CHAT.DELETE.ALERT[1]}</ErrorMessage>
      </div>
    </ModalInner>
  );
};
