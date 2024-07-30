import { useEffect } from "react";
import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { WriterUserItem } from "@/components/molecules/WriterUserItem/WriterUserItem.molecule";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { useWriter } from "@/hooks/features/useWriter.hook";
import { Icons } from "@/icons";

export const WriterContents = () => {
  const { isRequestView, handleSelectWriter } = useWriter();
  return (
    <ContentWrapper>
      <div className="flex gap-3">
        <ContentHead className="justify-between">
          <div className="flex items-center gap-[6px] flex-none">
            <Icons.Pencil color="white" />
            <p className="text-white text-[20px] font-bold">Writer</p>
          </div>
        </ContentHead>
      </div>
      {isRequestView ? (
        <div>request view</div>
      ) : (
        <ul className="flex flex-col gap-3">
          <WriterUserItem
            id={1}
            onClick={handleSelectWriter}
            username="User1"
          />
          <WriterUserItem
            id={2}
            onClick={handleSelectWriter}
            username="User2"
          />
        </ul>
      )}
    </ContentWrapper>
  );
};
