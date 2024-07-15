import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { ErrorMessage } from "@/components/forms/ErrorMessage/ErrorMessage.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useGetChatStandardPhrase } from "@/hooks/api/useGetChatStandardPhrase.hook";
import { useDeleteChatStandardPhrase } from "@/hooks/api/useDeleteChatStandardPhrase.hook";
import { useModal } from "@/hooks/useModal.hook";
import { EditChatStandardPhraseState } from "@/recoil/atoms.recoil";

export const DeleteChatStandardPhraseModal = () => {
  const [apiPending, setApiPending] = useState(false);

  const chatStandardPhrase = useRecoilValue(EditChatStandardPhraseState);

  const mutate = useDeleteChatStandardPhrase();
  const { refetch } = useGetChatStandardPhrase();

  const { handleClose } = useModal();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatStandardPhrase) return;
    setApiPending(true);
    mutate(
      { id: chatStandardPhrase.id },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.CHAT_STANDARD_PHRASE_DELETE.SUCCESS);
          refetch();
          handleClose();
        },
        onError: () => {
          toast.error(textsConfig.TOAST.CHAT_STANDARD_PHRASE_DELETE.ERROR);
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
      buttonText="削除"
      form
      onSubmit={(e) => onSubmit(e)}
      title={textsConfig.FORM.CHAT_STANDARD_PHRASE.TITLE.DELETE}
    >
      <div className="flex flex-col items-center justify-center min-w-[250px]">
        <ErrorMessage>
          {chatStandardPhrase?.title +
            textsConfig.FORM.CHAT_STANDARD_PHRASE.DELETE.ALERT[0]}
        </ErrorMessage>
        <ErrorMessage>
          {textsConfig.FORM.CHAT_STANDARD_PHRASE.DELETE.ALERT[1]}
        </ErrorMessage>
      </div>
    </ModalInner>
  );
};
