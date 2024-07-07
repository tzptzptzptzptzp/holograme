import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { ChatBalloon } from "@/components/molecules/ChatBalloon/ChatBalloon.molecule";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";
import { ChatMessagesState } from "@/recoil/atoms.recoil";

type Props = {
  roomId: number;
};

export const ChatRoom = ({ roomId }: Props) => {
  const [chatMessages, setChatMessages] = useRecoilState(ChatMessagesState);

  const { data, isLoading } = useGetChatMessage(roomId);

  useEffect(() => {
    if (isLoading || !data) return;
    setChatMessages(data.messages);
  }, [data, isLoading, setChatMessages]);

  if (isLoading || !data || !chatMessages) return <Loader />;

  return (
    <div className="flex flex-col-reverse gap-3 z-0 overflow-x-hidden overflow-y-scroll h-full max-h-full mt-3 s:mt-2 pb-3 s:pb-2">
      {chatMessages.map((message) => (
        <ChatBalloon
          key={message.id}
          message={message.content}
          role={message.role}
        />
      ))}
    </div>
  );
};
