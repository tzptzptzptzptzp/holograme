import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { Select } from "@/components/atoms/Select/Select.atom";
import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { MessageForm } from "@/components/molecules/MessageForm/MessageForm.molecule";
import { ChatRoom } from "@/components/organisms/ChatRoom/ChatRoom.organism";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { useModal } from "@/hooks/useModal.hook";
import { Icons } from "@/icons";
import {
  ChatRoomOptionsState,
  ChatRoomState,
  FavoriteChatRoomIdState,
} from "@/recoil/atoms.recoil";

export const ChatContents = () => {
  const isFirstLoad = useRef(true);
  const [currentChatRoomId, setCurrentChatRoomId] = useState<number>(0);

  const [chatRoom, setChatRoom] = useRecoilState(ChatRoomState);
  const chatRoomOptions = useRecoilValue(ChatRoomOptionsState);
  const favoriteChatRoomId = useRecoilValue(FavoriteChatRoomIdState);

  const { handleOpen } = useModal();

  useEffect(() => {
    if (isFirstLoad.current && chatRoom && favoriteChatRoomId) {
      setCurrentChatRoomId(favoriteChatRoomId ?? chatRoom.id);
      isFirstLoad.current = false;
    }
  }, [chatRoom, favoriteChatRoomId, setCurrentChatRoomId]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentChatRoomId(Number(e.target.value));
  };

  const handleFavorite = () => {
    localStorage.setItem("favoriteChatRoom", currentChatRoomId.toString());
  };
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
            <Button className="flex-shrink-0" onClick={handleFavorite}>
              <Icons.Heart
                color="white"
                solid={currentChatRoomId === favoriteChatRoomId}
              />
            </Button>
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
      {!chatRoom ? <Loader /> : <ChatRoom roomId={chatRoom!.id ?? 0} />}
      <MessageForm roomId={chatRoom ? chatRoom!.id : 0} />
    </ContentWrapper>
  );
};
