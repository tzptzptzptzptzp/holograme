import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { FormInput } from "@/components/forms/FormInput/FormInput.form";
import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { textsConfig } from "@/config/texts.config";
import { useGetUser } from "@/hooks/api/useGetUser.hook";
import { usePutUser } from "@/hooks/api/usePutUser.hook";
import { Icons } from "@/icons";
import { UserState } from "@/recoil/atoms.recoil";

type Inputs = {
  email: string;
  location: string;
  nickname: string;
  username: string;
};

export const SettingContents = () => {
  const [apiPending, setApiPending] = useState(false);

  const user = useRecoilValue(UserState);

  const { register, handleSubmit, setValue } = useForm<Inputs>();

  const { refetch } = useGetUser();

  const mutate = usePutUser();

  useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("location", user.location);
      setValue("nickname", user.nickname);
      setValue("username", user.username);
    }
  }, [user, setValue]);

  const handleReset = () => {
    if (user) {
      setValue("email", user.email);
      setValue("location", user.location);
      setValue("nickname", user.nickname);
      setValue("username", user.username);
    }
  };

  const onSubmit = (data: Inputs) => {
    setApiPending(true);
    mutate(
      {
        location: data.location,
        nickname: data.nickname,
        username: data.username,
      },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.USER_UPDATE.SUCCESS);
          setApiPending(false);
          refetch();
        },
      }
    );
  };
  return (
    <ContentWrapper>
      <div className="flex gap-3">
        <ContentHead>
          <Icons.Config color="white" />
          <p>Setting</p>
        </ContentHead>
      </div>
      <form
        className="flex flex-col gap-4 px-6 py-4 rounded-3xl bg-white bg-opacity-90 relative z-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          inputClassName="border-none"
          label="ユーザー名"
          placeholder="ユーザー名を入力してください"
          {...register("username", { required: true })}
        />
        <FormInput
          inputClassName="border-none"
          label="呼ばれたい名前・ニックネーム"
          placeholder="呼ばれ方を入力してください"
          {...register("nickname", { required: true })}
        />
        <FormInput
          inputClassName="border-none"
          label="居住地（天気を聞いた時などに使用されます）"
          placeholder="居住地を入力してください"
          {...register("location", { required: true })}
        />
        <FormInput
          disabled
          inputClassName="border-none"
          label="メールアドレス"
          placeholder="メールアドレスを入力してください"
          {...register("email", { required: true })}
        />
        <div className="flex justify-end gap-4 w-2/3 mr-0 ml-auto">
          <Button className="!w-1/3" onClick={handleReset} variant="cancel">
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
        </div>
      </form>
    </ContentWrapper>
  );
};
