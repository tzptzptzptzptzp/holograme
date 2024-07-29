import { Button } from "@/components/atoms/Button/Button.atom";
import { colorConfig } from "@/config/color.config";
import { Icons } from "@/icons";

const IconSize = 22;

type Props = {
  content: string;
  deleteIcon?: boolean;
  icon?: boolean;
  showIcon?: boolean;
  newTabIcon?: boolean;
  onDelete?: () => void;
};

export const HistoryItem = ({
  content,
  icon = true,
  newTabIcon = true,
  deleteIcon = true,
  onDelete,
}: Props) => {
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    content
  )}`;

  const OpenIsCurrentTab = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).closest("button")) return;
    window.location.href = googleSearchUrl;
  };

  const OpenIsNewTab = async () => {
    window.open(googleSearchUrl, "_blank");
  };
  return (
    <li
      className="flex items-center justify-between gap-1 relative z-0 min-h-[45px] px-4 py-2 rounded-full bg-white bg-opacity-90 cursor-pointer"
      onClick={OpenIsCurrentTab}
    >
      {icon && (
        <Icons.Search
          className="stroke-2"
          color={colorConfig.primary}
          width={IconSize}
          height={IconSize}
        />
      )}
      <p className="w-full text-gray truncate">{content}</p>
      <div className="flex items-center gap-3">
        {newTabIcon && (
          <Button onClick={OpenIsNewTab}>
            <Icons.NewTab
              color={colorConfig.success}
              width={IconSize}
              height={IconSize}
            />
          </Button>
        )}
        {deleteIcon && (
          <Button onClick={onDelete}>
            <Icons.Trash
              color={colorConfig.error}
              width={IconSize}
              height={IconSize}
            />
          </Button>
        )}
      </div>
    </li>
  );
};
