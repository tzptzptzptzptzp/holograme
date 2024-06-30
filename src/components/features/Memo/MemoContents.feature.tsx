import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/atoms/Button/Button.atom";
import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { MemoItem } from "@/components/molecules/MemoItem/MemoItem.molecule";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { textsConfig } from "@/config/texts.config";
import { useGetMemo } from "@/hooks/api/useGetMemo.hook";
import { usePostMemo } from "@/hooks/api/usePostMemo.hook";
import { Icons } from "@/icons";

export const MemoContents = () => {
  const [apiPending, setApiPending] = useState(false);

  const { data, refetch } = useGetMemo();

  const mutate = usePostMemo();

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
              className="flex-shrink-0"
              disabled={apiPending}
              onClick={handleCreate}
            >
              <Icons.PlusCircle color="white" />
            </Button>
          </div>
        </ContentHead>
      </div>
      <ul className="flex flex-col gap-3">
        {data?.map((item) => (
          <MemoItem
            key={item.id}
            content={item.content}
            title={item.title}
            id={item.id}
          />
        ))}
      </ul>
    </ContentWrapper>
  );
};
