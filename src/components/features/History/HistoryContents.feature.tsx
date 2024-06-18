import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { HistoryItem } from "@/components/molecules/HistoryItem/HistoryItem.molecule";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { textsConfig } from "@/config/texts.config";
import { Icons } from "@/icons";

export const HistoryContents = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(data);
  }, []);

  const handleDelete = (content: string) => {
    try {
      const data = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      const newData = data.filter((item: string) => item !== content);

      if (newData.length === data.length) {
        throw new Error("Item not found in search history");
      }

      localStorage.setItem("searchHistory", JSON.stringify(newData));
      setSearchHistory(newData);
      toast(textsConfig.TOAST.HISTORY_DELETE.SUCCESS);
    } catch (error) {
      toast.error(textsConfig.TOAST.HISTORY_DELETE.ERROR);
    }
  };
  return (
    <ContentWrapper>
      <div className="flex gap-3">
        <ContentHead>
          <Icons.ArchiveBox color="white" />
          <p>Search History</p>
        </ContentHead>
      </div>
      <ul className="flex flex-col gap-3">
        {searchHistory.map((content: string, i: number) => (
          <HistoryItem
            key={i}
            content={content}
            onDelete={() => handleDelete(content)}
          />
        ))}
      </ul>
    </ContentWrapper>
  );
};
