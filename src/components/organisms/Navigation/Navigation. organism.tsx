"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/atoms/Button/Button.atom";
import { NavigationItem } from "@/components/molecules/NavigationItem/NavigationItem.molecule";
import { UserMenu } from "@/components/organisms/UserMenu/UserMenu.organism";
import { useDevice } from "@/hooks/useDevice.hook";

export const Navigation = () => {
  const [isHovered, setIsHovered] = useState(false);

  const { type } = useDevice();

  const UserIconSize = type !== "SP" ? 39 : 30;

  const handleClick = () => {
    setIsHovered((prev) => !prev);
  };
  return (
    <nav
      className="u-shadow flex-auto absolute top-0 s:top-auto right-0 bottom-0 s:left-0 z-30 w-20 max-w-20 min-w-20 s:w-full s:max-w-full h-full s:h-auto s:p-2 bg-primary"
      style={{ transform: "translateZ(0px)" }}
    >
      <ul className="flex flex-col s:flex-row gap-8 s:gap-4 items-center justify-center h-full">
        <NavigationItem name="home" />
        <NavigationItem name="chat" />
        <NavigationItem name="clipboard" />
        <NavigationItem name="writer" sp={false} />
        <NavigationItem name="memo" />
        <NavigationItem name="history" />
        <NavigationItem name="setting" />
        {type === "SP" && (
          <li className="relative">
            <Button onClick={handleClick}>
              <Image
                alt="美少女ちゃんアイコン"
                src="/icons/circle.png"
                width={UserIconSize}
                height={UserIconSize}
              />
            </Button>
            <UserMenu isHovered={isHovered} />
          </li>
        )}
      </ul>
      {type !== "SP" && (
        <div
          className="u-centering-x s:hidden absolute bottom-4 leading-[0]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Button>
            <Image
              alt="美少女ちゃんアイコン"
              src="/icons/circle.png"
              width={UserIconSize}
              height={UserIconSize}
            />
          </Button>
          <UserMenu isHovered={isHovered} />
        </div>
      )}
    </nav>
  );
};
