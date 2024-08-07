import { useForm } from "react-hook-form";
import { Writer } from "@prisma/client";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { textsConfig } from "@/config/texts.config";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";

const inputClassName = "w-full min-w-0 border-none";
const wrapperClassName = "w-full";

type Props = {
  writer: Writer;
};

type Inputs = {
  title: string;
  summary: string;
  word_count: number;
  keywords: string;
  structureAndHeadings: string;
  productInfo: string;
  productUrl: string;
  articleRole: string;
  revenueArticleTitle?: string;
  revenueArticleUrl?: string;
  revenueArticleSummary?: string;
  referenceUrls?: string;
  expertise: string;
  targetAudience: string;
  sitePurpose: string;
  siteGenre: string;
  toneAndStyle: string;
};

export const WriterRequestForm = ({ writer }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  return (
    <div className="flex flex-col gap-4 px-6 py-4 rounded-3xl bg-white bg-opacity-90 relative z-0">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px]">{textsConfig.FORM.WRITER_REQUEST.TITLE}</h2>
        <p>{writer.name}</p>
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p>{textsConfig.FORM.WRITER_REQUEST.SECTIONS[2]}</p>
          <div className="flex gap-4">
            <FormInput
              disabled
              inputClassName={inputClassName}
              wrapperClassName={wrapperClassName}
              label={textsConfig.FORM.WRITER_REQUEST.INPUTS.EXPERTISE}
              errorMessage={errors.expertise?.message}
              placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.EXPERTISE}を入力`}
              {...register("expertise", {
                required: GetRequiredMessage(
                  textsConfig.FORM.WRITER_REQUEST.INPUTS.EXPERTISE
                ),
              })}
            />
            <FormInput
              disabled
              inputClassName={inputClassName}
              wrapperClassName={wrapperClassName}
              label={textsConfig.FORM.WRITER_REQUEST.INPUTS.TARGET_AUDIENCE}
              errorMessage={errors.targetAudience?.message}
              placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.TARGET_AUDIENCE}を入力`}
              {...register("targetAudience", {
                required: GetRequiredMessage(
                  textsConfig.FORM.WRITER_REQUEST.INPUTS.TARGET_AUDIENCE
                ),
              })}
            />
          </div>
          <div className="flex gap-4">
            <FormInput
              disabled
              inputClassName={inputClassName}
              wrapperClassName={wrapperClassName}
              label={textsConfig.FORM.WRITER_REQUEST.INPUTS.SITE_GENRE}
              errorMessage={errors.siteGenre?.message}
              placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.SITE_GENRE}を入力`}
              {...register("siteGenre", {
                required: GetRequiredMessage(
                  textsConfig.FORM.WRITER_REQUEST.INPUTS.SITE_GENRE
                ),
              })}
            />
            <FormInput
              disabled
              inputClassName={inputClassName}
              wrapperClassName={wrapperClassName}
              label={textsConfig.FORM.WRITER_REQUEST.INPUTS.SITE_PURPOSE}
              errorMessage={errors.sitePurpose?.message}
              placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.SITE_PURPOSE}を入力`}
              {...register("sitePurpose", {
                required: GetRequiredMessage(
                  textsConfig.FORM.WRITER_REQUEST.INPUTS.SITE_PURPOSE
                ),
              })}
            />
          </div>
          <div className="flex gap-4">
            <FormInput
              disabled
              inputClassName={inputClassName}
              wrapperClassName={wrapperClassName}
              label={textsConfig.FORM.WRITER_REQUEST.INPUTS.TONE_AND_STYLE}
              errorMessage={errors.toneAndStyle?.message}
              placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.TONE_AND_STYLE}を入力`}
              {...register("toneAndStyle", {
                required: GetRequiredMessage(
                  textsConfig.FORM.WRITER_REQUEST.INPUTS.TONE_AND_STYLE
                ),
              })}
            />
            <div className="w-full"></div>
          </div>
        </div>
      </form>
    </div>
  );
};
