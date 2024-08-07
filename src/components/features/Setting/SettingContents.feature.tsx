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
import { GetRequiredMessage } from "@/utils/GetRequiredMessage.util";

type Inputs = {
  email: string;
  location: string;
  nickname: string;
  username: string;
};

export const SettingContents = () => {
  const [apiPending, setApiPending] = useState(false);

  const user = useRecoilValue(UserState);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

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
          label={textsConfig.FORM.SETTING.USERNAME}
          errorMessage={errors.username?.message}
          placeholder={`${textsConfig.FORM.SETTING.USERNAME}を入力`}
          {...register("username", {
            required: GetRequiredMessage(textsConfig.FORM.SETTING.USERNAME),
          })}
        />
        <FormInput
          inputClassName="border-none"
          label={textsConfig.FORM.SETTING.NICKNAME}
          errorMessage={errors.nickname?.message}
          placeholder={`${textsConfig.FORM.SETTING.NICKNAME}を入力`}
          {...register("nickname", {
            required: GetRequiredMessage(textsConfig.FORM.SETTING.NICKNAME),
          })}
        />
        <FormInput
          inputClassName="border-none"
          label={textsConfig.FORM.SETTING.LOCATION}
          errorMessage={errors.location?.message}
          placeholder={`${textsConfig.FORM.SETTING.LOCATION}を入力`}
          {...register("location", {
            required: GetRequiredMessage(textsConfig.FORM.SETTING.LOCATION),
          })}
        />
        <FormInput
          disabled
          inputClassName="border-none"
          label={textsConfig.FORM.SETTING.EMAIL}
          errorMessage={errors.email?.message}
          placeholder={`${textsConfig.FORM.SETTING.EMAIL}を入力`}
          {...register("email", {
            required: GetRequiredMessage(textsConfig.FORM.SETTING.EMAIL),
          })}
        />
        <div className="flex justify-end s:justify-between gap-4 w-2/3 s:w-full mr-0 ml-auto">
          <Button
            className="!w-1/3 s:!w-1/2"
            onClick={handleReset}
            variant="cancel"
          >
            リセット
          </Button>
          <Button
            className="!w-1/3 s:!w-1/2"
            disabled={apiPending}
            type="submit"
            variant={apiPending ? "disable" : "primary"}
          >
            更新
          </Button>
        </div>
      </form>
    </ContentWrapper>
  );
};
