import { Button } from "@/components/atoms/Button/Button.atom";
import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { MemoItem } from "@/components/molecules/MemoItem/MemoItem.molecule";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { useMemo } from "@/hooks/useMemo.hook";
import { Icons } from "@/icons";
import { cn } from "@/utils/Cn.util";

export const MemoContents = () => {
  const {
    isArchive,
    isLoading,
    filteredMemo,
    isCreating,
    handleArchive,
    handleCreate,
  } = useMemo();

  return (
    <ContentWrapper>
      <div className="flex gap-3">
        <ContentHead className="justify-between">
          <div className="flex items-center gap-[6px] flex-none">
            <Icons.PencilSquare color="white" />
            <p className="text-white text-[20px] font-bold">Memo</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              className={cn(
                "flex-shrink-0",
                isArchive ? "opacity-100" : "opacity-50"
              )}
              disabled={isCreating}
              onClick={handleArchive}
            >
              <Icons.ArchiveBox color="white" />
            </Button>
            <Button
              className="flex-shrink-0"
              disabled={isCreating}
              onClick={handleCreate}
            >
              <Icons.PlusCircle color="white" />
            </Button>
          </div>
        </ContentHead>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="flex flex-col gap-3 overflow-y-scroll">
          {filteredMemo?.map((item) => (
            <MemoItem
              key={item.id}
              content={item.content}
              title={item.title}
              id={item.id}
              archived={item.archived}
            />
          ))}
        </ul>
      )}
    </ContentWrapper>
  );
};
