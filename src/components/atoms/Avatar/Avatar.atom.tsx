import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
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
    <Image
      alt="Avatar"
      className={clsx(
        "u-shadow-avatar w-auto h-[82vh] s:h-auto s:max-h-full select-none pointer-events-none",
        "avatar",
        animationIndex,
        animationDurationIndex
      )}
      src="/bisyojo_chan.png"
      width={800}
      height={800}
    />
  );
};
