import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button/Button.atom";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { Icons } from "@/icons";

type Inputs = {
  nickname: string;
};

export const SettingContents = () => {
  const { register } = useForm<Inputs>();
  return (
    <ContentWrapper>
      <div className="flex gap-3">
        <ContentHead>
          <Icons.Config color="white" />
          <p>Setting</p>
        </ContentHead>
      </div>
      <form className="flex flex-col gap-4 px-6 py-4 rounded-3xl bg-white bg-opacity-90 relative z-0">
        <FormInput
          inputClassName="border-none"
          label="ニックネーム"
          placeholder="ニックネームを入力してください"
          {...register("nickname", { required: true })}
        />
        <div className="flex justify-end gap-4 w-2/3 mr-0 ml-auto">
          <Button
            className="!w-1/3"
            onClick={() => {}}
            type="reset"
            variant="cancel"
          >
            リセット
          </Button>
          <Button
            className="!w-1/3"
            // disabled={apiPending}
            type="submit"
            // variant={apiPending ? "disable" : "primary"}
            variant="primary"
          >
            更新
          </Button>
        </div>{" "}
      </form>
    </ContentWrapper>
  );
};
