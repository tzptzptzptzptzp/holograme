import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@/components/atoms/Button/Button.atom";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { useModal } from "@/hooks/useModal.hook";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";

type Inputs = {
  title: string;
  url: string;
};

export const CreateFavoriteModal = () => {
  const [apiPending, setApiPending] = useState(false);

  // const mutate = usePost();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { handleClose, handleOpen } = useModal();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setApiPending(true);
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
          🦄
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
