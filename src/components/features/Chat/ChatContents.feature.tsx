import { useEffect, useState } from "react";
import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { Select } from "@/components/atoms/Select/Select.atom";
import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { MessageForm } from "@/components/molecules/MessageForm/MessageForm.molecule";
import { ChatRoom } from "@/components/organisms/ChatRoom/ChatRoom.organism";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { useGetChat } from "@/hooks/api/useGetChat.hook";
import { Icons } from "@/icons";
import { Button } from "@/components/atoms/Button/Button.atom";

export const ChatContents = () => {
  const [currentChatRoomId, setCurrentChatRoomId] = useState<number>(0);

  const { data, isLoading } = useGetChat();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentChatRoomId(Number(e.target.value));
  };

  useEffect(() => {
    if (data) setCurrentChatRoomId(data[0].id ?? 0);
  }, [data, setCurrentChatRoomId]);

  useEffect(() => {
    console.log(currentChatRoomId);
  }, [currentChatRoomId]);

  if (isLoading || !data) return <Loader />;

  const chatRoomOptions = data.map((chatRoom) => ({
    id: chatRoom.id,
    name: chatRoom.name,
  }));

  return (
    <ContentWrapper className="gap-0">
      <div className="flex gap-3">
        <ContentHead className="justify-between">
          <div className="flex items-center gap-[6px]">
            <Icons.Chat color="white" />
            <p>Chat Room</p>
          </div>
          <div className="flex items-center gap-[6px]">
            <Select
              className="ml-auto mr-2 bg-transparent text-[16px]"
              id="chat"
              onChange={handleChange}
              options={chatRoomOptions}
            />
            <Button>
              <Icons.PlusCircle color="white" />
            </Button>
            <Button>
              <Icons.Config color="white" />
            </Button>
          </div>
        </ContentHead>
      </div>
      <ChatRoom roomId={currentChatRoomId} />
      <MessageForm roomId={currentChatRoomId} />
    </ContentWrapper>
  );
};
