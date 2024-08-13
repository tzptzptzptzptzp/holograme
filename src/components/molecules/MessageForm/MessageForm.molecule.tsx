"use client";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { Textarea } from "@/components/atoms/Textarea/Textarea.atom";
import { StandardPhraseList } from "@/components/organisms/StandardPhraseList/StandardPhraseList.organism";
import { colorConfig } from "@/config/color.config";
import { textsConfig } from "@/config/texts.config";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";
import { usePostChatMessage } from "@/hooks/api/usePostChatMessage.hook";
import { useDevice } from "@/hooks/useDevice.hook";
import { useSendMessage } from "@/hooks/useSendMessage.hook";
import { Icons } from "@/icons";
import {
  ChatMessagesState,
  ChatRoomState,
  UserState,
} from "@/recoil/atoms.recoil";
import { cn } from "@/utils/Cn.util";
import { GeneratePrompt } from "@/utils/GeneratePrompt.util";

type Inputs = {
  message: string;
};

export const MessageForm = ({ roomId }: { roomId: number }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [apiPending, setApiPending] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isStandardPhraseOpen, setIsStandardPhraseOpen] = useState(false);

  const user = useRecoilValue(UserState);
  const chatRoom = useRecoilValue(ChatRoomState);
  const chatMessages = useRecoilValue(ChatMessagesState);

  const { type } = useDevice();

  const { sendMessage } = useSendMessage();

  const { mutate } = usePostChatMessage();
  const { refetch } = useGetChatMessage(roomId);

  const { control, handleSubmit, reset, setFocus, setValue, watch } =
    useForm<Inputs>();

  useEffect(() => {
    if (type === "PC" || type === "Tablet") {
      setFocus("message");
      textareaRef.current?.focus();
    }
    if (!isModified) {
      setValue("message", chatRoom?.defaultMessage || "");
    }
  }, [chatRoom, isModified, setFocus, setValue, type]);

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

  const handleStandardPhraseClose = () => {
    setIsStandardPhraseOpen(false);
  };

  const handleToggleStandardPhrase = () => {
    setIsStandardPhraseOpen((prev) => !prev);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!user || !chatRoom || apiPending || !watch("message").length) return;
    setApiPending(true);
    const { message } = data;
    reset();
    setValue("message", chatRoom.defaultMessage);
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
          refetch();
          setIsModified(false);
          setApiPending(false);
          await setTimeout(() => {
            setFocus("message");
            textareaRef.current?.focus();
            adjustHeight();
          }, 50);
        },
      }
    );
  };

  const setStandardPhrase = (content: string) => {
    setValue("message", content);
    setIsStandardPhraseOpen(false);
    setFocus("message");
    textareaRef.current?.focus();
    setTimeout(() => {
      adjustHeight();
    }, 50);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "flex items-end gap-[6px] relative z-0 w-full pl-4 s:pl-3 pr-3 py-2 rounded-3xl",
        apiPending ? "bg-disableBackground" : "bg-white"
      )}
    >
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 left-0 -z-10 w-full h-full",
          isStandardPhraseOpen
            ? "pointer-events-auto"
            : "pointer-events-none opacity-0"
        )}
        onClick={handleStandardPhraseClose}
      ></div>
      <StandardPhraseList
        isOpen={isStandardPhraseOpen}
        setStandardPhrase={setStandardPhrase}
      />
      <Controller
        control={control}
        name="message"
        render={({ field: { onBlur, onChange, value } }) => (
          <Textarea
            className="flex-1 w-full bg-transparent"
            disabled={apiPending}
            onBlur={onBlur}
            onChange={(e) => {
              onChange(e);
              setIsModified(true);
            }}
            onInput={adjustHeight}
            onKeyDown={handleKeyPress}
            placeholder={"🎉 聞きたいことを入力してね！何を聞く？"}
            ref={textareaRef}
            rows={1}
            value={value}
          />
        )}
      />
      <div className="flex gap-2 h-7">
        <Button disabled={apiPending} onClick={handleToggleStandardPhrase}>
          <Icons.Book
            color={apiPending ? colorConfig.disableText : colorConfig.text}
          />
        </Button>
        <Button className="w-fit" disabled={apiPending} type="submit">
          <Icons.AirPlane
            color={apiPending ? colorConfig.disableText : colorConfig.text}
          />
        </Button>
      </div>
    </form>
  );
};
