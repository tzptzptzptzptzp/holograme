import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Button } from "@/components/atoms/Button/Button.atom";
import { SearchTypeState } from "@/recoil/atoms.recoil";

type Props = {
  emoji: string;
  title: string;
  url: string;
};

export const FavoriteButton = ({ emoji, title, url }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const searchType = useRecoilValue(SearchTypeState);

  const handleClick = () => {
    if (searchType === "newTab") {
      window.open(url, "_blank");
    } else {
      window.location.href = url;
    }
  };
  return (
    <li
      className="flex items-center relative w-[45px] h-[45px] p-[3px] border-[3px] border-white rounded-full bg-white bg-opacity-60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        className="flex items-center justify-center w-[33px] h-[33px] rounded-full bg-white bg-opacity-100 hover:bg-opacity-50 duration-150"
        onClick={handleClick}
      >
        <p className="text-[22px] text-center leading-none">{emoji}</p>
      </Button>
      {isHovered && (
        <div className="u-centering-x absolute -top-8 px-3 py-1 rounded-3xl bg-secondary text-white text-[12px] text-center whitespace-nowrap pointer-events-none select-none">
          <p>{title}</p>
        </div>
      )}
    </li>
  );
};
