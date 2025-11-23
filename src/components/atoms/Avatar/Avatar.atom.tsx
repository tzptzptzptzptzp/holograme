"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/Cn.util";
import { GetRandomInt } from "@/utils/GetRandomInt.util";

const ANIMATION_INDEX_LIMIT = 32;
const ANIMATION_DURATION_LIMIT = 6;

type DeviceType = "pc" | "sp";

interface AvatarProps {
  deviceType?: DeviceType;
}

export const Avatar = ({ deviceType = "pc" }: AvatarProps) => {
  const [animationIndex, setAnimationIndex] = useState("");
  const [animationDurationIndex, setAnimationDurationIndex] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const randomAnimationIndex = `animate-avatar-${GetRandomInt(
      1,
      ANIMATION_INDEX_LIMIT
    )}`;
    const randomDurationIndex = `animate-duration-${GetRandomInt(
      1,
      ANIMATION_DURATION_LIMIT
    )}`;
    setAnimationIndex(randomAnimationIndex);
    setAnimationDurationIndex(randomDurationIndex);
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // デバイスタイプに応じたソースを取得
  const getImageSrc = () => {
    return deviceType === "pc"
      ? "/images/bisyojo_chan.png"
      : "/images/sp/bisyojo_chan.png";
  };

  // デバイスタイプに応じた幅を取得
  const getImageSize = () => {
    return deviceType === "pc" ? 1000 : 500;
  };

  // デバイスタイプに応じたクオリティを取得
  const getImageQuality = () => {
    return deviceType === "pc" ? 90 : 80;
  };

  return (
    <div
      className={cn(
        "u-shadow-avatar flex items-end relative w-full h-full s:h-full select-none pointer-events-none",
        "avatar",
        animationIndex,
        animationDurationIndex
      )}
    >
      <Image
        alt="Avatar"
        className={cn(
          "u-centering-x absolute w-auto max-w-max h-[86vh] s:h-full s:max-h-full opacity-0",
          isLoaded && "a-fade-in"
        )}
        src={getImageSrc()}
        width={getImageSize()}
        height={getImageSize()}
        quality={getImageQuality()}
        onLoad={handleImageLoad}
      />
    </div>
  );
};
