import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { ErrorMessage } from "@/components/forms/ErrorMessage/ErrorMessage.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useDeleteChat } from "@/hooks/api/useDeleteChat.hook";
import { useGetChat } from "@/hooks/api/useGetChat.hook";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";
import { useModal } from "@/hooks/useModal.hook";
import { ChatRoomState } from "@/recoil/atoms.recoil";

export const DeleteChatModal = () => {
  const [apiPending, setApiPending] = useState(false);

  const [chatRoom, setChatRoom] = useRecoilState(ChatRoomState);

  const mutate = useDeleteChat();
  const { refetch: chatRefetch } = useGetChat();
  const { refetch: chatMessageRefetch } = useGetChatMessage(chatRoom?.id || 0);

  const { handleClose } = useModal();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatRoom) return;
    setApiPending(true);
    mutate(
      { id: chatRoom.id },
      {
        onSuccess: async () => {
          toast(textsConfig.TOAST.CHAT_DELETE.SUCCESS);
          setApiPending(false);
          const { data } = await chatRefetch();
          await setChatRoom({
            id: data?.[0]?.id || 0,
            name: data?.[0]?.name || "",
            description: data?.[0]?.description || "",
            defaultMessage: data?.[0]?.defaultMessage || "",
          });
          await chatMessageRefetch();
          handleClose();
        },
      }
    );
  };

  return (
    <ModalInner
      buttonDisabled={apiPending}
      buttonText={textsConfig.BUTTON.DELETE}
      form
      onSubmit={(e) => onSubmit(e)}
      title={textsConfig.FORM.CHAT.TITLE.DELETE}
    >
      <div className="flex flex-col items-center justify-center min-w-[250px]">
        <ErrorMessage>
          {chatRoom?.name + textsConfig.FORM.CHAT.DELETE.ALERT[0]}
        </ErrorMessage>
        <ErrorMessage>{textsConfig.FORM.CHAT.DELETE.ALERT[1]}</ErrorMessage>
      </div>
    </ModalInner>
  );
};
