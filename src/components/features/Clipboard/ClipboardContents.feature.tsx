import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { ClipboardCopyButton } from "@/components/molecules/ClipboardCopyButton/ClipboardCopyButton.molecule";
import { ClipboardItem } from "@/components/molecules/ClipboardItem/ClipboardItem.molecule";
import { ClipboardPasteButton } from "@/components/molecules/ClipboardPasteButton/ClipboardPasteButton.molecule";
import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { useGetClipboard } from "@/hooks/api/useGetClipboard.hook";
import { useDevice } from "@/hooks/useDevice.hook";
import { Icons } from "@/icons";
import { Clipboard } from "@prisma/client";

export const ClipboardContents = () => {
  const { type } = useDevice();

  const { data, isLoading } = useGetClipboard();

  return (
    <ContentWrapper>
      <div className="flex gap-3">
        <ContentHead>
          <Icons.ClipBoard color="white" />
          <p className="text-white text-[20px] font-bold">
            {type !== "SP" ? "Clipboard History" : "Clipboard"}
          </p>
        </ContentHead>
        <ClipboardPasteButton />
        <ClipboardCopyButton />
      </div>
      {isLoading && !data ? (
        <Loader />
      ) : (
        <ul className="flex flex-col gap-3">
          {data?.map((item: Clipboard) => (
            <ClipboardItem key={item.id} content={item.content} id={item.id} />
          )) ?? (
            <ClipboardItem
              content=""
              id={0}
              showIcon={false}
              copyIcon={false}
              deleteIcon={false}
            />
          )}
        </ul>
      )}
    </ContentWrapper>
  );
};
