import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useGetChat } from "@/hooks/api/useGetChat.hook";
import { usePostChat } from "@/hooks/api/usePostChat.hook";
import { useModal } from "@/hooks/useModal.hook";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";

type Inputs = {
  chatRoomName: string;
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
      { name: data.chatRoomName },
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
      title="チャットルーム作成"
    >
      <FormInput
        label="チャットルーム名"
        errorMessage={errors.chatRoomName?.message}
        placeholder="チャットルーム名を入力"
        {...register("chatRoomName", {
          required: GetRequiredMessage("ルーム名"),
        })}
      />
    </ModalInner>
  );
};
