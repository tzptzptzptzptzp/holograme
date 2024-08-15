import { useState } from "react";
import { toast } from "react-toastify";
import { ErrorMessage } from "@/components/forms/ErrorMessage/ErrorMessage.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useDeleteFavorite } from "@/hooks/api/useDeleteFavorite.hook";
import { useGetWriter } from "@/hooks/api/useGetWriter.hook";
import { useModal } from "@/hooks/useModal.hook";

export const DeleteWriterModal = () => {
  const [apiPending, setApiPending] = useState(false);

  const mutate = useDeleteFavorite();
  const { refetch } = useGetWriter();

  const { handleClose } = useModal();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiPending(true);
    mutate(
      { id: 0 },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.FAVORITE_DELETE.SUCCESS);
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
      buttonText={textsConfig.BUTTON.DELETE}
      form
      onSubmit={(e) => onSubmit(e)}
      title={textsConfig.FORM.WRITER.TITLE.DELETE}
    >
      <div className="flex flex-col items-center justify-center min-w-[250px]">
        <ErrorMessage>
          {/* {editFavorite.title + textsConfig.FORM.WRITER.DELETE.ALERT[0]} */}
          title
        </ErrorMessage>
        <ErrorMessage>{textsConfig.FORM.WRITER.DELETE.ALERT[1]}</ErrorMessage>
      </div>
    </ModalInner>
  );
};
