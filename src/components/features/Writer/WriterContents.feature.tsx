import { Button } from "@/components/atoms/Button/Button.atom";
import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { WriterUserItem } from "@/components/molecules/WriterUserItem/WriterUserItem.molecule";
import { WriterRequestForm } from "@/components/organisms/WriterRequestForm/WriterRequestForm.organism";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { useWriter } from "@/hooks/features/useWriter.hook";
import { useModal } from "@/hooks/useModal.hook";
import { Icons } from "@/icons";

export const WriterContents = () => {
  const {
    isRequestView,
    writer,
    writerData,
    handleSelectWriter,
    setIsRequestView,
  } = useWriter();
  const { handleOpen } = useModal();
  return (
    <ContentWrapper>
      <div className="flex gap-3">
        <ContentHead className="justify-between">
          <div className="flex items-center gap-[6px] flex-none">
            <Icons.Pencil color="white" />
            <p className="text-white text-[20px] font-bold">Writer</p>
          </div>
          {isRequestView ? (
            <Button
              className="flex-shrink-0"
              onClick={() => {
                setIsRequestView(false);
              }}
            >
              <Icons.ArrowUturnLeft color="white" />
            </Button>
          ) : (
            <Button
              className="flex-shrink-0"
              onClick={() => handleOpen("createWriter")}
            >
              <Icons.PlusCircle color="white" />
            </Button>
          )}
        </ContentHead>
      </div>
      {isRequestView ? (
        <WriterRequestForm writer={writer} />
      ) : (
        <ul className="flex flex-col gap-3 overflow-y-scroll">
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
