import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { ClipboardCopyButton } from "@/components/molecules/ClipboardCopyButton/ClipboardCopyButton.molecule";
import { ClipboardItem } from "@/components/molecules/ClipboardItem/ClipboardItem.molecule";
import { ClipboardPasteButton } from "@/components/molecules/ClipboardPasteButton/ClipboardPasteButton.molecule";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { useGetClipboard } from "@/hooks/api/useGetClipboard.hook";
import { Icons } from "@/icons";
import { Clipboard } from "@prisma/client";

export const ClipboardContents = () => {
  const { data, isLoading } = useGetClipboard();

  if (isLoading) return <Loader />;

  return (
    <ContentWrapper>
      <div className="flex gap-3">
        <div className="flex items-center gap-[6px] w-full pl-4 pr-3 py-2 rounded-full bg-primary">
          <Icons.ClipBoard color="white" />
          <p className="text-white text-[20px] font-bold">Clipboard History</p>
        </div>
        <ClipboardPasteButton />
        <ClipboardCopyButton />
      </div>
      <ul className="flex flex-col gap-3">
        {data.map((item: Clipboard) => (
          <ClipboardItem key={item.id} content={item.content} id={item.id} />
        ))}
      </ul>
    </ContentWrapper>
  );
};
