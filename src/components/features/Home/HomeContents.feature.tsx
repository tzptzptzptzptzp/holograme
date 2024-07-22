import { useEffect, useState } from "react";
import { Clipboard, Favorite } from "@prisma/client";
import { ClipboardCopyButton } from "@/components/molecules/ClipboardCopyButton/ClipboardCopyButton.molecule";
import { ClipboardItem } from "@/components/molecules/ClipboardItem/ClipboardItem.molecule";
import { ClipboardPasteButton } from "@/components/molecules/ClipboardPasteButton/ClipboardPasteButton.molecule";
import { FavoriteButton } from "@/components/molecules/FavoriteButton/FavoriteButton.molecule";
import { SearchForm } from "@/components/molecules/SearchForm/SearchForm.molecule";
import { SearchTypeSwitcher } from "@/components/molecules/SearchTypeSwitcher/SearchTypeSwitcher.molecule";
import { FavoriteDroppableArea } from "@/components/organisms/FavoriteDroppableArea/FavoriteDroppableArea.organism";
import { useGetClipboard } from "@/hooks/api/useGetClipboard.hook";
import { useGetFavorite } from "@/hooks/api/useGetFavorite.hook";
import { useDevice } from "@/hooks/useDevice.hook";

export const HomeContents = () => {
  const [favorites, setFavorites] = useState<Favorite[] | []>([]);
  const [clipboard, setClipboard] = useState<Clipboard[]>([]);

  const { data: clipboardData } = useGetClipboard();
  const { data: favoriteData } = useGetFavorite();

  const { type } = useDevice();

  useEffect(() => {
    if (clipboardData) {
      const trimmedClipboard = clipboardData.slice(0, type === "SP" ? 2 : 3);
      setClipboard(trimmedClipboard);
    }
  }, [clipboardData, type]);

  useEffect(() => {
    if (favoriteData) setFavorites(favoriteData);
  }, [favoriteData]);

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
        {clipboard ? (
          clipboard.map((item, i) => (
            <ClipboardItem
              key={i}
              content={item.content}
              id={item.id}
              icon
              copyIcon={false}
              deleteIcon={false}
            />
          ))
        ) : (
          <ClipboardItem
            content=""
            id={0}
            icon
            showIcon={false}
            copyIcon={false}
            deleteIcon={false}
          />
        )}
      </ul>
      <FavoriteDroppableArea favorites={favorites} setFavorites={setFavorites}>
        {favorites?.map((favorite, i) => (
          <FavoriteButton key={i} favorite={favorite} />
        ))}
      </FavoriteDroppableArea>
    </div>
  );
};
