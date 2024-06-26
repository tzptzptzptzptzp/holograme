"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/atoms/Button/Button.atom";
import { NavigationItem } from "@/components/molecules/NavigationItem/NavigationItem.molecule";
import { UserMenu } from "@/components/organisms/UserMenu/UserMenu.organism";

const UserIconSize = 39;

export const Navigation = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="u-shadow relative z-30 h-full w-20 bg-red-300">
      <ul className="flex flex-col gap-8 items-center justify-center h-full">
        <NavigationItem name="home" />
        <NavigationItem name="chat" />
        <NavigationItem name="clipboard" />
        <NavigationItem name="memo" />
        <NavigationItem name="history" />
        <NavigationItem name="setting" />
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
