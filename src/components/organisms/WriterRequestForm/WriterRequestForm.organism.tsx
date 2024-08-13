import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Writer } from "@prisma/client";
import { Border } from "@/components/atoms/Border/Border.atom";
import { Button } from "@/components/atoms/Button/Button.atom";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { FormTextarea } from "@/components/forms/FormTextarea/FormTextarea.form";
import { FormSelect } from "@/components/forms/FormSelect/FormSelect.form";
import { textsConfig } from "@/config/texts.config";
import { usePostBlogPost } from "@/hooks/api/usePostBlogPost.hook";
import { useModal } from "@/hooks/useModal.hook";
import { Icons } from "@/icons";
import { GenerateWriterPrompt } from "@/utils/GenerateWriterPrompt.util";
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";

const inputClassName = "w-full min-w-0 border-none";
const wrapperClassName = "w-full";

const noData = "なし";

type Props = {
  writer: Writer;
};

type Inputs = {
  title: string;
  summary: string;
  wordCount: number;
  keywords: string;
  structureAndHeadings: string;
  productInfo?: string;
  productUrl?: string;
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
  const [apiPending, setApiPending] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const productInfo = watch("productInfo");
  const productUrl = watch("productUrl");
  const revenueArticleTitle = watch("revenueArticleTitle");
  const revenueArticleUrl = watch("revenueArticleUrl");
  const revenueArticleSummary = watch("revenueArticleSummary");

  const { handleOpen } = useModal();

  const mutate = usePostBlogPost();

  useEffect(() => {
    setValue("expertise", writer.expertise);
    setValue("targetAudience", writer.targetAudience);
    setValue("siteGenre", writer.siteGenre);
    setValue("sitePurpose", writer.sitePurpose);
    setValue("toneAndStyle", writer.toneAndStyle);
  }, [setValue, writer]);

  const onSubmit = (data: Inputs) => {
    if (apiPending) return;
    setApiPending(true);
    const prompt = GenerateWriterPrompt({
      ...data,
      productInfo: data.productInfo || noData,
      productUrl: data.productUrl || noData,
      revenueArticleTitle: data.revenueArticleTitle || noData,
      revenueArticleUrl: data.revenueArticleUrl || noData,
      revenueArticleSummary: data.revenueArticleSummary || noData,
      referenceUrls: data.referenceUrls || noData,
    });
    mutate(
      { title: data.title, id: writer.id, prompt },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.BLOG_POST_CREATE.SUCCESS);
        },
        onError: () => {
          toast.error(textsConfig.TOAST.BLOG_POST_CREATE.ERROR);
        },
        onSettled: () => {
          setApiPending(false);
        },
      }
    );
  };
  return (
    <form
      className="flex flex-col gap-2 h-auto min-h-0 px-6 py-4 rounded-3xl bg-white bg-opacity-90 relative z-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[18px]">{textsConfig.FORM.WRITER_REQUEST.TITLE}</h2>
        <Button
          className="!w-fit hover:opacity-70"
          hover={false}
          type="submit"
          variant="secondary"
        >
          記事を書く
        </Button>
      </div>
      <div className="overflow-y-scroll h-auto">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p>{textsConfig.FORM.WRITER_REQUEST.SECTIONS[0]}</p>
            <div className="flex gap-4">
              <FormInput
                inputClassName={inputClassName}
                wrapperClassName={wrapperClassName}
                label={textsConfig.FORM.WRITER_REQUEST.INPUTS.TITLE}
                errorMessage={errors.title?.message}
                placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.TITLE}を入力`}
                required
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
                errorMessage={errors.wordCount?.message}
                placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.WORD_COUNT}を入力`}
                required
                {...register("wordCount", {
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
              required
              {...register("summary", {
                required: GetRequiredMessage(
                  textsConfig.FORM.WRITER_REQUEST.INPUTS.SUMMARY
                ),
              })}
            />
            <Border />
            <p>{textsConfig.FORM.WRITER_REQUEST.SECTIONS[1]}</p>
            <FormInput
              inputClassName={inputClassName}
              wrapperClassName={wrapperClassName}
              label={textsConfig.FORM.WRITER_REQUEST.INPUTS.KEYWORDS}
              errorMessage={errors.keywords?.message}
              placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.KEYWORDS}を入力`}
              required
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
              required
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
                required={productInfo || productUrl ? true : false}
                {...register("productInfo", {
                  required:
                    productInfo || productUrl
                      ? GetRequiredMessage(
                          textsConfig.FORM.WRITER_REQUEST.INPUTS.PRODUCT_INFO
                        )
                      : false,
                })}
              />
              <FormInput
                inputClassName={inputClassName}
                wrapperClassName={wrapperClassName}
                label={textsConfig.FORM.WRITER_REQUEST.INPUTS.PRODUCT_URL}
                errorMessage={errors.productUrl?.message}
                placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.PRODUCT_URL}を入力`}
                required={productInfo || productUrl ? true : false}
                {...register("productUrl", {
                  required:
                    productInfo || productUrl
                      ? GetRequiredMessage(
                          textsConfig.FORM.WRITER_REQUEST.INPUTS.PRODUCT_URL
                        )
                      : false,
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
                required={
                  revenueArticleTitle ||
                  revenueArticleUrl ||
                  revenueArticleSummary
                    ? true
                    : false
                }
                {...register("revenueArticleTitle", {
                  required:
                    revenueArticleTitle ||
                    revenueArticleUrl ||
                    revenueArticleSummary
                      ? GetRequiredMessage(
                          textsConfig.FORM.WRITER_REQUEST.INPUTS
                            .REVENUE_ARTICLE_TITLE
                        )
                      : false,
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
                required={
                  revenueArticleTitle ||
                  revenueArticleUrl ||
                  revenueArticleSummary
                    ? true
                    : false
                }
                {...register("revenueArticleUrl", {
                  required:
                    revenueArticleTitle ||
                    revenueArticleUrl ||
                    revenueArticleSummary
                      ? GetRequiredMessage(
                          textsConfig.FORM.WRITER_REQUEST.INPUTS
                            .REVENUE_ARTICLE_URL
                        )
                      : false,
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
              required={
                revenueArticleTitle ||
                revenueArticleUrl ||
                revenueArticleSummary
                  ? true
                  : false
              }
              {...register("revenueArticleSummary", {
                required:
                  revenueArticleTitle ||
                  revenueArticleUrl ||
                  revenueArticleSummary
                    ? GetRequiredMessage(
                        textsConfig.FORM.WRITER_REQUEST.INPUTS
                          .REVENUE_ARTICLE_SUMMARY
                      )
                    : false,
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
                required
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
                {...register("referenceUrls")}
              />
            </div>
            <Border />
            <div className="flex justify-between">
              <p>{textsConfig.FORM.WRITER_REQUEST.SECTIONS[2]}</p>
              <div className="flex gap-1">
                <p>{writer.name}</p>
                <Button onClick={() => handleOpen("editWriter")}>
                  <Icons.Config />
                </Button>
              </div>
            </div>
            <div className="flex gap-4">
              <FormInput
                disabled
                inputClassName={inputClassName}
                wrapperClassName={wrapperClassName}
                label={textsConfig.FORM.WRITER_REQUEST.INPUTS.EXPERTISE}
                errorMessage={errors.expertise?.message}
                placeholder={`${textsConfig.FORM.WRITER_REQUEST.INPUTS.EXPERTISE}を入力`}
                required
                value={writer.expertise}
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
                required
                value={writer.targetAudience}
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
                required
                value={writer.siteGenre}
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
                required
                value={writer.sitePurpose}
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
                required
                value={writer.toneAndStyle}
                {...register("toneAndStyle", {
                  required: GetRequiredMessage(
                    textsConfig.FORM.WRITER_REQUEST.INPUTS.TONE_AND_STYLE
                  ),
                })}
              />
              <div className="w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
