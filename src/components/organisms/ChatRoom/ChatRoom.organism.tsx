import { useEffect, useRef } from "react";
import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { ChatBalloon } from "@/components/molecules/ChatBalloon/ChatBalloon.molecule";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";
import { useChatMessages } from "@/hooks/useChatMessages.hook";

type Props = {
  roomId: number;
};

export const ChatRoom = ({ roomId }: Props) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { currentRoomMessages } = useChatMessages(roomId);

  // データの取得とストア同期（内部で自動実行）
  const { isLoading } = useGetChatMessage(roomId);

  useEffect(() => {
    if (
      currentRoomMessages &&
      currentRoomMessages.length > 0 &&
      chatContainerRef.current
    ) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [currentRoomMessages]);

  // ローダー表示条件：データ取得中 かつ 現在のルームにメッセージがない場合
  const shouldShowLoader =
    isLoading && (!currentRoomMessages || currentRoomMessages.length === 0);

  if (shouldShowLoader) return <Loader />;

  return (
    <div
      className="flex flex-col-reverse gap-3 z-0 overflow-x-hidden overflow-y-scroll h-full max-h-full mt-3 s:mt-0 pb-3 s:pb-0"
      ref={chatContainerRef}
    >
      {currentRoomMessages && currentRoomMessages.length > 0 ? (
        currentRoomMessages[0].id !== 0 ? (
          currentRoomMessages.map((message) => (
            <ChatBalloon
              key={message.id}
              message={message.content}
              role={message.role}
            />
          ))
        ) : (
          <Loader />
        )
      ) : isLoading ? (
        <Loader />
      ) : null}
    </div>
  );
};
