import { Loader } from "@/components/atoms/Loader/Loader.atom";
import { ClipboardCopyButton } from "@/components/molecules/ClipboardCopyButton/ClipboardCopyButton.molecule";
import { ClipboardItem } from "@/components/molecules/ClipboardItem/ClipboardItem.molecule";
import { ClipboardPasteButton } from "@/components/molecules/ClipboardPasteButton/ClipboardPasteButton.molecule";
import { SearchForm } from "@/components/molecules/SearchForm/SearchForm.molecule";
import { SearchTypeSwitcher } from "@/components/molecules/SearchTypeSwitcher/SearchTypeSwitcher.molecule";
import { useGetClipboard } from "@/hooks/api/useGetClipboard.hook";
import { useEffect, useState } from "react";

export const HomeContents = () => {
  const [latest, setLatest] = useState({
    id: 0,
    content: "",
  });

  const { data, isLoading } = useGetClipboard();

  useEffect(() => {
    setLatest({
      id: data?.[0].id || 0,
      content: data?.[0].content || "",
    });
  }, [data]);
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-3 w-full">
        <SearchForm />
        <SearchTypeSwitcher />
        <ClipboardPasteButton />
        <ClipboardCopyButton />
      </div>
      <ClipboardItem
        content={latest.content}
        id={latest.id}
        icon
        copyIcon={false}
        deleteIcon={false}
      />
    </div>
  );
};
