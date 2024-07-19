import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useGetFavorite } from "@/hooks/api/useGetFavorite.hook";
import { usePutFavorite } from "@/hooks/api/usePutFavorite.hook";
import { useModal } from "@/hooks/useModal.hook";
import { EditFavoriteState, FavoriteModeState } from "@/recoil/atoms.recoil";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";

type Inputs = {
  title: string;
  url: string;
};

export const EditFavoriteModal = () => {
  const isFirstRender = useRef(true);
  const [apiPending, setApiPending] = useState(false);
  const [urlError, setUrlError] = useState("");

  const [editFavorite, setEditFavorite] = useRecoilState(EditFavoriteState);
  const setFavoriteMode = useSetRecoilState(FavoriteModeState);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { handleClose, handleOpen: onOpen } = useModal();

  const { refetch } = useGetFavorite();

  const mutate = usePutFavorite();

  const title = watch("title");
  const url = watch("url");

  useEffect(() => {
    if (isFirstRender.current) {
      setValue("title", editFavorite.title);
      setValue("url", editFavorite.url);
      isFirstRender.current = false;
    }
  }, [editFavorite, setValue]);

  useEffect(() => {
    if (!url) return;
    url.startsWith("http")
      ? setUrlError("")
      : setUrlError("👾 URLはhttpから始まる必要があるよ");
  }, [url]);

  const handleOpen = () => {
    setFavoriteMode("edit");
    setEditFavorite((prev) => ({
      ...prev,
      title: title,
      url: url,
    }));
    onOpen("emojiSelect");
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (apiPending || !data.url.startsWith("http")) return;
    setApiPending(true);
    mutate(
      {
        id: editFavorite.id,
        title: data.title,
        url: data.url,
        emojiId: editFavorite.emojiId,
        emojiNative: editFavorite.emojiNative,
        emojiUnified: editFavorite.emojiUnified,
      },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.FAVORITE_UPDATE.SUCCESS);
          refetch();
          handleClose();
        },
        onError: () => {
          toast.error(textsConfig.TOAST.FAVORITE_UPDATE.ERROR);
        },
        onSettled: () => {
          setApiPending(false);
          setEditFavorite({
            id: 0,
            title: "",
            url: "",
            emojiId: "star",
            emojiNative: "⭐",
            emojiUnified: "2b50",
          });
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
      title={textsConfig.FORM.FAVORITE.TITLE.EDIT}
    >
      <div className="flex items-end justify-between relative gap-2">
        <FormInput
          label={textsConfig.FORM.FAVORITE.NAME}
          inputClassName="pr-10"
          errorMessage={errors.title?.message}
          placeholder={`${textsConfig.FORM.FAVORITE.NAME}を入力`}
          {...register("title", {
            required: GetRequiredMessage(textsConfig.FORM.FAVORITE.NAME),
          })}
        />
        <Button
          className="absolute top-4 right-2 text-[22px]"
          onClick={handleOpen}
        >
          {editFavorite.emojiNative}
        </Button>
      </div>
      <FormInput
        label={textsConfig.FORM.FAVORITE.URL}
        errorMessage={errors.url?.message || urlError}
        placeholder={`${textsConfig.FORM.FAVORITE.URL}を入力`}
        {...register("url", {
          required: GetRequiredMessage(textsConfig.FORM.FAVORITE.URL),
        })}
      />
    </ModalInner>
  );
};
