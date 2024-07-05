"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { Textarea } from "@/components/atoms/Textarea/Textarea.atom";
import { colorConfig } from "@/config/color.config";
import { textsConfig } from "@/config/texts.config";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";
import { usePostChatMessage } from "@/hooks/api/usePostChatMessage.hook";
import { useSendMessage } from "@/hooks/useSendMessage.hook";
import { Icons } from "@/icons";
import {
  ChatMessagesState,
  ChatRoomState,
  UserState,
} from "@/recoil/atoms.recoil";
import { GeneratePrompt } from "@/utils/GeneratePrompt.util";

type Inputs = {
  message: string;
};

export const MessageForm = ({ roomId }: { roomId: number }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [apiPending, setApiPending] = useState(false);

  const user = useRecoilValue(UserState);
  const chatRoom = useRecoilValue(ChatRoomState);
  const chatMessages = useRecoilValue(ChatMessagesState);

  const { sendMessage } = useSendMessage();

  const { mutate } = usePostChatMessage();
  const { refetch } = useGetChatMessage(roomId);

  const { control, handleSubmit, reset, setFocus, setValue } =
    useForm<Inputs>();

  useEffect(() => {
    setFocus("message");
    textareaRef.current?.focus();
    setValue("message", chatRoom?.defaultMessage || "");
  }, [chatRoom, setFocus, setValue]);

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
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!user || !chatRoom) return;
    setApiPending(true);
    const { message } = data;
    sendMessage(message);
    const prompt = GeneratePrompt({
      user,
      message,
      description: chatRoom.description,
      chatMessage: chatMessages,
    });
    mutate(
      { content: message, id: roomId, prompt },
      {
        onError: () => {
          toast.error(textsConfig.TOAST.CHAT_MESSAGE.ERROR);
        },
        onSettled: async () => {
          reset();
          setValue("message", chatRoom.defaultMessage);
          refetch();
          setApiPending(false);
          await setTimeout(() => {
            textareaRef.current?.focus();
          }, 250);
        },
      }
    );
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        "flex gap-[6px] w-full pl-4 pr-3 py-2 rounded-3xl",
        apiPending ? "bg-disableBackground" : "bg-white"
      )}
    >
      <Controller
        control={control}
        name="message"
        render={({ field: { onBlur, onChange, value } }) => (
          <Textarea
            className="flex-1 w-full bg-transparent"
            disabled={apiPending}
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
          color={apiPending ? colorConfig.disableText : colorConfig.text}
        />
      </Button>
    </form>
  );
};
