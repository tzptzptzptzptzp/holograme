import { useEffect, useState } from "react";
import { OpenAiModel } from "@/app/api/openai/route";
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
import { textsConfig } from "@/config/texts.config";
import { GenerateTweetPrompt } from "@/utils/GenerateTweetPrompt.util";

export const HomeContents = () => {
  const [executedOnce, setExecutedOnce] = useState(false);
  const [models, setModels] = useState<OpenAiModel[]>([]);

  const { clipboards } = useClipboards();
  const { user } = useUser();
  const { favorites, setFavorites } = useFavorites();

  const [tweet, setTweet] = useState<string>(
    user.nickname + textsConfig.TWEET.DEFAULT
  );

  const { data: modelsData } = useGetModels();

  const { isPc, isSp } = useDevice();

  const mutate = usePostTweet();

  const trimmedClipboards = clipboards.slice(0, isSp ? 2 : 3);

  useEffect(() => {
    if (!executedOnce) {
      const prompt = GenerateTweetPrompt({ user });
      mutate(
        { prompt },
        {
          onSuccess: ({ data }) => {
            setTweet(data.answer);
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );
      setExecutedOnce(true);
    }
  }, [executedOnce, mutate, user]);

  useEffect(() => {
    if (modelsData) {
      const trimmedModels = modelsData.slice(0, 1);
      setModels(trimmedModels);
    }
  }, [modelsData]);

  return (
    <div className="a-fade-in flex flex-col gap-3 w-full">
      <div className="s:absolute -bottom-[60vh] z-50 inset-x-0 w-full s:px-4">
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
        <ul className="flex s:hidden gap-2 w-full">
          {models.map((model, i) => (
            <ModelItem key={i} id={model.id} created={model.created} />
          ))}
        </ul>
      )}
      <FavoriteDroppableArea favorites={favorites} setFavorites={setFavorites}>
        {favorites?.map((favorite, i) => (
          <FavoriteButton key={i} favorite={favorite} />
        ))}
      </FavoriteDroppableArea>
    </div>
  );
};
