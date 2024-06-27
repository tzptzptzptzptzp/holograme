import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { FormTextarea } from "@/components/forms/FormTextarea/FormTextarea.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useGetChat } from "@/hooks/api/useGetChat.hook";
import { usePostChat } from "@/hooks/api/usePostChat.hook";
import { useModal } from "@/hooks/useModal.hook";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";

type Inputs = {
  chatRoomName: string;
  description: string;
  defaultMessage: string;
};

export const CreateChatModal = () => {
  const mutate = usePostChat();
  const { refetch } = useGetChat();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { handleClose } = useModal();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(
      {
        name: data.chatRoomName,
        description: data.description,
        defaultMessage: data.defaultMessage,
      },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.CHAT_CREATE.SUCCESS);
          refetch();
          handleClose();
        },
      }
    );
  };

  return (
    <ModalInner
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
    </ModalInner>
  );
};
