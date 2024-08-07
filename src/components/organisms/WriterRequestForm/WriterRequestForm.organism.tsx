import { useForm } from "react-hook-form";
import { Writer } from "@prisma/client";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { FormTextarea } from "@/components/forms/FormTextarea/FormTextarea.form";
import { FormSelect } from "@/components/forms/FormSelect/FormSelect.form";
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
    <div className="flex flex-col gap-2 h-auto min-h-0 px-6 py-4 rounded-3xl bg-white bg-opacity-90 relative z-0">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px]">{textsConfig.FORM.WRITER_REQUEST.TITLE}</h2>
        <p>{writer.name}</p>
      </div>
      <div className="overflow-y-scroll h-auto">
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p>{textsConfig.FORM.WRITER_REQUEST.SECTIONS[0]}</p>
            <div className="flex gap-4">
              <FormInput
                inputClassName={inputClassName}
                wrapperClassName={wrapperClassName}
                label={textsConfig.FORM.WRITER_REQUEST.INPUTS.TITLE}
                errorMessage={errors.title?.message}
                placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.TITLE}を入力`}
                {...register("title", {
                  required: GetRequiredMessage(
                    textsConfig.FORM.WRITER_REQUEST.INPUTS.TITLE
                  ),
                })}
              />
              <FormInput
                inputClassName={inputClassName}
                wrapperClassName={wrapperClassName}
                label={textsConfig.FORM.WRITER_REQUEST.INPUTS.WORD_COUNT}
                errorMessage={errors.word_count?.message}
                placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.WORD_COUNT}を入力`}
                {...register("word_count", {
                  required: GetRequiredMessage(
                    textsConfig.FORM.WRITER_REQUEST.INPUTS.WORD_COUNT
                  ),
                })}
              />
            </div>
            <FormInput
              inputClassName={inputClassName}
              wrapperClassName={wrapperClassName}
              label={textsConfig.FORM.WRITER_REQUEST.INPUTS.SUMMARY}
              errorMessage={errors.summary?.message}
              placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.SUMMARY}を入力`}
              {...register("summary", {
                required: GetRequiredMessage(
                  textsConfig.FORM.WRITER_REQUEST.INPUTS.SUMMARY
                ),
              })}
            />
            <p>{textsConfig.FORM.WRITER_REQUEST.SECTIONS[1]}</p>
            <FormInput
              inputClassName={inputClassName}
              wrapperClassName={wrapperClassName}
              label={textsConfig.FORM.WRITER_REQUEST.INPUTS.KEYWORDS}
              errorMessage={errors.keywords?.message}
              placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.KEYWORDS}を入力`}
              {...register("keywords", {
                required: GetRequiredMessage(
                  textsConfig.FORM.WRITER_REQUEST.INPUTS.KEYWORDS
                ),
              })}
            />
            <FormTextarea
              textareaClassName={inputClassName}
              wrapperClassName={wrapperClassName}
              label={
                textsConfig.FORM.WRITER_REQUEST.INPUTS.STRUCTURE_AND_HEADINGS
              }
              errorMessage={errors.structureAndHeadings?.message}
              placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.STRUCTURE_AND_HEADINGS}を入力`}
              {...register("structureAndHeadings", {
                required: GetRequiredMessage(
                  textsConfig.FORM.WRITER_REQUEST.INPUTS.STRUCTURE_AND_HEADINGS
                ),
              })}
            />
            <div className="flex gap-4">
              <FormInput
                inputClassName={inputClassName}
                wrapperClassName={wrapperClassName}
                label={textsConfig.FORM.WRITER_REQUEST.INPUTS.PRODUCT_INFO}
                errorMessage={errors.productInfo?.message}
                placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.PRODUCT_INFO}を入力`}
                {...register("productInfo", {
                  required: GetRequiredMessage(
                    textsConfig.FORM.WRITER_REQUEST.INPUTS.PRODUCT_INFO
                  ),
                })}
              />
              <FormInput
                inputClassName={inputClassName}
                wrapperClassName={wrapperClassName}
                label={textsConfig.FORM.WRITER_REQUEST.INPUTS.PRODUCT_URL}
                errorMessage={errors.productUrl?.message}
                placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.PRODUCT_URL}を入力`}
                {...register("productUrl", {
                  required: GetRequiredMessage(
                    textsConfig.FORM.WRITER_REQUEST.INPUTS.PRODUCT_URL
                  ),
                })}
              />
            </div>
            <div className="flex gap-4">
              <FormInput
                inputClassName={inputClassName}
                wrapperClassName={wrapperClassName}
                label={
                  textsConfig.FORM.WRITER_REQUEST.INPUTS.REVENUE_ARTICLE_TITLE
                }
                errorMessage={errors.revenueArticleTitle?.message}
                placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.REVENUE_ARTICLE_TITLE}を入力`}
                {...register("revenueArticleTitle", {
                  required: GetRequiredMessage(
                    textsConfig.FORM.WRITER_REQUEST.INPUTS.REVENUE_ARTICLE_TITLE
                  ),
                })}
              />
              <FormInput
                inputClassName={inputClassName}
                wrapperClassName={wrapperClassName}
                label={
                  textsConfig.FORM.WRITER_REQUEST.INPUTS.REVENUE_ARTICLE_URL
                }
                errorMessage={errors.revenueArticleUrl?.message}
                placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.REVENUE_ARTICLE_URL}を入力`}
                {...register("revenueArticleUrl", {
                  required: GetRequiredMessage(
                    textsConfig.FORM.WRITER_REQUEST.INPUTS.REVENUE_ARTICLE_URL
                  ),
                })}
              />
            </div>
            <FormInput
              inputClassName={inputClassName}
              wrapperClassName={wrapperClassName}
              label={
                textsConfig.FORM.WRITER_REQUEST.INPUTS.REVENUE_ARTICLE_SUMMARY
              }
              errorMessage={errors.revenueArticleSummary?.message}
              placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.REVENUE_ARTICLE_SUMMARY}を入力`}
              {...register("revenueArticleSummary", {
                required: GetRequiredMessage(
                  textsConfig.FORM.WRITER_REQUEST.INPUTS.REVENUE_ARTICLE_SUMMARY
                ),
              })}
            />
            <div className="flex gap-4">
              <FormSelect
                selectClassName={inputClassName}
                wrapperClassName={wrapperClassName}
                label={textsConfig.FORM.WRITER_REQUEST.INPUTS.ARTICLE_ROLE}
                errorMessage={errors.articleRole?.message}
                options={
                  textsConfig.FORM.WRITER_REQUEST.SELECT_OPTIONS.ARTICLE_ROLE
                }
                placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.ARTICLE_ROLE}を入力`}
                {...register("articleRole", {
                  required: GetRequiredMessage(
                    textsConfig.FORM.WRITER_REQUEST.INPUTS.ARTICLE_ROLE
                  ),
                })}
              />
              <FormInput
                inputClassName={inputClassName}
                wrapperClassName={wrapperClassName}
                label={textsConfig.FORM.WRITER_REQUEST.INPUTS.REFERENCE_URLS}
                errorMessage={errors.referenceUrls?.message}
                placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.REFERENCE_URLS}を入力`}
                {...register("referenceUrls", {
                  required: GetRequiredMessage(
                    textsConfig.FORM.WRITER_REQUEST.INPUTS.REFERENCE_URLS
                  ),
                })}
              />
            </div>
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
    </div>
  );
};
