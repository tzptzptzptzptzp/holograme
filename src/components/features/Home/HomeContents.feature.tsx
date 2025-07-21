import { useEffect, useState } from "react";
import { OpenAiModel } from "@/app/api/(endpoints)/openai/route";
import { ClipboardCopyButton } from "@/components/molecules/ClipboardCopyButton/ClipboardCopyButton.molecule";
import { ClipboardItem } from "@/components/molecules/ClipboardItem/ClipboardItem.molecule";
import { ClipboardPasteButton } from "@/components/molecules/ClipboardPasteButton/ClipboardPasteButton.molecule";
import { FavoriteButton } from "@/components/molecules/FavoriteButton/FavoriteButton.molecule";
import { HomeBalloon } from "@/components/molecules/HomeBalloon/HomeBalloon.molecule";
import { ModelItem } from "@/components/molecules/ModelItem/ModelItem.molecule";
import { SearchForm } from "@/components/molecules/SearchForm/SearchForm.molecule";
import { SearchTypeSwitcher } from "@/components/molecules/SearchTypeSwitcher/SearchTypeSwitcher.molecule";
import { FavoriteDroppableArea } from "@/components/organisms/FavoriteDroppableArea/FavoriteDroppableArea.organism";
import { useGetModels } from "@/hooks/api/useGetModels.hook";
import { usePostTweet } from "@/hooks/api/usePostTweet.hook";
import { useDevice } from "@/hooks/useDevice.hook";
import { useUser } from "@/hooks/useUser.hook";
import { useClipboards } from "@/hooks/useClipboards.hook";
import { useFavorites } from "@/hooks/useFavorites.hook";
import { textsConfig } from "@/configs/texts.config";

interface SavedTweet {
  content: string;
  timestamp: number;
}

export const HomeContents = () => {
  const [executedOnce, setExecutedOnce] = useState(false);
  const [localModel] = useState<OpenAiModel | null>(() => {
    if (typeof window !== "undefined") {
      const savedModel = localStorage.getItem("latestModel");
      return savedModel ? JSON.parse(savedModel) : null;
    }
    return null;
  });

  const [model, setModel] = useState<OpenAiModel | null>(localModel);

  const { clipboards } = useClipboards();
  const { favorites, setFavorites } = useFavorites();
  const { user } = useUser();

  const [tweet, setTweet] = useState<string>(
    user.nickname + textsConfig.TWEET.DEFAULT
  );

  const { data: modelsData } = useGetModels();

  const { isPc, isSp } = useDevice();

  const mutate = usePostTweet();

  const trimmedClipboards = clipboards.slice(0, isSp ? 2 : 3);

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
          {
            userData: user,
          },
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
            },
            onError: (error) => {
              console.error(error);
            },
          }
        );
        setExecutedOnce(true);
      }
    }
  }, [executedOnce, mutate, user]);

  useEffect(() => {
    if (model) {
      localStorage.setItem("latestModel", JSON.stringify(model));
    }
  }, [model]);

  useEffect(() => {
    if (modelsData && modelsData.length > 0) {
      setModel(modelsData[0]);
    }
  }, [modelsData]);

  return (
    <div className="a-fade-in flex flex-col gap-3 w-full">
      <div className="s:absolute -bottom-[58dvh] z-50 inset-x-0 w-full s:px-4">
        <HomeBalloon message={tweet} />
      </div>
      <div className="flex gap-3 s:gap-2 w-full">
        <SearchForm />
        <div className="l:contents m:contents s:flex s:justify-between w-full s:w-1/2">
          <SearchTypeSwitcher />
          <ClipboardPasteButton />
          <ClipboardCopyButton />
        </div>
      </div>
      <ul className="flex gap-2 w-full">
        {trimmedClipboards.map((clipboard, i) => (
          <ClipboardItem
            key={i}
            content={clipboard.content}
            id={clipboard.id}
            copyIcon={false}
            deleteIcon={false}
          />
        ))}
      </ul>
      {isPc && (
        <div className="s:hidden w-full">
          {localModel ? (
            <ModelItem id={localModel.id} created={localModel.created} />
          ) : model ? (
            <ModelItem id={model.id} created={model.created} />
          ) : (
            <ModelItem id="" created={0} />
          )}
        </div>
      )}
      <FavoriteDroppableArea favorites={favorites} setFavorites={setFavorites}>
        {favorites?.map((favorite, i) => (
          <FavoriteButton key={i} favorite={favorite} />
        ))}
      </FavoriteDroppableArea>
    </div>
  );
};
