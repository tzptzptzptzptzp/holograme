import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { Select } from "@/components/atoms/Select/Select.atom";
import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { MessageForm } from "@/components/molecules/MessageForm/MessageForm.molecule";
import { ChatRoom } from "@/components/organisms/ChatRoom/ChatRoom.organism";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { useGetChat } from "@/hooks/api/useGetChat.hook";
import { useModal } from "@/hooks/useModal.hook";
import { Icons } from "@/icons";
import { ChatMessageState } from "@/recoil/atoms.recoil";

export const ChatContents = () => {
  const isFirstLoad = useRef(true);
  const [currentChatRoomId, setCurrentChatRoomId] = useState<number>(0);

  const chatRoom = useRecoilValue(ChatMessageState);

  const { data, isLoading } = useGetChat();

  const { handleOpen } = useModal();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentChatRoomId(Number(e.target.value));
  };

  useEffect(() => {
    if (isFirstLoad.current && data) {
      setCurrentChatRoomId(data[0].id ?? 0);
      isFirstLoad.current = false;
    }
  }, [data, setCurrentChatRoomId]);

  useEffect(() => {
    setCurrentChatRoomId(chatRoom.roomId);
  }, [chatRoom, setCurrentChatRoomId]);

  const chatRoomOptions =
    data?.map((chatRoom) => ({
      id: chatRoom.id,
      name: chatRoom.name,
    })) ?? [];

  return (
    <ContentWrapper className="gap-0">
      <div className="flex gap-3">
        <ContentHead className="justify-between">
          <div className="flex items-center gap-[6px] flex-none">
            <Icons.Chat color="white" />
            <p>Chat Room</p>
          </div>
          <div className="flex items-center gap-1.5 w-full">
            <div className="flex justify-end flex-1">
              <Select
                className="flex-grow pr-2 bg-transparent text-[16px] text-right"
                id="chat"
                onChange={handleChange}
                options={chatRoomOptions}
                value={currentChatRoomId}
              />
            </div>
            <Button
              className="flex-shrink-0"
              onClick={() => handleOpen("createChat")}
            >
              <Icons.PlusCircle color="white" />
            </Button>
            <Button
              className="flex-shrink-0"
              onClick={() => handleOpen("editChat")}
            >
              <Icons.Config color="white" />
            </Button>
          </div>
        </ContentHead>
      </div>
      {isLoading && !data ? (
        <Loader />
      ) : (
        <ChatRoom roomId={currentChatRoomId} />
      )}
      <MessageForm roomId={currentChatRoomId ?? 0} />
    </ContentWrapper>
  );
};
