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
import { useGetChatStandardPhrase } from "@/hooks/api/useGetChatStandardPhrase.hook";
import { usePutChatStandardPhrase } from "@/hooks/api/usePutChatStandardPhrase.hook";
import { useModal } from "@/hooks/useModal.hook";
import { EditChatStandardPhraseState } from "@/recoil/atoms.recoil";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";

type Inputs = {
  title: string;
  content: string;
};

export const EditChatStandardPhraseModal = () => {
  const [apiPending, setApiPending] = useState(false);

  const editChatStandardPhrase = useRecoilValue(EditChatStandardPhraseState);

  const mutate = usePutChatStandardPhrase();
  const { refetch } = useGetChatStandardPhrase();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const { handleClose, handleOpen } = useModal();

  useEffect(() => {
    setValue("title", editChatStandardPhrase.title);
    setValue("content", editChatStandardPhrase.content);
  }, [editChatStandardPhrase, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (apiPending) return;
    setApiPending(true);
    mutate(
      {
        id: editChatStandardPhrase.id,
        title: data.title,
        content: data.content,
      },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.CHAT_STANDARD_PHRASE_UPDATE.SUCCESS);
          refetch();
          handleClose();
        },
        onError: () => {
          toast.error(textsConfig.TOAST.CHAT_STANDARD_PHRASE_UPDATE.ERROR);
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
      buttonText="更新"
      form
      onSubmit={handleSubmit(onSubmit)}
      title={textsConfig.FORM.CHAT_STANDARD_PHRASE.TITLE.EDIT}
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
      <Button onClick={() => handleOpen("deleteChatStandardPhrase")}>
        <ErrorMessage>
          {textsConfig.FORM.CHAT_STANDARD_PHRASE.DELETE.BUTTON}
        </ErrorMessage>
      </Button>
    </ModalInner>
  );
};
