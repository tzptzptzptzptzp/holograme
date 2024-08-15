import { useState } from "react";
import { toast } from "react-toastify";
import { ErrorMessage } from "@/components/forms/ErrorMessage/ErrorMessage.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useDeleteWriter } from "@/hooks/api/useDeleteWriter.hook";
import { useGetWriter } from "@/hooks/api/useGetWriter.hook";
import { useWriter } from "@/hooks/features/useWriter.hook";
import { useModal } from "@/hooks/useModal.hook";

export const DeleteWriterModal = () => {
  const [apiPending, setApiPending] = useState(false);

  const { writer, resetWriter } = useWriter();

  const mutate = useDeleteWriter();
  const { refetch } = useGetWriter();

  const { handleClose } = useModal();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiPending(true);
    mutate(
      { id: writer.id },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.WRITER_DELETE.SUCCESS);
          refetch();
          resetWriter();
          handleClose();
        },
        onError: () => {
          toast.error(textsConfig.TOAST.WRITER_DELETE.ERROR);
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
          {writer.name + textsConfig.FORM.WRITER.DELETE.ALERT[0]}
        </ErrorMessage>
        <ErrorMessage>{textsConfig.FORM.WRITER.DELETE.ALERT[1]}</ErrorMessage>
      </div>
    </ModalInner>
  );
};
