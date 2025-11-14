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
import { useDevice } from "@/hooks/useDevice.hook";
import { useClipboards } from "@/hooks/useClipboards.hook";
import { useFavorites } from "@/hooks/useFavorites.hook";
import { useGetClipboard } from "@/hooks/api/useGetClipboard.hook";
import { useTweet } from "@/hooks/useTweet.hook";

export const HomeContents = () => {
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

  // つぶやき関連フック
  const { tweet } = useTweet();

  const { data: modelsData } = useGetModels();

  const { isPc, isSp } = useDevice();

  // デバイスによって表示するクリップボードの数を変更
  const trimmedClipboards = clipboards.slice(0, isSp ? 2 : 3);

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
