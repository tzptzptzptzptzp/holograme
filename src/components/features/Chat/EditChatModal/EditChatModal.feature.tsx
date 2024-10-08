import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { ErrorMessage } from "@/components/forms/ErrorMessage/ErrorMessage.form";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { FormTextarea } from "@/components/forms/FormTextarea/FormTextarea.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";
import { usePutChat } from "@/hooks/api/usePutChat.hook";
import { useModal } from "@/hooks/useModal.hook";
import { ChatMessagesState, ChatRoomState } from "@/recoil/atoms.recoil";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";

type Inputs = {
  chatRoomName: string;
  description: string;
  defaultMessage: string;
};

export const EditChatModal = () => {
  const [apiPending, setApiPending] = useState(false);

  const [chatRoom, setChatRoom] = useRecoilState(ChatRoomState);
  const chatMessages = useRecoilValue(ChatMessagesState);

  const mutate = usePutChat();
  const { refetch } = useGetChatMessage(chatRoom?.id || 0);

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<Inputs>();

  const { handleClose, handleOpen } = useModal();

  useEffect(() => {
    setValue("chatRoomName", chatRoom?.name || "");
    setValue("description", chatRoom?.description || "");
    setValue("defaultMessage", chatRoom?.defaultMessage || "");
  }, [chatRoom, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!chatRoom) return;
    setApiPending(true);
    mutate(
      {
        id: chatRoom.id,
        name: data.chatRoomName,
        description: data.description,
        defaultMessage: data.defaultMessage,
      },
      {
        onSuccess: async () => {
          handleClose();
          toast(textsConfig.TOAST.CHAT_UPDATE.SUCCESS);
          setApiPending(false);
          const { data } = await refetch();
          await setChatRoom({
            id: chatRoom.id,
            name: data?.name || "",
            description: data?.description || "",
            defaultMessage: data?.defaultMessage || "",
          });
        },
      }
    );
  };

  return (
    <ModalInner
      buttonDisabled={apiPending}
      buttonText="更新"
      form
      onSubmit={handleSubmit(onSubmit)}
      title={textsConfig.FORM.CHAT.TITLE.EDIT}
    >
      <FormInput
        label={textsConfig.FORM.CHAT.NAME}
        errorMessage={errors.chatRoomName?.message}
        placeholder={`${textsConfig.FORM.CHAT.NAME}を入力`}
        {...register("chatRoomName", {
          required: GetRequiredMessage(textsConfig.FORM.CHAT.NAME),
        })}
      />
      <FormTextarea
        label={textsConfig.FORM.CHAT.DESCRIPTION}
        errorMessage={errors.description?.message}
        placeholder={`${textsConfig.FORM.CHAT.DESCRIPTION}を入力`}
        {...register("description")}
      />
      <FormTextarea
        label={textsConfig.FORM.CHAT.DEFAULT_MESSAGE}
        errorMessage={errors.defaultMessage?.message}
        placeholder={`${textsConfig.FORM.CHAT.DEFAULT_MESSAGE}を入力`}
        {...register("defaultMessage")}
      />
      <div className="flex flex-col items-center justify-center gap-2">
        {chatMessages.length > 0 && (
          <div>
            <Button onClick={() => handleOpen("deleteChatMessages")}>
              {textsConfig.FORM.CHAT_MESSAGE.DELETE.BUTTON}
            </Button>
          </div>
        )}
        <Button onClick={() => handleOpen("deleteChat")}>
          <ErrorMessage>{textsConfig.FORM.CHAT.DELETE.BUTTON}</ErrorMessage>
        </Button>
      </div>
    </ModalInner>
  );
};
