import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { ModalInner } from "@/components/templates/ModalInner/ModalInner.template";
import { textsConfig } from "@/config/texts.config";
import { usePostWriter } from "@/hooks/api/usePostWriter.hook";
import { useModal } from "@/hooks/useModal.hook";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";

type Inputs = {
  name: string;
  expertise: string;
  targetAudience: string;
  sitePurpose: string;
  siteGenre: string;
  toneAndStyle: string;
};

export const CreateWriterModal = () => {
  const [apiPending, setApiPending] = useState(false);

  const mutate = usePostWriter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { handleClose } = useModal();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (apiPending) return;
    setApiPending(true);
    mutate(
      {
        name: data.name,
        expertise: data.expertise,
        targetAudience: data.targetAudience,
        sitePurpose: data.sitePurpose,
        siteGenre: data.siteGenre,
        toneAndStyle: data.toneAndStyle,
      },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.WRITER_CREATE.SUCCESS);
          setApiPending(false);
          handleClose();
        },
        onError: () => {
          toast.error(textsConfig.TOAST.WRITER_CREATE.ERROR);
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
      title={textsConfig.FORM.WRITER.TITLE.CREATE}
    >
      <FormInput
        label={textsConfig.FORM.WRITER.NAME}
        errorMessage={errors.name?.message}
        placeholder={`${textsConfig.FORM.WRITER.NAME}を入力`}
        {...register("name", {
          required: GetRequiredMessage(textsConfig.FORM.WRITER.NAME),
        })}
      />
      <FormInput
        label={textsConfig.FORM.WRITER.EXPERTISE}
        errorMessage={errors.expertise?.message}
        placeholder={`${textsConfig.FORM.WRITER.EXPERTISE}を入力`}
        {...register("expertise", {
          required: GetRequiredMessage(textsConfig.FORM.WRITER.EXPERTISE),
        })}
      />
      <FormInput
        label={textsConfig.FORM.WRITER.TARGET_AUDIENCE}
        errorMessage={errors.targetAudience?.message}
        placeholder={`${textsConfig.FORM.WRITER.TARGET_AUDIENCE}を入力`}
        {...register("targetAudience", {
          required: GetRequiredMessage(textsConfig.FORM.WRITER.TARGET_AUDIENCE),
        })}
      />
      <FormInput
        label={textsConfig.FORM.WRITER.SIRE_GENRE}
        errorMessage={errors.siteGenre?.message}
        placeholder={`${textsConfig.FORM.WRITER.SIRE_GENRE}を入力`}
        {...register("siteGenre", {
          required: GetRequiredMessage(textsConfig.FORM.WRITER.SIRE_GENRE),
        })}
      />
      <FormInput
        label={textsConfig.FORM.WRITER.SITE_PURPOSE}
        errorMessage={errors.sitePurpose?.message}
        placeholder={`${textsConfig.FORM.WRITER.SITE_PURPOSE}を入力`}
        {...register("sitePurpose", {
          required: GetRequiredMessage(textsConfig.FORM.WRITER.SITE_PURPOSE),
        })}
      />
      <FormInput
        label={textsConfig.FORM.WRITER.TONE_AND_STYLE}
        errorMessage={errors.toneAndStyle?.message}
        placeholder={`${textsConfig.FORM.WRITER.TONE_AND_STYLE}を入力`}
        {...register("toneAndStyle", {
          required: GetRequiredMessage(textsConfig.FORM.WRITER.TONE_AND_STYLE),
        })}
      />
    </ModalInner>
  );
};
