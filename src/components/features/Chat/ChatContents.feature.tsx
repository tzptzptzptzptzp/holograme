import { useEffect, useState } from "react";
import { Select } from "@/components/atoms/Select/Select.atom";
import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { Icons } from "@/icons";

const options = [
  { id: 1, name: "オプション01" },
  { id: 2, name: "オプション02" },
  { id: 3, name: "オプション03" },
];

export const ChatContents = () => {
  const [currentChatRoomId, setCurrentChatRoomId] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentChatRoomId(Number(e.target.value));
  };

  useEffect(() => {
    setCurrentChatRoomId(options[0].id ?? 0);
  }, [setCurrentChatRoomId]);

  useEffect(() => {
    console.log(currentChatRoomId);
  }, [currentChatRoomId]);

  return (
    <ContentWrapper>
      <div className="flex gap-3">
        <ContentHead>
          <Icons.Chat color="white" />
          <p>Chat Room</p>
          <Select id="chat" onChange={handleChange} options={options} />
        </ContentHead>
      </div>
    </ContentWrapper>
  );
};
