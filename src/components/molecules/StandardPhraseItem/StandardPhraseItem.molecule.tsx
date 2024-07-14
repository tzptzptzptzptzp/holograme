import { Button } from "@/components/atoms/Button/Button.atom";
import { Icons } from "@/icons";

type Props = {
  title: string;
  content: string;
  setStandardPhrase: (content: string) => void;
};

export const StandardPhraseItem = ({
  title,
  content,
  setStandardPhrase,
}: Props) => {
  return (
    <li className="flex gap-2 w-full items-center">
      <Button
        className="flex items-center gap-2 w-full min-w-0 text-left"
        hover={false}
        onClick={() => setStandardPhrase(content)}
      >
        <p className="max-w-full min-w-fit s:min-w-0 font-bold truncate">
          {title}
        </p>
        <p className="s:hidden text-gray text-[14px] leading-tight truncate">
          {content}
        </p>
      </Button>
      <Button className="w-6 min-w-6">
        <Icons.Pencil className="stroke-2" width={22} height={22} />
      </Button>
    </li>
  );
};
