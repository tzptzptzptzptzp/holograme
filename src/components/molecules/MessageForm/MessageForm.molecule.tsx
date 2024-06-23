"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button/Button.atom";
import { Textarea } from "@/components/atoms/Textarea/Textarea.atom";
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { sendMessage } = useSendMessage();

  const { mutate } = usePostChatMessage();
  const { data: chatMessage, refetch } = useGetChatMessage(roomId);

  const { control, handleSubmit, reset, setFocus, setValue } =
    useForm<Inputs>();

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
          setValue("message", "");
          refetch();
          setIsLoading(false);
        },
      }
    );
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.key === "Enter" && e.metaKey) || (e.key === "Enter" && e.ctrlKey)) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        "flex gap-[6px] w-full pl-4 pr-3 py-2 rounded-3xl",
        isLoading ? "bg-disableBackground" : "bg-white"
      )}
    >
      <Controller
        control={control}
        name="message"
        render={({ field: { onBlur, onChange, value } }) => (
          <Textarea
            className="flex-1 w-full bg-transparent"
            disabled={isLoading}
            onBlur={onBlur}
            onChange={onChange}
            onInput={adjustHeight}
            onKeyDown={handleKeyPress}
            placeholder={"🎉 聞きたいことを入力してね！何を聞く？"}
            ref={textareaRef}
            rows={1}
            value={value}
          />
        )}
      />
      <Button className="w-fit" type="submit">
        <Icons.AirPlane
          color={isLoading ? colorConfig.disableText : colorConfig.text}
        />
      </Button>
    </form>
  );
};
