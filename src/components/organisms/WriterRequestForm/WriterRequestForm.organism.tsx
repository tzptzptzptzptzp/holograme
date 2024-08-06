import { useForm } from "react-hook-form";
import { Writer } from "@prisma/client";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";

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
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  return (
    <div className="flex flex-col gap-4 px-6 py-4 rounded-3xl bg-white bg-opacity-90 relative z-0">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px]">どんな記事を書く？</h2>
        <p>{writer.name}</p>
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p>サイト情報</p>
          <div className="flex gap-4">
            <FormInput
              inputClassName={inputClassName}
              label="対象読者"
              placeholder="対象読者を入力してください"
              wrapperClassName={wrapperClassName}
              {...register("expertise", { required: true })}
            />
            <FormInput
              inputClassName={inputClassName}
              label="専門性"
              placeholder="専門性を入力してください"
              wrapperClassName={wrapperClassName}
              {...register("targetAudience", { required: true })}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
