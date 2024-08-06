import { StandardPhraseItem } from "@/components/molecules/StandardPhraseItem/StandardPhraseItem.molecule";
import { useGetChatStandardPhrase } from "@/hooks/api/useGetChatStandardPhrase.hook";
import { Button } from "@/components/atoms/Button/Button.atom";
import { Icons } from "@/icons";
import { useModal } from "@/hooks/useModal.hook";
import { cn } from "@/utils/cn.util";

type Props = {
  isOpen: boolean;
  setStandardPhrase: (content: string) => void;
};

export const StandardPhraseList = ({ isOpen, setStandardPhrase }: Props) => {
  const { handleOpen } = useModal();

  const { data } = useGetChatStandardPhrase();
  return (
    <div
      className={cn(
        "absolute right-0 left-0 w-full pb-2 duration-300",
        isOpen
          ? "bottom-full opacity-1 pointer-events-auto"
          : "bottom-0 opacity-0 pointer-events-none"
      )}
    >
      <ul className="flex flex-col gap-2 min-h-[44px] px-4 py-2 rounded-3xl bg-white">
        <li className="flex items-center justify-between gap-2 w-full">
          <p className="flex items-center justify-between gap-1 font-bold truncate">
            <Icons.Book width={22} height={22} />
            テンプレート
          </p>
          <Button
            className="w-6 min-w-6"
            onClick={() => handleOpen("createChatStandardPhrase")}
          >
            <Icons.PlusCircle className="stroke-2" width={22} height={22} />
          </Button>
        </li>
        {data?.map((item, i) => (
          <StandardPhraseItem
            key={i}
            id={item.id}
            title={item.title}
            content={item.content}
            setStandardPhrase={setStandardPhrase}
          />
        ))}
      </ul>
    </div>
  );
};
