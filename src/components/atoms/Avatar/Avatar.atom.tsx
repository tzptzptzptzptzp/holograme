"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/Cn.util";
import { GetRandomInt } from "@/utils/GetRandomInt.util";
import { useTweet } from "@/hooks/useTweet.hook";

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
  const { tweet, setTweet } = useTweet();
  const timerRef = useRef<number | null>(null);
  const baselineRef = useRef<string | null>(null);
  const REACTIONS = [
    "おっ！どうしたの💗？今の気分教えてほしいな😊💬!!",
    "お話ししよ〜💫！今日の出来事聞かせてね😺✨!!",
    "少し休憩しよ🍬！深呼吸して一緒に整えよ🫶🌿!!",
    "新しいこと始めたい👏？小さな一歩からいこっ🚀📋!!",
    "困ったときは合図してね🎀！できる範囲で全力で助けるよ💪🤝!!",
    "目標に向けて一歩ずつ🎯！今のあなたに合う小さな一歩から🌟👣!!",
  ];

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

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // デバイスタイプに応じた画像プロパティを取得
  const getImageProps = () => {
    return deviceType === "pc"
      ? {
          src: "/images/bisyojo_chan.png",
          width: 1000,
          height: 1000,
          quality: 90,
        }
      : {
          src: "/images/sp/bisyojo_chan.png",
          width: 500,
          height: 500,
          quality: 80,
        };
  };

  return (
    <div
      className={cn(
        "u-shadow-avatar flex items-end relative w-full h-full s:h-full select-none",
        "avatar",
        animationIndex,
        animationDurationIndex
      )}
      onClick={() => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        // ベースライン（反応前の元のつぶやき）を保持
        if (!timerRef.current) {
          baselineRef.current = tweet;
        }
        // ランダムにリアクションを選択
        const idx = GetRandomInt(0, REACTIONS.length - 1);
        setTweet(REACTIONS[idx]);
        timerRef.current = window.setTimeout(() => {
          // 2秒後に元のつぶやきへ戻す
          setTweet(baselineRef.current ?? tweet);
          baselineRef.current = null;
          timerRef.current = null;
        }, 2000);
      }}
    >
      <Image
        alt="Avatar"
        className={cn(
          "u-centering-x absolute w-auto max-w-max h-[86vh] s:h-full s:max-h-full opacity-0",
          isLoaded && "a-fade-in"
        )}
        {...getImageProps()}
        onLoad={handleImageLoad}
      />
    </div>
  );
};
