import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/atoms/Button/Button.atom";
import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { MemoItem } from "@/components/molecules/MemoItem/MemoItem.molecule";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { textsConfig } from "@/config/texts.config";
import { useGetMemo } from "@/hooks/api/useGetMemo.hook";
import { usePostMemo } from "@/hooks/api/usePostMemo.hook";
import { Icons } from "@/icons";
import { cn } from "@/utils/cn.util";

type MemoType = {
  id: number;
  userId: string;
  title: string;
  content: string;
  archived: boolean;
  createdDate: Date;
  updatedDate: Date;
};

export const MemoContents = () => {
  const [isArchive, setIsArchive] = useState(false);
  const [apiPending, setApiPending] = useState(false);
  const [memo, setMemo] = useState<MemoType[] | []>([]);

  const { data, isLoading, refetch } = useGetMemo();

  const mutate = usePostMemo();

  useEffect(() => {
    if (data) {
      setMemo(data?.filter((item) => item.archived === isArchive));
    }
  }, [data, isArchive, setMemo]);

  const handleArchive = () => {
    setIsArchive((prev) => !prev);
  };

  const handleCreate = () => {
    setApiPending(true);
    mutate(
      { content: "", title: `メモ - ${data ? data.length + 1 : 1}` },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.MEMO_CREATE.SUCCESS);
          refetch();
        },
        onError: () => {
          toast.error(textsConfig.TOAST.MEMO_CREATE.ERROR);
        },
        onSettled: () => {
          setApiPending(false);
        },
      }
    );
  };

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
              disabled={apiPending}
              onClick={handleArchive}
            >
              <Icons.ArchiveBox color="white" />
            </Button>
            <Button
              className="flex-shrink-0"
              disabled={apiPending}
              onClick={handleCreate}
            >
              <Icons.PlusCircle color="white" />
            </Button>
          </div>
        </ContentHead>
      </div>
      {isLoading && !data ? (
        <Loader />
      ) : (
        <ul className="flex flex-col gap-3">
          {memo?.map((item) => (
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
