import clsx from "clsx";
import { StandardPhraseItem } from "@/components/molecules/StandardPhraseItem/StandardPhraseItem.molecule";
import { useGetChatStandardPhrase } from "@/hooks/api/useGetChatStandardPhrase.hook";

type Props = {
  isOpen: boolean;
  setStandardPhrase: (content: string) => void;
};

export const StandardPhraseList = ({ isOpen, setStandardPhrase }: Props) => {
  const { data } = useGetChatStandardPhrase();

  return (
    <div
      className={clsx(
        "absolute right-0 left-0 w-full pb-2 duration-300",
        isOpen
          ? "bottom-full opacity-1 pointer-events-auto"
          : "bottom-0 opacity-0 pointer-events-none"
      )}
    >
      <ul className="flex flex-col gap-2 min-h-[44px] px-4 py-2 rounded-3xl bg-white">
        {data?.map((item, i) => (
          <StandardPhraseItem
            key={i}
            title={item.title}
            content={item.content}
            setStandardPhrase={setStandardPhrase}
          />
        ))}
      </ul>
    </div>
  );
};
