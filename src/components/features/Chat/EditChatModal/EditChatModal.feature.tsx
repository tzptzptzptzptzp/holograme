import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { ErrorMessage } from "@/components/forms/ErrorMessage/ErrorMessage.form";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { FormTextarea } from "@/components/forms/FormTextarea/FormTextarea.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useGetChat } from "@/hooks/api/useGetChat.hook";
import { usePutChat } from "@/hooks/api/usePutChat.hook";
import { useModal } from "@/hooks/useModal.hook";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";
import { ChatMessageState } from "@/recoil/atoms.recoil";

type Inputs = {
  chatRoomName: string;
  description: string;
  defaultMessage: string;
};

export const EditChatModal = () => {
  const [apiPending, setApiPending] = useState(false);

  const mutate = usePutChat();
  const { refetch } = useGetChat();

  const chatRoom = useRecoilValue(ChatMessageState);

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<Inputs>();

  const { handleClose, handleOpen } = useModal();

  useEffect(() => {
    setValue("chatRoomName", chatRoom.name);
    setValue("description", chatRoom.description);
    setValue("defaultMessage", chatRoom.defaultMessage);
  }, [chatRoom, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setApiPending(true);
    mutate(
      {
        id: chatRoom.roomId,
        name: data.chatRoomName,
        description: data.description,
        defaultMessage: data.defaultMessage,
      },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.CHAT_UPDATE.SUCCESS);
          setApiPending(false);
          refetch();
          handleClose();
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
        rows={2}
        {...register("description")}
      />
      <FormTextarea
        label={textsConfig.FORM.CHAT.DEFAULT_MESSAGE}
        errorMessage={errors.defaultMessage?.message}
        placeholder={`${textsConfig.FORM.CHAT.DEFAULT_MESSAGE}を入力`}
        rows={2}
        {...register("defaultMessage")}
      />
      <div className="flex justify-center">
        <Button onClick={() => handleOpen("deleteChat")}>
          <ErrorMessage>{textsConfig.FORM.CHAT.DELETE.BUTTON}</ErrorMessage>
        </Button>
      </div>
    </ModalInner>
  );
};
