import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useGetFavorite } from "@/hooks/api/useGetFavorite.hook";
import { usePostFavorite } from "@/hooks/api/usePostFavorite.hook";
import { useModal } from "@/hooks/useModal.hook";
import { CreateFavoriteState } from "@/recoil/atoms.recoil";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";

type Inputs = {
  title: string;
  url: string;
};

export const CreateFavoriteModal = () => {
  const isFirstRender = useRef(true);
  const [apiPending, setApiPending] = useState(false);

  const [createFavorite, setCreateFavorite] =
    useRecoilState(CreateFavoriteState);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { handleClose, handleOpen } = useModal();

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
    setCreateFavorite((prev) => ({
      ...prev,
      title: title,
      url: url,
    }));
  }, [title, url, setCreateFavorite]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (apiPending) return;
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
        onSuccess: () => {
          toast(textsConfig.TOAST.FAVORITE_CREATE.SUCCESS);
          refetch();
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
          className="absolute right-2 text-[22px]"
          onClick={() => handleOpen("emojiSelect")}
        >
          {createFavorite.emojiNative}
        </Button>
      </div>
      <FormInput
        label={textsConfig.FORM.FAVORITE.URL}
        errorMessage={errors.url?.message}
        placeholder={`${textsConfig.FORM.FAVORITE.URL}を入力`}
        {...register("url", {
          required: GetRequiredMessage(textsConfig.FORM.FAVORITE.URL),
        })}
      />
    </ModalInner>
  );
};
