import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { WriterUserItem } from "@/components/molecules/WriterUserItem/WriterUserItem.molecule";
import { WriterRequestForm } from "@/components/organisms/WriterRequestForm/WriterRequestForm.organism";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { useGetWriter } from "@/hooks/api/useGetWriter.hook";
import { useWriter } from "@/hooks/features/useWriter.hook";
import { Icons } from "@/icons";

export const WriterContents = () => {
  const { isRequestView, handleSelectWriter } = useWriter();

  const { data: writerData } = useGetWriter();
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
        <div className="flex flex-col h-full">
          <WriterRequestForm />
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {writerData.map((writer, i) => (
            <WriterUserItem
              key={i}
              id={writer.id}
              onClick={handleSelectWriter}
              username={writer.name}
            />
          ))}
        </ul>
      )}
    </ContentWrapper>
  );
};
