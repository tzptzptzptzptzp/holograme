"use client";
import { useSetRecoilState } from "recoil";
import { Icons } from "@/icons";
import { Button } from "../../atoms/Button/Button.atom";
import { SelectedContentState } from "@/recoil/atoms.recoil";
import { SelectedContentStateType } from "@/recoil/types.recoil";
import Image from "next/image";
import { UserMenu } from "../UserMenu/UserMenu.organism";
import { useState } from "react";

const IconSize = 32;
const UserIconSize = 39;

export const Navigation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const setSelectedContent = useSetRecoilState(SelectedContentState);

  const handleClick = (selectedContent: SelectedContentStateType) => {
    setSelectedContent(selectedContent);
  };

  return (
    <nav className="u-shadow relative z-30 h-full w-20 bg-red-300">
      <ul className="flex flex-col gap-8 items-center justify-center h-full">
        <li>
          <Button onClick={() => handleClick("home")}>
            <Icons.Home color="white" width={IconSize} height={IconSize} />
          </Button>
        </li>
        <li>
          <Button onClick={() => handleClick("chat")}>
            <Icons.Chat color="white" width={IconSize} height={IconSize} />
          </Button>
        </li>
        <li>
          <Button onClick={() => handleClick("clipboard")}>
            <Icons.ClipBoard color="white" width={IconSize} height={IconSize} />
          </Button>
        </li>
        <li>
          <Button onClick={() => handleClick("history")}>
            <Icons.ArchiveBox
              color="white"
              width={IconSize}
              height={IconSize}
            />
          </Button>
        </li>
        <li>
          <Button onClick={() => handleClick("setting")}>
            <Icons.Config color="white" width={IconSize} height={IconSize} />
          </Button>
        </li>
      </ul>
      <div
        className="u-centering-x absolute bottom-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Button>
          <Image
            alt="美少女ちゃんアイコン"
            src="/icon.png"
            width={UserIconSize}
            height={UserIconSize}
          />
        </Button>
        <UserMenu isHovered={isHovered} />
      </div>
    </nav>
  );
};