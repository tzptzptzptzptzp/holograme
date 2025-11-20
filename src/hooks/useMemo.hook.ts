import { useMemo as useReactMemo, useState } from "react";
import { toast } from "react-toastify";
import { textsConfig } from "@/configs/texts.config";
import { useGetMemo } from "@/hooks/api/useGetMemo.hook";
import { usePostMemo } from "@/hooks/api/usePostMemo.hook";

export const useMemo = () => {
  const [isArchive, setIsArchive] = useState(false);

  const { data, isLoading, refetch } = useGetMemo();
  const mutation = usePostMemo();

  // フィルタリングされたメモをuseReactMemoで計算
  const filteredMemo = useReactMemo(() => {
    if (!data) return [];
    return data.filter((item) => item.archived === isArchive);
  }, [data, isArchive]);

  const handleArchive = () => {
    setIsArchive((prev) => !prev);
  };

  const handleCreate = () => {
    mutation.mutate(
      { content: "", title: `メモ - ${data ? data.length + 1 : 1}` },
      {
        onSuccess: () => {
          toast(textsConfig.TOAST.MEMO_CREATE.SUCCESS);
          refetch();
        },
        onError: () => {
          toast.error(textsConfig.TOAST.MEMO_CREATE.ERROR);
        },
      }
    );
  };

  return {
    // 状態
    isArchive,
    isLoading,
    filteredMemo,
    isCreating: mutation.isPending,

    // アクション
    handleArchive,
    handleCreate,
  };
};
