import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { ErrorMessage } from "@/components/forms/ErrorMessage/ErrorMessage.form";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useGetChat } from "@/hooks/api/useGetChat.hook";
import { usePutChat } from "@/hooks/api/usePutChat.hook";
import { useModal } from "@/hooks/useModal.hook";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";
import { ChatMessageState } from "@/recoil/atoms.recoil";

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

  const { handleClose, handleOpen } = useModal();

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
      buttonText="更新"
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
      <div className="flex justify-center">
        <Button onClick={() => handleOpen("deleteChat")}>
          <ErrorMessage>このルームを削除する</ErrorMessage>
        </Button>
      </div>
    </ModalInner>
  );
};
