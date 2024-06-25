import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useGetChat } from "@/hooks/api/useGetChat.hook";
import { usePostChat } from "@/hooks/api/usePostChat.hook";
import { useModal } from "@/hooks/useModal.hook";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";
import { useEffect } from "react";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";
import { useRecoilValue } from "recoil";
import { ChatMessageState } from "@/recoil/atoms.recoil";
import { usePutChat } from "@/hooks/api/usePutChat.hook";

type Inputs = {
  chatRoomName: string;
};

export const EditChatModal = () => {
  const mutate = usePutChat();
  const { refetch } = useGetChat();

  const chatRoom = useRecoilValue(ChatMessageState);

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<Inputs>();

  const { handleClose } = useModal();

  useEffect(() => {
    setValue("chatRoomName", chatRoom.name);
  }, [chatRoom, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(
      { id: chatRoom.roomId, name: data.chatRoomName },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.CHAT_UPDATE.SUCCESS);
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
      title="チャットルーム編集"
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
