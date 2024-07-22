import { useEffect, useState } from "react";
import { Favorite } from "@prisma/client";
import { ClipboardCopyButton } from "@/components/molecules/ClipboardCopyButton/ClipboardCopyButton.molecule";
import { ClipboardItem } from "@/components/molecules/ClipboardItem/ClipboardItem.molecule";
import { ClipboardPasteButton } from "@/components/molecules/ClipboardPasteButton/ClipboardPasteButton.molecule";
import { FavoriteButton } from "@/components/molecules/FavoriteButton/FavoriteButton.molecule";
import { SearchForm } from "@/components/molecules/SearchForm/SearchForm.molecule";
import { SearchTypeSwitcher } from "@/components/molecules/SearchTypeSwitcher/SearchTypeSwitcher.molecule";
import { FavoriteDroppableArea } from "@/components/organisms/FavoriteDroppableArea/FavoriteDroppableArea.organism";
import { useGetClipboard } from "@/hooks/api/useGetClipboard.hook";
import { useGetFavorite } from "@/hooks/api/useGetFavorite.hook";

export const HomeContents = () => {
  const [favorites, setFavorites] = useState<Favorite[] | []>([]);
  const [latest, setLatest] = useState({
    id: 0,
    content: "",
  });

  const { data: clipboardData } = useGetClipboard();
  const { data: favoriteData } = useGetFavorite();

  useEffect(() => {
    setLatest({
      id: clipboardData?.[0].id || 0,
      content: clipboardData?.[0].content || "",
    });
  }, [clipboardData]);

  useEffect(() => {
    if (favoriteData) setFavorites(favoriteData);
  }, [favoriteData]);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-3 w-full">
        <SearchForm />
        <SearchTypeSwitcher />
        <ClipboardPasteButton />
        <ClipboardCopyButton />
      </div>
      {clipboardData ? (
        <ClipboardItem
          content={latest.content}
          id={latest.id}
          icon
          copyIcon={false}
          deleteIcon={false}
        />
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
      <FavoriteDroppableArea favorites={favorites} setFavorites={setFavorites}>
        {favorites?.map((favorite, i) => (
          <FavoriteButton key={i} favorite={favorite} />
        ))}
      </FavoriteDroppableArea>
    </div>
  );
};
