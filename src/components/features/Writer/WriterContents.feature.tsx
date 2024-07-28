import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { Icons } from "@/icons";

export const WriterContents = () => {
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
      <div>Writer</div>
    </ContentWrapper>
  );
};
