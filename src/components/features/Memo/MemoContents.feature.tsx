import { ContentHead } from "@/components/molecules/ContentHead/ContentHead.molecule";
import { MemoItem } from "@/components/molecules/MemoItem/MemoItem.molecule";
import { ContentWrapper } from "@/components/templates/ContentWrapper/ContentWrapper.template";
import { useGetMemo } from "@/hooks/api/useGetMemo.hook";
import { Icons } from "@/icons";

export const MemoContents = () => {
  const { data } = useGetMemo();

  console.log(data);

  return (
    <ContentWrapper>
      <div className="flex gap-3">
        <ContentHead>
          <Icons.PencilSquare color="white" />
          <p className="text-white text-[20px] font-bold">Memo</p>
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
