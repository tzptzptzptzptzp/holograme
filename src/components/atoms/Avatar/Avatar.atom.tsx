import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { GetRandomInt } from "@/utils/GetRandomInt.util";

const ANIMATION_INDEX_LIMIT = 12;

export const Avatar = () => {
  const [animationIndex, setAnimationIndex] = useState("");

  useEffect(() => {
    const randomIndex = `animate-avatar-${GetRandomInt(
      1,
      ANIMATION_INDEX_LIMIT
    )}`;
    setAnimationIndex(randomIndex);
  }, []);
  return (
    <Image
      alt="Avatar"
      className={clsx(
        "u-shadow-avatar h-[82vh] w-auto select-none pointer-events-none",
        "avatar",
        animationIndex
      )}
      src="/bisyojo_chan.png"
      width={800}
      height={800}
    />
  );
};
