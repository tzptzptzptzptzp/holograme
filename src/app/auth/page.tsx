"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button/Button.atom";
import { CircleContainer } from "@/components/molecules/CircleContainer/CircleContainer.molecule";
import { useSignIn } from "@/hooks/useSignIn.util";

type Inputs = {
  email: string;
  password: string;
};

const InputClassName =
  "w-[250px] px-3 pt-[4px] pb-[7px] border-2 border-white rounded-md bg-white bg-opacity-50";
const ErrorClassName = "mt-1 px-1 text-red-400 text-[12px] font-bold";

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { signIn, isLoading } = useSignIn();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn({
      email: data.email,
      password: data.password,
    });
    console.log(data);
  };
  return (
    <div className="flex items-center justify-center">
      <CircleContainer>
        <form
          className="flex flex-col gap-4 relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <div className="flex flex-col">
              <p className="px-1 text-[12px]">メールアドレス</p>
              <input
                className={InputClassName}
                disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
              type="submit"
              variant={isLoading ? "disable" : "primary"}
            >
              ログイン
            </Button>
          </div>
        </form>
      </CircleContainer>
    </div>
  );
}
