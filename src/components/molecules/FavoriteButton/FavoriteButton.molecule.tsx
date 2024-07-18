import { Button } from "@/components/atoms/Button/Button.atom";

type Props = {
  emoji: string;
  onClick: (url: string) => void;
  title: string;
  url: string;
};

export const FavoriteButton = ({ emoji, onClick, title, url }: Props) => {
  return (
    <li className="flex items-center w-[45px] h-[45px] p-[3px] border-[3px] border-white rounded-full bg-white bg-opacity-60">
      <Button
        className="flex items-center justify-center w-[33px] h-[33px] rounded-full bg-white bg-opacity-100 hover:bg-opacity-50 duration-150"
        onClick={() => onClick(url)}
      >
        <p className="text-[22px] text-center leading-none">{emoji}</p>
      </Button>
    </li>
  );
};
