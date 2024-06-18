import { HistoryItem } from "@/components/molecules/HistoryItem/HistoryItem.molecule";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { Icons } from "@/icons";

export const HistoryContents = () => {
  const data = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  return (
    <ContentWrapper>
      <div className="flex gap-3">
        <div className="flex items-center gap-[6px] w-full pl-4 pr-3 py-2 rounded-full bg-primary">
          <Icons.ArchiveBox color="white" />
          <p className="text-white text-[20px] font-bold">Search History</p>
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {data.map((item: string, i: number) => (
          <HistoryItem key={i} content={item} />
        ))}
      </ul>
    </ContentWrapper>
  );
};
