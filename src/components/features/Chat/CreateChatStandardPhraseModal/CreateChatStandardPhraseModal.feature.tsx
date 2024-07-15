import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { FormTextarea } from "@/components/forms/FormTextarea/FormTextarea.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useGetChatStandardPhrase } from "@/hooks/api/useGetChatStandardPhrase.hook";
import { usePostChatStandardPhrase } from "@/hooks/api/usePostChatStandardPhrase.hook";
import { useModal } from "@/hooks/useModal.hook";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";

type Inputs = {
  title: string;
  content: string;
};

export const CreateChatStandardPhraseModal = () => {
  const [apiPending, setApiPending] = useState(false);

  const mutate = usePostChatStandardPhrase();
  const { refetch } = useGetChatStandardPhrase();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { handleClose } = useModal();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    if (apiPending) return;
    setApiPending(true);
    mutate(
      {
        title: data.title,
        content: data.content,
      },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.CHAT_STANDARD_PHRASE_CREATE.SUCCESS);
          refetch();
          handleClose();
        },
        onError: () => {
          toast.error(textsConfig.TOAST.CHAT_STANDARD_PHRASE_CREATE.ERROR);
        },
        onSettled: () => {
          setApiPending(false);
        },
      }
    );
  };

  return (
    <ModalInner
      buttonDisabled={apiPending}
      form
      onSubmit={handleSubmit(onSubmit)}
      title={textsConfig.FORM.CHAT_STANDARD_PHRASE.TITLE.CREATE}
    >
      <FormInput
        label={textsConfig.FORM.CHAT_STANDARD_PHRASE.NAME}
        errorMessage={errors.title?.message}
        placeholder={`${textsConfig.FORM.CHAT_STANDARD_PHRASE.NAME}を入力`}
        {...register("title", {
          required: GetRequiredMessage(
            textsConfig.FORM.CHAT_STANDARD_PHRASE.NAME
          ),
        })}
      />
      <FormTextarea
        label={textsConfig.FORM.CHAT_STANDARD_PHRASE.CONTENT}
        errorMessage={errors.content?.message}
        placeholder={`${textsConfig.FORM.CHAT_STANDARD_PHRASE.CONTENT}を入力`}
        {...register("content", {
          required: GetRequiredMessage(
            textsConfig.FORM.CHAT_STANDARD_PHRASE.CONTENT
          ),
        })}
      />
    </ModalInner>
  );
};
