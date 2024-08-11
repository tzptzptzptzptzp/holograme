import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { ErrorMessage } from "@/components/forms/ErrorMessage/ErrorMessage.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useDeleteFavorite } from "@/hooks/api/useDeleteFavorite.hook";
import { useGetFavorite } from "@/hooks/api/useGetFavorite.hook";
import { useModal } from "@/hooks/useModal.hook";
import { EditFavoriteState } from "@/recoil/atoms.recoil";

export const DeleteFavoriteModal = () => {
  const [apiPending, setApiPending] = useState(false);

  const [editFavorite, setEditFavorite] = useRecoilState(EditFavoriteState);

  const mutate = useDeleteFavorite();
  const { refetch } = useGetFavorite();

  const { handleClose } = useModal();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiPending(true);
    mutate(
      { id: editFavorite.id },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.FAVORITE_DELETE.SUCCESS);
          refetch();
          setEditFavorite({
            id: 0,
            title: "",
            url: "",
            emojiId: "star",
            emojiNative: "⭐",
            emojiUnified: "2b50",
          });
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
      title={textsConfig.FORM.FAVORITE.TITLE.DELETE}
    >
      <div className="flex flex-col items-center justify-center min-w-[250px]">
        <ErrorMessage>
          {editFavorite.title + textsConfig.FORM.FAVORITE.DELETE.ALERT[0]}
        </ErrorMessage>
        <ErrorMessage>{textsConfig.FORM.FAVORITE.DELETE.ALERT[1]}</ErrorMessage>
      </div>
    </ModalInner>
  );
};
