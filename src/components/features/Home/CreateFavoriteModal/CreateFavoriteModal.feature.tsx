import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useGetFavorite } from "@/hooks/api/useGetFavorite.hook";
import { usePostFavorite } from "@/hooks/api/usePostFavorite.hook";
import { useCreateFavorite } from "@/hooks/useCreateFavorite.hook";
import { useFavorites } from "@/hooks/useFavorites.hook";
import { useModal } from "@/hooks/useModal.hook";
import { FavoriteModeState } from "@/recoil/atoms.recoil";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";

type Inputs = {
  title: string;
  url: string;
};

export const CreateFavoriteModal = () => {
  const isFirstRender = useRef(true);
  const [apiPending, setApiPending] = useState(false);
  const [urlError, setUrlError] = useState("");

  const { favorites, setFavorites } = useFavorites();
  const { createFavorite, setCreateFavorite, updateCreateFavorite } = useCreateFavorite();
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

  const mutate = usePostFavorite();

  const title = watch("title");
  const url = watch("url");

  useEffect(() => {
    if (isFirstRender.current) {
      setValue("title", createFavorite.title);
      setValue("url", createFavorite.url);
      isFirstRender.current = false;
    }
  }, [createFavorite, setValue]);

  useEffect(() => {
    if (!url) return;
    url.startsWith("http")
      ? setUrlError("")
      : setUrlError("👾 URLはhttpから始まる必要があるよ");
  }, [url]);

  const handleOpen = () => {
    setFavoriteMode("create");
    updateCreateFavorite({
      title: title,
      url: url,
    });
    onOpen("emojiSelect", true);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (apiPending || !data.url.startsWith("http")) return;
    setApiPending(true);
    mutate(
      {
        title: data.title,
        url: data.url,
        emojiId: createFavorite.emojiId,
        emojiNative: createFavorite.emojiNative,
        emojiUnified: createFavorite.emojiUnified,
      },
      {
        onSuccess: async () => {
          toast(textsConfig.TOAST.FAVORITE_CREATE.SUCCESS);
          const { data } = await refetch();
          setFavorites(data ?? favorites);
          handleClose();
        },
        onError: () => {
          toast.error(textsConfig.TOAST.FAVORITE_CREATE.ERROR);
        },
        onSettled: () => {
          setApiPending(false);
          setCreateFavorite({
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
      form
      onSubmit={handleSubmit(onSubmit)}
      title={textsConfig.FORM.FAVORITE.TITLE.CREATE}
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
          {createFavorite.emojiNative}
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
