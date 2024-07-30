"use client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button/Button.atom";
import { CircleContainer } from "@/components/molecules/CircleContainer/CircleContainer.molecule";
import { colorConfig } from "@/config/color.config";
import { textsConfig } from "@/config/texts.config";
import { usePostUser } from "@/hooks/api/usePostUser.hook";
import { useSignIn } from "@/hooks/useSignIn.hook";
import { useSignUp } from "@/hooks/useSignUp.hook";
import { Icons } from "@/icons";

type Inputs = {
  email: string;
  password: string;
};

const InputClassName =
  "w-[250px] px-3 pt-[4px] pb-[7px] border-2 border-white rounded-md bg-white bg-opacity-50";
const ErrorClassName = "mt-1 px-1 text-red-400 text-[12px] font-bold";

export default function Auth() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");

  const { user, signUp, isEmailSent, isLoading: signUpIsLoading } = useSignUp();
  const { signIn, isLoading: signInIsLoading } = useSignIn();

  const mutate = usePostUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (user) {
      const id = user.id;
      const email = user.email ?? "";
      mutate({ id, email });
    }
  }, [mutate, user]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (mode === "signUp") {
      signUp({
        email: data.email,
        password: data.password,
      });
    } else if (mode === "signIn") {
      signIn({
        email: data.email,
        password: data.password,
      });
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "signIn" ? "signUp" : "signIn"));
  };
  return (
    <div className="flex items-center justify-center">
      <CircleContainer>
        {!isEmailSent ? (
          <form
            className="flex flex-col gap-4 relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            {process.env.NODE_ENV === "development" && (
              <div className="u-centering-x absolute -bottom-24">
                <Button
                  className="p-1 border-2 border-primary rounded-full"
                  onClick={toggleMode}
                >
                  <Icons.ArrowPath
                    className="stroke-2"
                    color={colorConfig.primary}
                  />
                </Button>
              </div>
            )}
            <div className="flex flex-col">
              <div className="flex flex-col">
                <p className="px-1 text-[12px]">メールアドレス</p>
                <input
                  className={InputClassName}
                  disabled={signUpIsLoading || signInIsLoading}
                  {...register("email", { required: true })}
                  placeholder="tzp@holograme.app"
                  type="email"
                />
              </div>
              {errors.email && (
                <p className={ErrorClassName}>メールアドレスは必須です</p>
              )}
            </div>
            <div className="flex flex-col">
              <p className="px-1 text-[12px]">パスワード</p>
              <input
                className={InputClassName}
                disabled={signUpIsLoading || signInIsLoading}
                {...register("password", { required: true })}
                placeholder="password1234$"
                type="password"
              />
              {errors.password && (
                <p className={ErrorClassName}>パスワードは必須です</p>
              )}
            </div>
            <div className="u-centering-x absolute -bottom-12">
              <Button
                className="mx-auto"
                disabled={signUpIsLoading || signInIsLoading}
                type="submit"
                variant={
                  signUpIsLoading || signInIsLoading ? "disable" : "primary"
                }
              >
                {mode === "signIn" ? "ログイン" : "新規登録"}
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <p>{textsConfig.AUTH.EMAIL_SENT}</p>
          </div>
        )}
      </CircleContainer>
    </div>
  );
}
