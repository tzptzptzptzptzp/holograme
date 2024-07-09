import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { ErrorMessage } from "@/components/forms/ErrorMessage/ErrorMessage.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useDeleteAllChatMessages } from "@/hooks/api/useDeleteAllChatMessages.hook";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";
import { useModal } from "@/hooks/useModal.hook";
import { ChatRoomState } from "@/recoil/atoms.recoil";

export const DeleteChatMessagesModal = () => {
  const [apiPending, setApiPending] = useState(false);

  const chatRoom = useRecoilValue(ChatRoomState);

  const mutate = useDeleteAllChatMessages();
  const { refetch: chatMessageRefetch } = useGetChatMessage(chatRoom?.id || 0);

  const { handleClose } = useModal();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatRoom) return;
    setApiPending(true);
    mutate(
      { id: chatRoom.id },
      {
        onSuccess: async ({ data }) => {
          handleClose();
          toast(
            `${textsConfig.TOAST.CHAT_MESSAGE_DELETE.SUCCESS} - ${data.count}件`
          );
          setApiPending(false);
          await chatMessageRefetch();
        },
      }
    );
  };

  return (
    <ModalInner
      buttonDisabled={apiPending}
      buttonText="削除"
      form
      onSubmit={(e) => onSubmit(e)}
      title={textsConfig.FORM.CHAT_MESSAGE.TITLE.DELETE}
    >
      <div className="flex flex-col items-center justify-center min-w-[250px]">
        <ErrorMessage>
          {textsConfig.FORM.CHAT_MESSAGE.NAME +
            textsConfig.FORM.CHAT_MESSAGE.DELETE.ALERT[0]}
        </ErrorMessage>
        <ErrorMessage>
          {textsConfig.FORM.CHAT_MESSAGE.DELETE.ALERT[1]}
        </ErrorMessage>
      </div>
    </ModalInner>
  );
};
