import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn.util";
import { GetRandomInt } from "@/utils/GetRandomInt.util";

const ANIMATION_INDEX_LIMIT = 32;
const ANIMATION_DURATION_LIMIT = 6;

export const Avatar = () => {
  const [animationIndex, setAnimationIndex] = useState("");
  const [animationDurationIndex, setAnimationDurationIndex] = useState("");

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
        className="a-fade-in u-centering-x absolute w-auto max-w-max h-[86vh] s:h-auto s:max-h-full"
        src="/bisyojo_chan.png"
        width={800}
        height={800}
      />
    </div>
  );
};
