import { useEffect, useState } from "react";
import { usePostTweet } from "@/hooks/api/usePostTweet.hook";
import { useUser } from "@/hooks/useUser.hook";
import { textsConfig } from "@/configs/texts.config";

type SavedTweet = {
  content: string;
  timestamp: number;
};

export const useTweet = () => {
  const [executedOnce, setExecutedOnce] = useState(false);
  const { user } = useUser();
  const [tweet, setTweet] = useState<string>("");

  const mutate = usePostTweet();

  // userが更新された時にデフォルトのtweetを設定
  useEffect(() => {
    if (user?.nickname && !executedOnce) {
      setTweet(user.nickname + textsConfig.TWEET.DEFAULT);
    }
  }, [user?.nickname, executedOnce]);

  // ツイート取得・保存処理
  useEffect(() => {
    if (!executedOnce) {
      // ローカルストレージからtweetを取得
      const savedTweetString = localStorage.getItem("savedTweet");
      const savedTweet: SavedTweet | null = savedTweetString
        ? JSON.parse(savedTweetString)
        : null;

      const currentTime = Date.now();
      const SIX_HOURS = 6 * 60 * 60 * 1000; // 6時間をミリ秒で表現

      // 保存されたtweetがあり、かつ6時間以内のものであれば使用
      if (savedTweet && currentTime - savedTweet.timestamp < SIX_HOURS) {
        setTweet(savedTweet.content);
        setExecutedOnce(true);
      } else {
        // 保存されたtweetがないか、6時間以上経過していれば新しく取得
        mutate(
          undefined, // パラメータ不要
          {
            onSuccess: ({ data }) => {
              // 新しいtweetを設定
              setTweet(data.tweet);

              // ローカルストレージに保存（現在のタイムスタンプ付きで）
              const newSavedTweet: SavedTweet = {
                content: data.tweet,
                timestamp: currentTime,
              };
              localStorage.setItem("savedTweet", JSON.stringify(newSavedTweet));
              setExecutedOnce(true);
            },
            onError: (error) => {
              console.error("Tweet取得エラー:", error);
              // エラーが発生した場合は実行済みフラグをリセット
              setExecutedOnce(false);
            },
          }
        );
      }
    }
  }, [executedOnce, mutate]);

  // ツイートを手動で更新する関数
  const refreshTweet = () => {
    setExecutedOnce(false); // useEffectを再実行させる
  };

  return {
    tweet,
    setTweet,
    refreshTweet,
  };
};
