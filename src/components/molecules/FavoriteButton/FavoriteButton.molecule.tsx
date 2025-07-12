import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/atoms/Button/Button.atom";
import { useEditFavorite } from "@/hooks/useEditFavorite.hook";
import { useModal } from "@/hooks/useModal.hook";
import { useSearchTypeStore } from "@/stores/searchType.store";
import { FixedTooltip } from "@/components/atoms/FixedTooltip/FixedTooltip.atom";
import { textsConfig } from "@/config/texts.config";

type Props = {
  favorite: {
    id: number;
    url: string;
    title: string;
    emojiId: string;
    emojiNative: string;
    emojiUnified: string;
  };
};

export const FavoriteButton = ({ favorite }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const searchType = useSearchTypeStore((state) => state.searchType);
  const { setEditFavorite } = useEditFavorite();

  const { handleOpen } = useModal();

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: favorite.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const handleClick = () => {
    if (searchType === "newTab") {
      window.open(favorite.url, "_blank");
    } else {
      window.location.href = favorite.url;
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setEditFavorite(favorite);
    handleOpen("editFavorite");
  };
  return (
    <FixedTooltip
      text={favorite.title + textsConfig.FAVORITE.OPEN_LINK_TOOLTIP}
      position="top-right"
    >
      <li
        className="flex items-center relative w-[45px] h-[45px] p-[3px] border-[3px] border-white rounded-full bg-white bg-opacity-60 select-none"
        onContextMenu={handleContextMenu}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <Button
          className="flex items-center justify-center w-[33px] h-[33px] rounded-full bg-white bg-opacity-100 hover:bg-opacity-50 duration-150"
          onClick={handleClick}
        >
          <p className="text-[22px] text-center leading-none">
            {favorite.emojiNative}
          </p>
        </Button>
        {isHovered && (
          <div className="u-centering-x absolute -top-8 px-3 py-1 rounded-3xl bg-secondary text-white text-[12px] text-center whitespace-nowrap pointer-events-none select-none">
            <p>{favorite.title}</p>
          </div>
        )}
      </li>
    </FixedTooltip>
  );
};
