import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { ChatBalloon } from "@/components/molecules/ChatBalloon/ChatBalloon.molecule";
import { CenteringContainer } from "@/components/templates/CenteringContainer/CenteringContainer.template";
import { useGetChatMessage } from "@/hooks/api/useGetChatMessage.hook";
import { ChatMessageState } from "@/recoil/atoms.recoil";

type Props = {
  roomId: number;
};

export const ChatRoom = ({ roomId }: Props) => {
  const [state, setState] = useRecoilState(ChatMessageState);

  const { data, isLoading } = useGetChatMessage(roomId);

  useEffect(() => {
    if (isLoading || !data) return;
    setState({
      isThinking: false,
      messages: data.messages.map((message) => ({
        ...message,
      })),
    });
  }, [data, isLoading, setState]);

  if (isLoading || !data || !state.messages)
    return (
      <CenteringContainer>
        <Loader />
      </CenteringContainer>
    );

  return (
    <div className="flex flex-col-reverse gap-3 z-0 overflow-y-scroll h-full max-h-full mt-3 pb-3">
      {state.messages.map((message) => (
        <ChatBalloon
          key={message.id}
          message={message.content}
          role={message.role}
        />
      ))}
    </div>
  );
};
