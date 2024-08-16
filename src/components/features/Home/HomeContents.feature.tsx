import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { OpenAiModel } from "@/app/api/openai/route";
import { ClipboardCopyButton } from "@/components/molecules/ClipboardCopyButton/ClipboardCopyButton.molecule";
import { ClipboardItem } from "@/components/molecules/ClipboardItem/ClipboardItem.molecule";
import { ClipboardPasteButton } from "@/components/molecules/ClipboardPasteButton/ClipboardPasteButton.molecule";
import { FavoriteButton } from "@/components/molecules/FavoriteButton/FavoriteButton.molecule";
import { ModelItem } from "@/components/molecules/ModelItem/ModelItem.molecule";
import { SearchForm } from "@/components/molecules/SearchForm/SearchForm.molecule";
import { SearchTypeSwitcher } from "@/components/molecules/SearchTypeSwitcher/SearchTypeSwitcher.molecule";
import { FavoriteDroppableArea } from "@/components/organisms/FavoriteDroppableArea/FavoriteDroppableArea.organism";
import { useGetModels } from "@/hooks/api/useGetModels.hook";
import { useDevice } from "@/hooks/useDevice.hook";
import { ClipboardsState, FavoritesState } from "@/recoil/atoms.recoil";

export const HomeContents = () => {
  const [models, setModels] = useState<OpenAiModel[]>([]);

  const [clipboards] = useRecoilState(ClipboardsState);
  const [favorites, setFavorites] = useRecoilState(FavoritesState);

  const { data: modelsData } = useGetModels();

  const { type } = useDevice();

  const trimmedClipboards = clipboards.slice(0, type === "SP" ? 2 : 3);

  useEffect(() => {
    if (modelsData) {
      const trimmedModels = modelsData.slice(0, 1);
      setModels(trimmedModels);
    }
  }, [modelsData]);

  return (
    <div className="a-fade-in flex flex-col gap-3 w-full">
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
      {type !== "SP" && (
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
