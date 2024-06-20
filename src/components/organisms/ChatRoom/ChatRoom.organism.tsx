import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { ChatBalloon } from "@/components/molecules/ChatBalloon/ChatBalloon.molecule";
import { CenteringContainer } from "@/components/templates/CenteringContainer/CenteringContainer.template";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";

type Props = {
  roomId: number;
};

export const ChatRoom = ({ roomId }: Props) => {
  const { data, isLoading } = useGetChatMessage(roomId);

  if (isLoading || !data)
    return (
      <CenteringContainer>
        <Loader />
      </CenteringContainer>
    );

  return (
    <div className="flex flex-col-reverse gap-2 z-0 overflow-y-scroll h-full max-h-full">
      {data.messages.map((message) => (
        <ChatBalloon
          key={message.id}
          message={message.content}
          role={message.role}
        />
      ))}
    </div>
  );
};
