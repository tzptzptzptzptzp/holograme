import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { FormTextarea } from "@/components/forms/FormTextarea/FormTextarea.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useGetChat } from "@/hooks/api/useGetChat.hook";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";
import { usePostChat } from "@/hooks/api/usePostChat.hook";
import { useModal } from "@/hooks/useModal.hook";
import { ChatRoomState } from "@/recoil/atoms.recoil";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";

type Inputs = {
  chatRoomName: string;
  description: string;
  defaultMessage: string;
};

export const CreateChatModal = () => {
  const [apiPending, setApiPending] = useState(false);

  const [chatRoom, setChatRoom] = useRecoilState(ChatRoomState);

  const mutate = usePostChat();
  const { refetch: chatRefetch } = useGetChat();
  const { refetch: chatMessageRefetch } = useGetChatMessage(chatRoom?.id || 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { handleClose } = useModal();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setApiPending(true);
    mutate(
      {
        name: data.chatRoomName,
        description: data.description,
        defaultMessage: data.defaultMessage,
      },
      {
        onSuccess: ({ data }) => {
          toast(textsConfig.TOAST.CHAT_CREATE.SUCCESS);
          setApiPending(false);
          setChatRoom({
            id: data.id,
            name: data.name,
            description: data.description,
            defaultMessage: data.defaultMessage,
          });
          chatRefetch();
          chatMessageRefetch();
          handleClose();
        },
      }
    );
  };

  return (
    <ModalInner
      buttonDisabled={apiPending}
      form
      onSubmit={handleSubmit(onSubmit)}
      title={textsConfig.FORM.CHAT.TITLE.CREATE}
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
    </ModalInner>
  );
};
