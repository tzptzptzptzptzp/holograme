import clsx from "clsx";
import { StandardPhraseItem } from "@/components/molecules/StandardPhraseItem/StandardPhraseItem.molecule";

type Props = {
  isOpen: boolean;
};

export const StandardPhraseList = ({ isOpen }: Props) => {
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
        <StandardPhraseItem />
        <StandardPhraseItem />
      </ul>
    </div>
  );
};