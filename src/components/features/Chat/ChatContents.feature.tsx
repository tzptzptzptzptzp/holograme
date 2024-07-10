import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { Select } from "@/components/atoms/Select/Select.atom";
import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { MessageForm } from "@/components/molecules/MessageForm/MessageForm.molecule";
import { ChatRoom } from "@/components/organisms/ChatRoom/ChatRoom.organism";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { useGetChat } from "@/hooks/api/useGetChat.hook";
import { useDevice } from "@/hooks/useDevice.hook";
import { useModal } from "@/hooks/useModal.hook";
import { Icons } from "@/icons";
import {
  ChatRoomOptionsState,
  ChatRoomState,
  FavoriteChatRoomIdState,
} from "@/recoil/atoms.recoil";

export const ChatContents = () => {
  const [chatRoom, setChatRoom] = useRecoilState(ChatRoomState);
  const [favoriteChatRoomId, setFavoriteChatRoomId] = useRecoilState(
    FavoriteChatRoomIdState
  );
  const chatRoomOptions = useRecoilValue(ChatRoomOptionsState);

  const { type } = useDevice();
  const { handleOpen } = useModal();

  const { data } = useGetChat();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!data) return;
    const chatRoom = data.find(
      (chatRoom) => chatRoom.id === Number(e.target.value)
    );
    setChatRoom({
      id: Number(e.target.value),
      name: chatRoom!.name,
      description: chatRoom!.description,
      defaultMessage: chatRoom!.defaultMessage,
    });
  };

  const handleFavorite = () => {
    if (chatRoom?.id === favoriteChatRoomId) {
      setFavoriteChatRoomId(null);
      localStorage.removeItem("favoriteChatRoom");
    } else {
      localStorage.setItem(
        "favoriteChatRoom",
        chatRoom ? chatRoom?.id.toString() : "0"
      );
      setFavoriteChatRoomId(chatRoom?.id ?? 0);
    }
  };
  return (
    <ContentWrapper className="gap-0">
      <div className="flex gap-3">
        <ContentHead className="justify-between">
          <div className="flex items-center gap-[6px] flex-none">
            <Icons.Chat color="white" />
            <p>{type !== "SP" ? "Chat Room" : "Chat"}</p>
          </div>
          <div className="flex items-center gap-1.5 w-full">
            <div className="flex justify-end flex-1">
              <Select
                className="flex-grow pr-2 bg-transparent text-[16px] s:text-[15px] text-right"
                id="chat"
                onChange={handleChange}
                options={chatRoomOptions}
                value={chatRoom?.id ?? 0}
              />
            </div>
            <Button className="flex-shrink-0" onClick={handleFavorite}>
              <Icons.Heart
                color="white"
                solid={chatRoom?.id === favoriteChatRoomId}
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
