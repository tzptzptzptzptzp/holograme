"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button/Button.atom";
import { Input } from "@/components/atoms/Input/Input.atom";
import { colorConfig } from "@/config/color.config";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";
import { usePostChatMessage } from "@/hooks/api/usePostChatMessage.hook";
import { useSendMessage } from "@/hooks/useSendMessage.hook";
import { Icons } from "@/icons";
import { GeneratePrompt } from "@/utils/GeneratePrompt.util";

type Inputs = {
  message: string;
};

export const MessageForm = ({ roomId }: { roomId: number }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { sendMessage } = useSendMessage();

  const { mutate } = usePostChatMessage();
  const { data: chatMessage, refetch } = useGetChatMessage(roomId);

  const { register, reset, setFocus, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    setFocus("message");
  }, [setFocus]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    const { message } = data;
    sendMessage(message);
    const prompt = GeneratePrompt({
      message,
      chatMessage,
    });
    mutate(
      { content: message, id: roomId, prompt },
      {
        onSuccess: () => {
          reset();
          refetch();
          setIsLoading(false);
        },
      }
    );
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        "flex gap-[6px] w-full pl-4 pr-3 py-2 rounded-full",
        isLoading ? "bg-disableBackground" : "bg-white"
      )}
    >
      <Input
        className="flex-1 w-full"
        disabled={isLoading}
        placeholder={"🎉 聞きたいことを入力してね！何を聞く？"}
        {...register("message")}
      />
      <Button className="w-fit" type="submit">
        <Icons.AirPlane
          color={isLoading ? colorConfig.disableText : colorConfig.text}
        />
      </Button>
    </form>
  );
};
