import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/atoms/Button/Button.atom";
import { Icons } from "@/icons";
import { colorConfig } from "@/config/color.config";

type Props = {
  onClick: (url: string) => void;
  url: string;
};

export const FavoriteButton = ({ onClick, url }: Props) => {
  const [hasError, setHasError] = useState(false);
  return (
    <li className="flex items-center w-[45px] h-[45px] p-[3px] border-[3px] border-white rounded-full bg-white bg-opacity-60">
      <Button
        className="flex items-center justify-center w-[33px] h-[33px] rounded-full bg-white bg-opacity-100 hover:bg-opacity-50 duration-150"
        onClick={() => onClick(url)}
      >
        <Image
          alt={url}
          className="p-[3px] rounded-full"
          src={`https://www.google.com/s2/favicons?sz=128&domain=${
            new URL(url).origin
          }`}
          width={128}
          height={128}
          onError={() => setHasError(true)}
          style={hasError ? { display: "none" } : {}}
        />
        {hasError && (
          <Icons.Heart
            className="p-[3px] stroke-[2.5px]"
            color={colorConfig.primary}
            width={33}
            height={33}
            solid
          />
        )}
      </Button>
    </li>
  );
};
